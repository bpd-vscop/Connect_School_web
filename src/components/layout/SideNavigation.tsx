import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Globe, X as XIcon } from "lucide-react";

/**
 * Sliding-door nav with directional control + hero stretch:
 * - Down: 0→15% hero => vertical column slides LEFT from separator; at 15% topbar pill bounces in and persists.
 * - Up: pill fades out from 18%→16%; ONLY below 16% does the vertical door start sliding back in.
 * - Hero left padding tracks the door continuously (stretches with closing/opening).
 * - Separator moves with the door; visible in vertical state and while returning (16%→15%) on up.
 * - Socials + Join + Sign up appear ONLY in the horizontal pill.
 */

interface LogoConfig {
  type: "svg_path" | "image_url";
  content: string;
  alt?: string;
}

const ConfigurableLogo = ({
  className = "w-7 h-7",
  config,
}: {
  className?: string;
  config: LogoConfig;
}) => {
  if (config.type === "image_url") {
    return (
      <img
        src={config.content}
        alt={config.alt || "Logo"}
        className={`${className} object-contain`}
      />
    );
  }
  if (config.type === "svg_path") {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: config.content }}
      />
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 10 6 22l26 12 26-12-26-12z" fill="currentColor" />
      <circle cx="54" cy="22" r="3" fill="currentColor" />
      <path d="M12 30v8c0 7.2 9.6 13 20 13s20-5.8 20-13v-8l-20 8-20-8z" fill="currentColor" />
    </svg>
  );
};

const NAV_WIDTH_PX = window.innerWidth < 1025 ? 220 : 256
const SLAB_HEIGHT = 220;   // grid slab height behind logo
const SEPARATOR_GAP = 24;  // top/bottom gap for separator

// Thresholds (fractions of hero height)
const THRESH_SHOW   = 0.15; // topbar appears at 15% on DOWN; unmounts below 15% on UP
const FADE_START    = 0.18; // pill starts fading out (on UP) at 18%
const FADE_END      = 0.16; // pill fully faded by 16% (before door return starts)
const RETURN_START  = 0.16; // door begins to slide back in only below 16%

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "Shops", href: "#shops" },
  { name: "Collections", href: "#collections" },
  { name: "About us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: XIcon,     label: "X",         href: "#" },
  { icon: Globe,     label: "Website",   href: "#" },
];

export default function SideNavigation() {
  const [topbar, setTopbar] = useState(false);
  const [heroH, setHeroH] = useState(0);
  const [navH, setNavH] = useState(0);

  const [progressPx, setProgressPx] = useState(0); // px scrolled within hero
  const [isDown, setIsDown] = useState(true);      // scroll direction

  // Refs to avoid exhaustive-deps and stale closures
  const heroHeightRef = useRef(0);
  const heroTopRef = useRef(0);
  const heroElRef = useRef<HTMLElement | null>(null);

  const prevTopbarRef = useRef(false);
  const prevScrollYRef = useRef(0);
  const [bounceKey, setBounceKey] = useState(0);   // re-mount pill to re-trigger bounce
  const rafIdRef = useRef<number | null>(null);
  const doorDivRef = useRef<HTMLDivElement>(null);
  const separatorDivRef = useRef<HTMLDivElement>(null);

  const logoConfig: LogoConfig = {
    type: "image_url",
    content: "/logo.svg",
    alt: "Connect School Logo",
  };

  const iconConfig: LogoConfig = {
    type: "image_url",
    content: "/icon.svg",
    alt: "Connect School Icon",
  };

  useEffect(() => {
    heroElRef.current = document.querySelector<HTMLElement>("#home") || null;
    const hero = heroElRef.current;
    if (!hero) return;

    const measureHero = () => {
      const top = hero.offsetTop;
      const height = hero.offsetHeight || window.innerHeight;
      setHeroH(height);
      heroTopRef.current = top;
      heroHeightRef.current = height;
    };

    const setHeroPaddingPx = (px: number) => {
      // continuous stretch with door
      hero.style.paddingLeft = `${Math.max(0, Math.floor(px))}px`;
    };

    const onScrollResize = () => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        measureHero();

        const y = window.scrollY;
        const prevY = prevScrollYRef.current;
        const down = y > prevY;
        prevScrollYRef.current = y;
        setIsDown(down);

        const top = heroTopRef.current;
        const height = heroHeightRef.current;

        const progress = Math.min(Math.max(y - top, 0), height);
        setProgressPx(progress);

        // vertical menu height shrinks with progress
        setNavH(Math.max(height - progress, 0));

        // --- compute door position for hero padding (so hero stretches with it) ---
        const px30 = height * THRESH_SHOW;
        const px31 = height * RETURN_START;

        let visibleWidthPx = 0;
        let doorX = 0;

        if (down) {
          // DOWN: door slides out from 0 -> 15%
          const ratio = Math.min(progress / Math.max(px30, 1), 1);
          doorX = -NAV_WIDTH_PX * easeOutCubic(ratio); // negative
          const separatorLeft = Math.max(0, NAV_WIDTH_PX + doorX);
          visibleWidthPx = separatorLeft; // hero padding equals door's visible width
        } else {
          // UP: hold closed (padding=0) until 16%, then slide back 16% -> 0
          if (progress >= px31) {
            visibleWidthPx = 0;
            doorX = -NAV_WIDTH_PX;
          } else {
            const ratioBack = Math.min(Math.max(progress / Math.max(px31, 1), 0), 1);
            doorX = -NAV_WIDTH_PX * easeOutCubic(ratioBack);
            const separatorLeft = Math.max(0, NAV_WIDTH_PX + doorX);
            visibleWidthPx = separatorLeft;
          }
        }

        // Use transform instead of re-rendering for smoother animation
        if (doorDivRef.current) {
          doorDivRef.current.style.transform = `translateX(${doorX}px)`;
        }

        const separatorLeft = Math.max(0, NAV_WIDTH_PX + doorX);
        if (separatorDivRef.current) {
          separatorDivRef.current.style.left = `${separatorLeft}px`;
        }

        setHeroPaddingPx(visibleWidthPx);

        // toggle topbar strictly at 15%
        const shouldTopbar = progress >= px30;
        if (!prevTopbarRef.current && shouldTopbar && down) {
          setBounceKey((k) => k + 1); // bounce only when entering while scrolling down
        }
        prevTopbarRef.current = shouldTopbar;

        setTopbar(shouldTopbar);
      });
    };

    // init
    measureHero();
    onScrollResize();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      hero.style.paddingLeft = "0px";
    };
  }, []);

  // Separator position and height
  const separatorHeight = Math.max(navH - SEPARATOR_GAP * 2, 0);
  const separatorLeft = useMemo(() => {
    const height = Math.max(heroH, 1);
    const px30 = height * THRESH_SHOW;
    const px31 = height * RETURN_START;

    let doorX = 0;
    if (isDown) {
      const ratio = Math.min(progressPx / Math.max(px30, 1), 1);
      doorX = -NAV_WIDTH_PX * easeOutCubic(ratio);
    } else {
      if (progressPx >= px31) {
        doorX = -NAV_WIDTH_PX;
      } else {
        const ratioBack = Math.min(Math.max(progressPx / Math.max(px31, 1), 0), 1);
        doorX = -NAV_WIDTH_PX * easeOutCubic(ratioBack);
      }
    }
    return Math.max(0, NAV_WIDTH_PX + doorX);
  }, [heroH, isDown, progressPx]);

  // Show separator in vertical state, and during return band (16%→15%) when scrolling UP
  const showSeparator =
    !topbar || (topbar && !isDown && progressPx < heroH * RETURN_START);

  // --- Pill opacity ---
  // Down: fully visible once topbar is active (≥15%).
  // Up: fade 18%→16%, then fully gone by 16% (before door starts to return).
  const fadeStartPx = heroH * FADE_START;
  const fadeEndPx = heroH * FADE_END;
  let pillOpacity = 1;
  if (!isDown) {
    if (progressPx >= fadeStartPx) {
      pillOpacity = 1;
    } else if (progressPx > fadeEndPx) {
      pillOpacity = (progressPx - fadeEndPx) / (fadeStartPx - fadeEndPx); // 1 @18% -> 0 @16%
    } else {
      pillOpacity = 0; // ≤16%
    }
  } else {
    pillOpacity = 1; // DOWN: persist once shown
  }

  // Wrapper spans the viewport in topbar so pill centers to page
  const wrapperClasses = useMemo(
    () =>
      topbar
        ? "fixed inset-x-0 top-0 z-50 pointer-events-none"
        : "fixed inset-y-0 left-0 z-50 flex justify-start pointer-events-none",
    [topbar]
  );

  return (
    <>
      <div className={wrapperClasses}>
        {/* Moving separator (no top/bottom connection) */}
        {showSeparator && separatorHeight > 0 && (
          <div
            ref={separatorDivRef}
            className="fixed bg-gray-200 transition-opacity duration-150"
            style={{
              left: separatorLeft,
              top: SEPARATOR_GAP,
              width: 1,
              height: separatorHeight,
              willChange: "left",
            }}
          />
        )}

        {/* OUTER NAV: transparent; full-width in topbar to center the pill */}
        <motion.nav
          aria-label="Primary"
          className={`pointer-events-auto bg-transparent border-0 shadow-none relative ${
            topbar ? "w-screen" : ""
          }`}
          style={{
            width: topbar ? "100vw" : NAV_WIDTH_PX,
            height: topbar ? "auto" : navH || heroH,
          }}
        >
          {/* Vertical column (slides with scroll; always mounted) */}
          <div
            ref={doorDivRef}
            className="relative"
            style={{
              width: NAV_WIDTH_PX,
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: topbar ? "none" : "auto",
              willChange: "transform",
            }}
          >
            {/* Grid slab behind logo */}
            <div
              aria-hidden
              className="grid-fade"
              style={{ height: SLAB_HEIGHT, width: "100%" }}
            />

            {/* Logo + brand */}
            <div className="absolute top-12 w-full flex flex-col items-center gap-3">
              <div className="w-32 h-32 place-items-center">
                <ConfigurableLogo className="w-32 h-32" config={logoConfig} />
              </div>
            </div>

            {/* Menu list */}
            <ul className="ui flex flex-col items-center gap-6 pt-64">
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`block text-[15px] ${
                      idx === 0 ? "text-purple-600 font-bold italic" : "text-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block rounded-full transition-all ${
                        idx === 0
                          ? "bg-purple-50 px-4 py-2"
                          : "px-4 py-2 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horizontal pill (bounce on down at 15%; fades out 18%→16% on up; persists otherwise) */}
          <AnimatePresence>
            {topbar && (
              <motion.div
                key={bounceKey}
                initial={{ opacity: 0, y: -36, scale: 0.96 }}
                animate={{ opacity: pillOpacity, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 520,
                  damping: 22,
                  mass: 0.8,
                }}
                className="pointer-events-auto flex items-center gap-5 px-6 py-3 rounded-full border border-gray-200 bg-white shadow-sm w-max mx-auto mt-6"
                style={{ pointerEvents: pillOpacity > 0.05 ? "auto" : "none" }}
              >
                {/* Logo */}
                <div className="w-10 h-10 rounded-xl grid place-items-center">
                  <ConfigurableLogo className="w-10 h-10" config={iconConfig} />
                </div>

                {/* Menu */}
                <ul className="flex items-center gap-2 ui">
                  {NAV_ITEMS.map((item, idx) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`text-sm px-3 py-2 rounded-full ${
                          idx === 0
                            ? "text-purple-600 font-bold italic bg-purple-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Socials + actions */}
                <div className="flex items-center gap-3 ml-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-purple-600 hover:shadow-sm grid place-items-center transition-all"
                    >
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                  <a
                    href="#join"
                    className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold ui hover:bg-purple-700"
                  >
                    Join
                  </a>
                  <a
                    href="#signup"
                    className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold ui hover:bg-black"
                  >
                    Sign up
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
