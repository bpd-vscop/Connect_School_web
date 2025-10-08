import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Target, Heart, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "1100+", label: "Élèves accompagnés", icon: Users },
    { number: "100+", label: "Professeurs qualifiés", icon: Award },
    { number: "95%", label: "Taux de réussite", icon: Star },
    { number: "3", label: "Années d'expérience", icon: Target }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 via-white to-lavender-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-lavender-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-lavender-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>À propos de nous</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Qui est{' '}
              <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
                Connect School
              </span>{' '}
              ?
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Connect School</strong> est un service de soutien scolaire 
                  spécialisé qui accompagne les familles marocaines depuis 3 ans. Notre mission est simple : 
                  aider chaque élève à progresser, améliorer ses notes et réussir dans ses études.
                </p>
                
                <p>
                  Nous proposons des <strong className="text-purple-600">cours particuliers</strong>, 
                  de l'<strong className="text-purple-600">aide aux devoirs</strong>, du 
                  <strong className="text-purple-600"> renforcement dans toutes les matières</strong> et 
                  de la <strong className="text-purple-600">préparation aux examens</strong> du primaire à l'université.
                </p>

                <p>
                  Nos enseignants passionnés et qualifiés utilisent des méthodes adaptées à chaque élève, 
                  avec un suivi régulier en lien avec les parents. Que ce soit en présentiel ou en ligne, 
                  en individuel ou en petits groupes, nous nous adaptons à vos besoins avec des horaires flexibles.
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-lavender-400 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Notre engagement</div>
                  <div className="text-gray-600">Accompagner chaque famille vers la réussite scolaire</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-2xl text-center border border-white/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-lavender-400 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;