import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Zap } from 'lucide-react';

const CTA = () => {
  const benefits = [
    {
      icon: BookOpen,
      text: "Cours d'essai gratuit"
    },
    {
      icon: Users,
      text: "Professeurs certifiés"
    },
    {
      icon: Award,
      text: "Suivi personnalisé"
    },
    {
      icon: Zap,
      text: "Résultats garantis"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-lavender-500 to-purple-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated background shapes */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-lg"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Rejoignez +1000 familles satisfaites</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
            >
              Prêt à transformer
              <br />
              l'éducation de votre enfant ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
            >
              Commencez dès aujourd'hui avec un cours d'essai gratuit. 
              Connect School vous propose des professeurs qualifiés pour accompagner votre enfant vers la réussite.
            </motion.p>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-4 rounded-xl text-center bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <benefit.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <p className="text-white font-medium text-sm">{benefit.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>Réserver un cours d'essai gratuit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

           {/*    <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Découvrir nos professeurs
              </motion.button> */}
            </motion.div>

            {/* Trust Indicators 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <p className="text-white/70 text-sm mb-4">Ils nous font confiance :</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
               */} {/* Placeholder for trust logos 
                <div className="w-20 h-8 bg-white/20 rounded"></div>
                <div className="w-24 h-8 bg-white/20 rounded"></div>
                <div className="w-16 h-8 bg-white/20 rounded"></div>
                <div className="w-28 h-8 bg-white/20 rounded"></div>
              </div>
            </motion.div>
*/}
            {/* Bottom Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-white/60 text-sm pt-4"
            >
              ✨ Aucune carte de crédit requise • Paiement après le cours • Satisfaction garantie
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;