import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Parent d'élève",
      avatar: "👩‍💼",
      rating: 5,
      text: "La plateforme est excellente et très intuitive. Mon fils a progressé de manière impressionnante en mathématiques grâce à son professeur. Je recommande vivement !",
      highlight: "Progression impressionnante"
    },
    {
      name: "Ahmed Benali",
      role: "Étudiant en Terminale",
      avatar: "👨‍🎓",
      rating: 5,
      text: "Les cours en ligne sont de très haute qualité. Mon professeur de physique m'a aidé à comprendre des concepts difficiles. Mes notes se sont nettement améliorées.",
      highlight: "Très haute qualité"
    },
    {
      name: "Fatima El Mansouri",
      role: "Parent d'élève",
      avatar: "👩‍🏫",
      rating: 5,
      text: "Service exceptionnel ! Le suivi personnalisé et la flexibilité des horaires ont vraiment fait la différence pour ma fille. Elle est maintenant plus confiante.",
      highlight: "Service exceptionnel"
    },
    {
      name: "Lucas Martin",
      role: "Étudiant en Première",
      avatar: "👨‍💻",
      rating: 5,
      text: "Mon professeur d'anglais est fantastique. Les méthodes d'enseignement sont modernes et efficaces. J'ai gagné 3 points de moyenne en un trimestre !",
      highlight: "Méthodes modernes"
    },
    {
      name: "Amina Kassim",
      role: "Parent d'élève",
      avatar: "👩‍🔬",
      rating: 5,
      text: "Excellente expérience ! La plateforme facilite la communication avec le professeur. Mon fils a retrouvé sa motivation pour les études.",
      highlight: "Excellente expérience"
    },
    {
      name: "Youssef Alami",
      role: "Étudiant en Seconde",
      avatar: "👨‍🚀",
      rating: 5,
      text: "Les cours sont adaptés à mon rythme et à mes besoins. Mon professeur de français m'a aidé à mieux structurer mes dissertations. Merci Connect School !",
      highlight: "Adaptés à mon rythme"
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-lavender-50 to-white relative overflow-hidden pl-64">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-lavender-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-lavender-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Témoignages clients</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Découvrez ce que nos{' '}
            <span className="bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
              clients
            </span>{' '}
            disent de nous
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Plus de 1000 familles nous font confiance pour l'éducation de leurs enfants. 
            Découvrez leurs expériences et leurs succès.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div className="glass-card p-6 rounded-2xl h-full hover:shadow-2xl transition-all duration-300 border border-white/30 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Quote className="w-8 h-8 text-purple-500" />
                </div>

                {/* Content */}
                <div className="space-y-4 relative z-10">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Highlight */}
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-lavender-100 text-purple-700 rounded-full text-sm font-medium">
                    "{testimonial.highlight}"
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-lavender-300 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-lavender-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
                  4.9/5
                </div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
                  1000+
                </div>
                <div className="text-sm text-gray-600">Familles satisfaites</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-lavender-500 bg-clip-text text-transparent">
                  24h
                </div>
                <div className="text-sm text-gray-600">Réponse garantie</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;