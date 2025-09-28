import { useEffect, useMemo, useState, type ReactNode } from 'react';
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
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80',
    profile: {
      name: 'Ahmed Benali',
      note: 'Focus Mode helps each learner track progress without distraction.',
    },
    product: {
      title: 'Focus Mode',
      subtitle: 'Guided study journeys',
      desc: 'Structure revision with timed sprints, smart reminders, and coach feedback loops.',
    },
    pills: ['Focus', 'Results', 'Consistency'],
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

const thumbUrl = (src: string, size = 280) =>
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

  useEffect(() => {
    if (slides.length < 2) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, []);

  const previewOrder = useMemo(() => {
    if (!slides.length) {
      return [] as number[];
    }

    const order: number[] = [current];

    let offset = 1;
    while (order.length < Math.min(3, slides.length) && offset < slides.length) {
      order.push((current + offset) % slides.length);
      offset += 1;
    }

    while (order.length < 3) {
      order.push(order[order.length - 1]);
    }

    return order.reverse();
  }, [current]);

  const handleSelect = (index: number) => {
    setCurrent(index % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-white via-white to-purple-100/60 overflow-hidden pl-64"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[380px] w-[380px] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-purple-300/30 blur-3xl" />
      </div>

      <div className="absolute top-28 left-1/2 z-30 flex -translate-x-1/2 items-end gap-6">
        {previewOrder.map((slideIndex, position) => {
          const slide = slides[slideIndex];
          const isActive = slideIndex === current;
          const scaleMap = [0.82, 0.94, 1.08];
          const opacityMap = [0.6, 0.85, 1];
          const zIndexMap = [10, 20, 30];
          const baseScale = scaleMap[position] ?? scaleMap[scaleMap.length - 1];
          const hoverScale = baseScale + 0.06;

          return (
            <motion.button
              key={`${slide.id}-${position}`}
              layout
              layoutId={`preview-${slide.id}`}
              initial={false}
              onClick={() => handleSelect(slideIndex)}
              className={`relative flex h-24 w-24 flex-shrink-0 overflow-hidden rounded-[26px] border border-white/60 bg-white/70 backdrop-blur-xl transition-shadow focus:outline-none ${
                isActive
                  ? 'ring-2 ring-purple-500/70 shadow-xl'
                  : 'ring-1 ring-white/40 shadow-md'
              }`}
              animate={{
                scale: baseScale,
                opacity: opacityMap[position] ?? opacityMap[opacityMap.length - 1],
              }}
              whileHover={{ scale: hoverScale, y: -6 }}
              whileTap={{ scale: baseScale * 0.95 }}
              transition={{
                layout: { type: 'spring', stiffness: 500, damping: 40 },
                scale: { type: 'spring', stiffness: 420, damping: 32 },
                opacity: { duration: 0.3 },
              }}
              style={{
                zIndex: zIndexMap[position] ?? zIndexMap[zIndexMap.length - 1],
                transformOrigin: 'bottom center',
              }}
              aria-label={`Show slide ${slide.id}`}
            >
              <img
                src={thumbUrl(slide.image)}
                alt={slide.product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
            </motion.button>
          );
        })}
      </div>

      <div className="container mx-auto px-6 pb-24 pt-40 lg:px-16">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)]">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-purple-100/60 px-4 py-2 text-xs font-semibold text-purple-600">
              <span className="inline-block h-2 w-2 rounded-full bg-purple-500" />
              Live learning that feels personal
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
                Ultimate Learning:
                <br />
                Elevate your <span className="text-purple-600">academic</span> and
                <br />
                <span className="text-purple-600">creative</span> experience
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Connect School blends curated resources, coaching, and collaborative workspaces into one flow.
                Discover tools that adapt to every learner and keep momentum high.
              </p>
            </div>

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

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {supportAvatars.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Learner"
                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  />
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
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute -top-24 right-6 h-40 w-40 rounded-full bg-white" />

              <div className="absolute -top-16 right-4 z-40 flex items-center gap-4 rounded-full border border-white/70 bg-white/95 px-5 py-3 shadow-2xl">
                <div className="flex items-center gap-2">
                  {socialLinks.map(({ id, icon: Icon, label }) => (
                    <motion.button
                      key={id}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors hover:bg-purple-600 hover:text-white"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  className="rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-[44px] bg-white/40 shadow-[0_30px_80px_rgba(168,85,247,0.25)] ring-1 ring-purple-200/50 backdrop-blur">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <img
                      src={slides[current].image}
                      alt={slides[current].product.title}
                      className="h-[540px] w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-700/30 via-transparent to-purple-300/20" />

                    <motion.div
                      className="absolute right-6 top-6 max-w-[320px] rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-xl"
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
                      className="absolute left-6 bottom-6 max-w-[290px] rounded-2xl border border-white/60 bg-white/92 p-4 shadow-xl"
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
