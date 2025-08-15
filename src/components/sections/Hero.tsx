import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

/** Glassy popup atoms */
const Pill = ({ children, active=false }: {children: React.ReactNode, active?: boolean}) => (
  <div className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-xl border ${active ? 'bg-white/90 text-gray-900 border-white/40 shadow-lg' : 'bg-white/70 text-gray-600 border-white/30'} whitespace-nowrap`}>{children}</div>
);

const NewHero = () => {
  const [current, setCurrent] = useState(0);

  // ---- Slides (4) – images & overlays match reference structure ----
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80',
      profile: { name: 'Ronald Richards', note: 'Using the Logitech mouse has been a game-changer for my productivity.' },
      product: { title: 'Mx Pro mouse', subtitle: 'Precision, customizable features', desc: 'The MX Pro mouse is designed for ultimate comfort and precision, ensuring a seamless user experience. Its ergonomic design fits perfectly in your hand.' },
      pills: ['Quality','Ergonomic Design','High Precision Sensor','Long Battery Life'],
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80',
      profile: { name: 'Fatima El Mansouri', note: 'Personalized learning approach.' },
      product: { title: 'Smart Class', subtitle: 'Adaptive teaching', desc: 'Engaging sessions with measurable outcomes and tailored feedback.' },
      pills: ['Online','Flexible','1:1 Focus'],
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1400&q=80',
      profile: { name: 'Sarah Thompson', note: 'Seamless, ergonomic experience.' },
      product: { title: 'Creative Suite', subtitle: 'Projects & feedback', desc: 'Build confidence with curated tasks and rapid feedback loops.' },
      pills: ['Comfort','Precision'],
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80',
      profile: { name: 'Ahmed Benali', note: 'Great results in less time.' },
      product: { title: 'Focus Mode', subtitle: 'Distraction-free learning', desc: 'Minimal UI and structured sprints for faster improvement.' },
      pills: ['Focus','Results','Consistency'],
    },
  ];

  const thumbs = slides.map(s =>
    s.image.replace('w=1400', 'w=240').replace('q=80', 'q=60')
  );

  useEffect(() => {
    const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-white via-white to-purple-100 relative overflow-hidden pl-64">
      <div className="container mx-auto px-8 py-16 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* ---------- Left: Text Column ---------- */}
          <motion.div
            className="space-y-8 max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Slides above text (3 small cutouts) */}
            <div className="flex gap-3 mb-6">
              {thumbs.slice(0,3).map((t, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`relative rounded-xl overflow-hidden border transition-all ${current===i ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100 border-gray-200'}`}
                  whileHover={{ scale: current===i ? 1.05 : 1.02 }}
                >
                  <img src={t} alt={`Slide ${i+1}`} className="w-20 h-16 object-cover" />
                </motion.button>
              ))}
            </div>

            {/* Hero heading – display font + styling */}
            <div className="space-y-6">
              <h1 className="heading text-[56px] leading-[1.02] text-gray-900">
                Ultimate Learning:<br/>
                Elevate Your <span className="text-purple-600 ">Academic</span><br/>
                — and <span className="text-purple-600 ">Educational</span><br/>
                Experience
              </h1>
            </div>

            {/* Explore Features CTA (pill with animated arrow) */}
            <motion.a
              href="#features"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-gray-200 texture-dots ui text-gray-800 hover:text-purple-700 hover:border-purple-200 transition-colors"
              whileHover={{ x: 4 }}
            >
              <span className="font-medium">Explore Features</span>
              <span className="inline-flex w-6 h-6 rounded-full bg-purple-600/10 items-center justify-center">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>

            {/* Support section – counter, avatars, button */}
            <div className="pt-10">
              <div className="flex items-center gap-6">
                {/* Counter + chevrons */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 ui flex items-center justify-center text-sm font-bold">01</div>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 grid place-items-center text-gray-600 hover:text-gray-900">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 grid place-items-center text-gray-600 hover:text-gray-900">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Avatars + label */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=40&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80',
                      'https://images.unsplash.com/photo-1494790108755-2616b612b372?auto=format&fit=crop&w=40&q=80',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80'
                    ].map((a, i) => (
                      <img key={i} src={a} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div className="ui text-sm font-semibold text-gray-900">
                    +24 Best Sale Support With Us
                  </div>
                </div>

                {/* Join button with arrow animation */}
                <motion.a
                  href="#join"
                  className="ui px-6 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-purple-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Join
                  <motion.span
                    initial={false}
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: Main slide cutout ---------- */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Big image */}
                  <img
                    src={slides[current].image}
                    alt="Slide"
                    className="w-full h-[540px] object-cover rounded-[28px]"
                  />

                  {/* Subtle violet atmosphere */}
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-purple-600/20 via-transparent to-purple-300/10" />

                  {/* Popup: profile note (top-right like reference) */}
                  <motion.div
                    className="absolute right-6 top-6 bg-white/90 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/40 shadow-2xl max-w-[320px]"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600 text-white grid place-items-center heading text-xs">
                        {slides[current].profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ui text-sm text-gray-700 font-medium">
                        {slides[current].profile.name}
                      </div>
                    </div>
                    <p className="ui text-[12px] text-gray-600 mt-2 leading-relaxed">
                      {slides[current].profile.note}
                    </p>
                  </motion.div>

                  {/* Keyword pills (right side mid) */}
                  <motion.div
                    className="absolute right-6 bottom-40 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {slides[current].pills.slice(0,4).map((p, i) => (
                      <Pill key={i} active={i===0}>{p}</Pill>
                    ))}
                  </motion.div>

                  {/* Product card (bottom-left) */}
                  <motion.div
                    className="absolute left-6 bottom-6 bg-white/92 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-2xl max-w-[300px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="ui text-sm font-semibold text-gray-900 mb-1">
                      {slides[current].product.title}
                    </div>
                    <div className="ui text-xs text-purple-600 font-medium mb-2">
                      {slides[current].product.subtitle}
                    </div>
                    <p className="ui text-[12px] text-gray-600 leading-relaxed">
                      {slides[current].product.desc}
                    </p>

                    {/* Small “Buy Now” thumbnail like reference */}
                    <div className="mt-3 relative overflow-hidden rounded-xl border border-gray-200">
                      <img
                        src={slides[current].image}
                        className="w-full h-[120px] object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-between p-2">
                        <button className="px-3 py-1 rounded-full text-[11px] bg-white/90 text-gray-800 font-medium">
                          Buy Now
                        </button>
                        <button className="w-6 h-6 rounded-full bg-white/90 grid place-items-center">
                          <Heart className="w-3.5 h-3.5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
