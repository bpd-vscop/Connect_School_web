import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, BookOpen } from 'lucide-react';
import { useSideNavLayout } from '../../context/SideNavLayoutContext';

const Navigation = () => {
  const { offset } = useSideNavLayout();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'Matières', href: '#subjects' },
    { name: 'Professeurs', href: '#tutors' },
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'À propos', href: '#about' },
  ];

  const languages = ['FR', 'EN', 'AR'];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
      style={{ paddingInlineStart: offset, transition: 'padding-inline-start 0.24s ease-out' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-lavender-400 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Connect School</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{currentLang}</span>
              </motion.button>
            </div>

            {/* CTA Buttons */}
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-4 h-4" />
              <span>Connexion</span>
            </motion.button>

            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-lavender-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Réserver un cours
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-xl mt-2 shadow-lg border border-gray-100">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-gray-600">Langue</span>
                    <div className="flex space-x-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setCurrentLang(lang)}
                          className={`px-2 py-1 text-xs rounded ${currentLang === lang ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-purple-500 hover:text-white transition-colors`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 px-3 pb-2">
                    <button className="w-full px-4 py-2 text-purple-600 border border-purple-200 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                      Connexion
                    </button>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-lavender-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      Réserver un cours
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
