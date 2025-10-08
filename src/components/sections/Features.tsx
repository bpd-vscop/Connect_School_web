import { motion } from 'framer-motion';
import { Award, Clock, Monitor, Heart, Shield, TrendingUp } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Award,
      title: "Professeurs qualifiés",
      description: "Enseignants diplômés et expérimentés, sélectionnés pour leur expertise pédagogique.",
      color: "from-purple-500 to-lavender-400"
    },
    {
      icon: Clock,
      title: "Disponibilité rapide",
      description: "Mise en relation avec un professeur sous 24h selon vos besoins.",
      color: "from-lavender-500 to-purple-400"
    },
    {
      icon: Monitor,
      title: "Cours flexibles",
      description: "À domicile ou en ligne, en individuel ou en petits groupes selon votre préférence.",
      color: "from-purple-600 to-lavender-500"
    },
    {
      icon: Heart,
      title: "Suivi personnalisé",
      description: "Méthodes adaptées à chaque élève avec communication régulière aux parents.",
      color: "from-lavender-400 to-purple-500"
    },
    {
      icon: Shield,
      title: "Service de confiance",
      description: "Paiement après le cours, transparence totale et satisfaction garantie.",
      color: "from-purple-500 to-lavender-600"
    },
    {
      icon: TrendingUp,
      title: "Résultats concrets",
      description: "Amélioration des notes et réussite scolaire de nos élèves.",
      color: "from-lavender-600 to-purple-400"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-100 to-lavender-100 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-lavender-100 to-purple-100 rounded-full blur-xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi choisir{' '}
            <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
              Connect School
            </span>{' '}
            pour vos enfants ?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Un service de soutien scolaire de qualité qui accompagne les familles avec des professeurs 
            expérimentés et des méthodes pédagogiques éprouvées.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="glass-card p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-300 border border-white/20">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-lavender-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 glass-card p-6 rounded-2xl">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br ${
                    i % 2 === 0 ? 'from-purple-400 to-lavender-300' : 'from-lavender-400 to-purple-300'
                  } flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">+1000 étudiants satisfaits</div>
              <div className="text-sm text-gray-600">Rejoignez notre communauté d'apprenants</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r  bg-black to-gray-900 text-white rounded-full font-medium ml-6"
              type="button"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Commencer maintenant
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;