import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Globe, X } from 'lucide-react';

/** Inline SVG logo (symbol-only, no text) – matches reference style */
const LogoSVG = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <rect x="6" y="18" width="36" height="12" rx="6" fill="#111827"/>
    <rect x="18" y="6" width="12" height="36" rx="6" fill="#111827"/>
  </svg>
);

const SideNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', active: true },
    { name: 'Shops', href: '#shops' },
    { name: 'Collections', href: '#collections' },
    { name: 'About us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialIcons = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: X, href: '#', label: 'X' },
    { icon: Globe, href: '#', label: 'Website' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Left Sidebar (always visible; font/spacing per reference) */}
      <nav className="fixed left-0 top-0 h-full w-64 bg-white z-50 border-r border-gray-200">
        <div className="px-8 pt-8">
          {/* Logo (SVG only, no text) */}
          <motion.div
            className="mb-14"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
              <LogoSVG className="w-7 h-7" />
            </div>
          </motion.div>

          {/* Menu */}
          <ul className="space-y-4 ui">
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <a
                  href={item.href}
                  className={`block text-[15px] ${
                    item.active
                      ? 'text-purple-600 font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-full transition-all ${
                      item.active
                        ? 'bg-purple-50'
                        : 'hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Separator line (matches reference) */}
      <div className="fixed left-64 top-0 h-full w-px bg-gray-200 z-40" />

      {/* Top-right social icons + Sign-up (between the cutouts) */}
      <div className="fixed top-6 right-6 z-50 flex items-center space-x-3">
        {/* Social Icons (exact set & states) */}
        <div className="flex items-center space-x-2">
          {socialIcons.map((s, idx) => (
            <motion.a
              key={s.label}
              href={s.href}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-purple-600 hover:shadow-sm flex items-center justify-center transition-all"
              whileHover={{ y: -2, scale: 1.06 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              aria-label={s.label}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        {/* Sign up button (black pill, exact placement) */}
        <motion.a
          href="#signup"
          className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold ui shadow-md hover:bg-black transition-colors"
          whileHover={{ y: -2, scale: 1.03 }}
        >
          Sign up
        </motion.a>
      </div>

      {/* Centered compact menu when scrolling */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-md"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.98 }}
          >
            <div className="flex items-center gap-7 ui">
              <LogoSVG className="w-5 h-5" />
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm ${
                    item.active ? 'text-purple-600 font-semibold' : 'text-gray-600'
                  } hover:text-gray-900`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNavigation;
