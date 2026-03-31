import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Hero() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data().hero);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'config/site'));
    return () => unsub();
  }, []);

  if (!content) return null;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.backgroundImage || "https://picsum.photos/seed/school-campus/1920/1080"}
          alt="Evergreen School Campus"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-school-primary/80 to-school-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-sm sm:text-base font-sans font-medium tracking-[0.2em] uppercase text-school-accent">
            {content.subtitle || "Empowering Minds, Shaping Futures"}
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold leading-tight max-w-4xl mx-auto">
            {content.title || "Welcome to Evergreen Government School"}
          </h1>
          <p className="text-lg sm:text-xl font-sans font-light max-w-2xl mx-auto text-gray-100">
            {content.motto || "A tradition of excellence in education, fostering a community of learners, leaders, and innovators since 1954."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-school-accent text-white font-medium rounded-sm flex items-center gap-2 hover:bg-school-accent/90 transition-all shadow-lg"
            >
              Explore Academics <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-sm hover:bg-white/20 transition-all"
            >
              Admissions Open
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
