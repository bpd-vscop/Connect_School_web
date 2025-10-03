import { useCallback, useEffect, useMemo, useState, useId, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

const AsteriskIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L8 15M2 8L14 8M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

type Slide = {
  id: number;
  image: string;
  profile: { name: string; note: string };
  product: { title: string; subtitle: string; desc: string };
  pills: string[];
};

const slides: Slide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80',
    profile: {
      name: 'Ronald Richards',
      note: 'Using the Logitech mouse has been a game changer for my productivity.',
    },
    product: {
      title: 'MX Pro mouse',
      subtitle: 'Precision ergonomic control',
      desc: 'Designed for all day learning sessions with customizable macros and seamless device pairing.',
    },
    pills: ['Quality', 'High Precision Sensor', 'Ergonomic Design', 'Long Battery Life'],
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80',
    profile: {
      name: 'Fatima El Mansouri',
      note: 'The blended classes made remote collaboration effortless for our students.',
    },
    product: {
      title: 'Smart Class Hub',
      subtitle: 'Hybrid classroom kit',
      desc: 'Bring every learner into the conversation with live annotations, quick polls, and shared boards.',
    },
    pills: ['Online Ready', 'Adaptive Tools', 'AI Insights'],
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1400&q=80',
    profile: {
      name: 'Sarah Thompson',
      note: 'Creative briefs and instant feedback keep our learners motivated.',
    },
    product: {
      title: 'Creative Studio',
      subtitle: 'Project based learning',
      desc: 'Launch immersive challenges with shared workspaces and peer review built in.',
    },
    pills: ['Comfort First', 'Precision Tools'],
  },
];

const socialLinks = [
  { id: 'facebook', icon: Facebook, label: 'Facebook', colorClass: 'text-gray-700 hover:bg-blue-600 hover:text-white' },
  { id: 'instagram', icon: Instagram, label: 'Instagram', colorClass: 'text-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', colorClass: 'text-gray-700 hover:bg-blue-700 hover:text-white' },
];

const supportAvatars = [
  'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&q=60',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=60',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=60',
];

const thumbUrl = (src: string, size = 320) =>
  src.replace('w=1400', `w=${size}`).replace('q=80', 'q=70');

const Pill = ({ children, active = false }: { children: ReactNode; active?: boolean }) => (
  <div
    className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-xl border whitespace-nowrap transition-colors ${
      active
        ? 'bg-white text-gray-900 border-white/60 shadow-lg'
        : 'bg-white/90 text-gray-600 border-white/40'
    }`}
  >
    {children}
  </div>
);

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const rawClipId = useId();
  const clipPathId = useMemo(() => `hero-cutout-${rawClipId.split(':').join('')}`, [rawClipId]);
  const clipPathUrl = `url(#${clipPathId})`;

  const startAutoCycle = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    if (slides.length < 2) {
      intervalRef.current = null;
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
  }, []);

  useEffect(() => {
    startAutoCycle();

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startAutoCycle]);

  const previewSlides = useMemo(() => {
    return slides.slice(0, 3);
  }, []);

  const handleSelect = (index: number) => {
    setCurrent(index);
    startAutoCycle();
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoCycle();
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoCycle();
  };

  return (
    <section
      id="home"
      className="relative py-20 bg-gradient-to-br from-white via-white to-purple-100/60 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute top-1/4 -right-40 h-[420px] w-[420px] rounded-full bg-purple-300/30 blur-3xl" />
      </div>

      {/* Centered container that accounts for side navigation */}
      <div className="relative w-full h-full flex justify-center">
        <div className="w-full max-w-[1400px] lg:px-10">
        <div className="grid items-start gap-20 lg:grid-cols-[minmax(0,600px)_minmax(0,1fr)] lg:gap-16">
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-end justify-between gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-purple-100/60 px-4 py-2 text-xs font-semibold text-purple-600">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-500" />
                Live learning that feels personal
              </div>

              <div className="relative flex items-end gap-4">
                {previewSlides.map((slide, index) => {
                  const sizes = [
                    { size: 'h-[64px] w-[64px]', rounded: 'rounded-[18px]', width: 64 },
                    { size: 'h-[80px] w-[80px]', rounded: 'rounded-[22px]', width: 80 },
                    { size: 'h-[96px] w-[96px]', rounded: 'rounded-[26px]', width: 96 }
                  ];
                  const { size, rounded } = sizes[index];

                  const indicatorActive =
                    hoveredIndex !== null ? hoveredIndex === index : current === index;

                  return (
                    <div key={slide.id} className="relative flex flex-col items-center">
                      {indicatorActive ? (
                        <motion.div
                          layoutId="slide-indicator"
                          className="mb-2 text-purple-500"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <AsteriskIcon />
                        </motion.div>
                      ) : (
                        <div className="mb-2 h-4 w-4"></div>
                      )}
                      <button
                        onClick={() => handleSelect(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative ${size} ${rounded} overflow-hidden transition-all border-2 ${
                          current === index
                            ? 'border-purple-500 shadow-lg ring-2 ring-purple-500 ring-offset-2'
                            : 'border-white/60 hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <img
                          src={thumbUrl(slide.image)}
                          alt={slide.product.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-snug text-gray-900 sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
                Ultimate Learning:
                <br />
                Elevate your <span className="text-purple-600">academic</span> and
                <br />
                <span className="text-purple-600">creative</span> experience
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Connect School blends curated resources, coaching, and collaborative workspaces into one flow. Discover
                tools that adapt to every learner and keep momentum high.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <motion.a
                href="#features"
                className="group inline-flex items-center gap-3 rounded-full border border-purple-200/60 bg-white/80 px-6 py-3 text-sm font-medium text-purple-700 shadow-sm transition-colors hover:border-purple-400 hover:text-purple-800"
                whileHover={{ x: 6 }}
              >
                Explore features
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>

              <div className="flex -space-x-3">
                {supportAvatars.map((src) => (
                  <img key={src} src={src} alt="Learner" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="space-y-1 text-sm">
                <div className="font-semibold text-gray-900">24 coaches ready today</div>
                <p className="text-gray-500">Join a live onboarding session in less than 10 minutes.</p>
              </div>

              <motion.button
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-transform hover:translate-y-[-2px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Join now
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="relative flex h-[95vh] w-full max-h-[850px] justify-center"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <svg className="absolute h-0 w-0">
              <defs>
                <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                  <path d="M 0.9773 0.1518 L 0.9773 0.9297 C 0.9773 0.9590 0.9467 0.9831 0.9088 0.9831 L 0.0912 0.9831 C 0.0534 0.9831 0.0227 0.9590 0.0227 0.9297 L 0.0227 0.1205 C 0.0227 0.0912 0.0534 0.0671 0.0912 0.0671 L 0.1968 0.0671 C 0.2106 0.0671 0.2226 0.0671 0.2226 0.0671 C 0.2364 0.0671 0.2475 0.0580 0.2472 0.0469 C 0.2468 0.0299 0.2639 0.0169 0.2850 0.0169 L 0.7036 0.0169 C 0.7359 0.0169 0.7623 0.0373 0.7623 0.0624 L 0.7623 0.0767 C 0.7623 0.0893 0.7755 0.0994 0.7917 0.0994 L 0.9088 0.0994 C 0.9467 0.0994 0.9773 0.1236 0.9773 0.1518 Z" />
                </clipPath>
              </defs>
            </svg>

            <div className="relative h-full w-full max-w-[700px]">
              {/*
                Social icons container - positioned horizontally at top
                Position: left-6 (horizontal), top-[-20px] (vertical - negative moves up outside frame)
                Container size: px-4 (horizontal padding), py-2.5 (vertical padding)
                Gap between icons: gap-2
              */}
              <motion.div
                className="absolute left-6 top-[6px] z-40 flex items-center gap-2 py-2.5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
              >
                {socialLinks.map(({ id, icon: Icon, label, colorClass }) => (
                  <motion.button
                    key={id}
                    /*
                      Individual icon button size: h-9 w-9 (36px x 36px)
                      Icon size inside: h-4 w-4 (16px x 16px)
                      Default: transparent background with gray icon and gray border circle
                      Hover: colored background with white icon, border disappears
                    */
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-transparent border border-gray-300 hover:border-transparent transition-all duration-300 ${colorClass}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.button>
                ))}
              </motion.div>

              {/*
                Sign up button - positioned at top right
                Position: right-6 (horizontal from right), top-[-20px] (vertical - negative moves up outside frame)
                Button size: px-7 (horizontal padding), py-3 (vertical padding)
                Text size: text-sm
              */}
              <motion.button
                className="absolute right-6 top-[6px] z-40 rounded-[30px] bg-gradient-to-r from-purple-600 to-purple-500 px-9 py-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
              >
                Sign up
              </motion.button>

              <div
                className="relative h-full w-full overflow-hidden bg-white/40 shadow-[0_30px_80px_rgba(168,85,247,0.25)] ring-1 ring-purple-200/40 backdrop-blur"
                style={{ clipPath: clipPathUrl, WebkitClipPath: clipPathUrl }}
              >

                <AnimatePresence initial={false}>
                  <motion.div
                    key={slides[current].id}
                    className="absolute inset-0"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <img
                      src={slides[current].image}
                      alt={slides[current].product.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700/30 via-transparent to-purple-300/20" />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none z-10" />

                    <motion.div
                      className="absolute right-6 top-20 max-w-[320px] rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-xl"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-purple-600 text-sm font-semibold text-white">
                          {slides[current].profile.name
                            .split(' ')
                            .map((part) => part[0])
                            .join('')}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {slides[current].profile.name}
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-600">
                        {slides[current].profile.note}
                      </p>
                    </motion.div>

                    <motion.div
                      className="absolute right-6 bottom-44 flex flex-col gap-2"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {slides[current].pills.map((pill, index) => (
                        <Pill key={pill} active={index === 0}>
                          {pill}
                        </Pill>
                      ))}
                    </motion.div>

                    <motion.div
                      className="absolute left-6 bottom-6 max-w-[300px] rounded-2xl border border-white/60 bg-white/92 p-4 shadow-xl"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="text-sm font-semibold text-gray-900">
                        {slides[current].product.title}
                      </div>
                      <div className="text-xs font-medium text-purple-600">
                        {slides[current].product.subtitle}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-gray-600">
                        {slides[current].product.desc}
                      </p>

                      <div className="mt-3 overflow-hidden rounded-xl border border-purple-100">
                        <img
                          src={thumbUrl(slides[current].image, 360)}
                          alt="Preview"
                          className="h-[120px] w-full object-cover"
                        />
                        <div className="flex items-center justify-between bg-white/90 px-3 py-2">
                          <button className="rounded-full bg-purple-600 px-3 py-1 text-[11px] font-semibold text-white">
                            Buy now
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 flex gap-3">
                  <motion.button
                    onClick={handlePrev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-purple-600 shadow-lg shadow-purple-500/20 transition-colors hover:bg-purple-600 hover:text-white"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-purple-600 shadow-lg shadow-purple-500/20 transition-colors hover:bg-purple-600 hover:text-white"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
