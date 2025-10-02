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
  { id: 'facebook', icon: Facebook, label: 'Facebook' },
  { id: 'instagram', icon: Instagram, label: 'Instagram' },
  { id: 'youtube', icon: Youtube, label: 'YouTube' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
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
      className="relative min-h-screen bg-gradient-to-br from-white via-white to-purple-100/60 overflow-hidden pl-64"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute top-1/4 -right-40 h-[420px] w-[420px] rounded-full bg-purple-300/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pb-16 pt-20 lg:px-16">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-20">
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
            className="relative flex h-[65vh] w-full max-w-[600px] justify-center lg:h-[90vh]"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <svg className="absolute h-0 w-0">
              <defs>
                <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                  <path d="M 0.08,0 H 0.92 C 0.96,0 1,0.04 1,0.08 V 0.92 C 1,0.96 0.96,1 0.92,1 H 0.08 C 0.04,1 0,0.96 0,0.92 V 0.08 C 0,0.04 0.04,0 0.08,0 Z M 0.25,0 C 0.25,0.02 0.23,0.04 0.21,0.04 C 0.12,0.04 0.04,0.02 0.04,0.02 M 0.75,0 C 0.75,0.02 0.77,0.04 0.79,0.04 C 0.88,0.04 0.96,0.02 0.96,0.02" />
                </clipPath>
              </defs>
            </svg>

            <div className="relative h-full w-full max-w-[560px]">
              <div
                className="relative h-full w-full overflow-hidden bg-white/40 shadow-[0_30px_80px_rgba(168,85,247,0.25)] ring-1 ring-purple-200/40 backdrop-blur"
                style={{ clipPath: clipPathUrl, WebkitClipPath: clipPathUrl }}
              >
                <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between px-6">
                  <motion.div
                    className="flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-5 py-3 shadow-2xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.45 }}
                  >
                    {socialLinks.map(({ id, icon: Icon, label }) => (
                      <motion.button
                        key={id}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        aria-label={label}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.button>
                    ))}
                  </motion.div>

                  <motion.button
                    className="rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.45 }}
                  >
                    Sign up
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[current].id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img
                      src={slides[current].image}
                      alt={slides[current].product.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700/30 via-transparent to-purple-300/20" />

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
    </section>
  );
};

export default Hero;
