import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function About() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        setContent(snapshot.data().about);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'config/site'));
    return () => unsub();
  }, []);

  if (!content) return null;

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-texture opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Asymmetry */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src={content.sideImage || "https://picsum.photos/seed/school-building/800/1000"}
                alt="Evergreen School Building"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-school-accent/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-school-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-school-accent">
                {content.subtitle || "Our Legacy & Vision"}
              </h2>
              <h3 className="text-4xl sm:text-5xl font-serif font-bold text-school-primary leading-tight">
                {content.title || "A Tradition of Excellence Since 1954"}
              </h3>
            </div>
            
            <div className="space-y-6 text-school-muted text-lg leading-relaxed font-sans">
              <p>
                {content.description || "Evergreen Government School has been a cornerstone of the community for over seven decades. Our mission is to provide high-quality, inclusive education that empowers every student to reach their full potential."}
              </p>
            </div>

            {/* Principal's Message Snippet */}
            <div className="pt-8 border-t border-gray-100">
              <div className="relative p-8 bg-school-secondary rounded-xl border-l-4 border-school-primary">
                <Quote className="absolute top-4 right-4 text-school-primary/10 w-12 h-12" />
                <p className="text-school-text italic text-lg mb-6 leading-relaxed">
                  {content.principalMessage || "\"At Evergreen, we don't just teach subjects; we nurture character. Our goal is to prepare students not just for exams, but for life.\""}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={content.principalImage || "https://picsum.photos/seed/principal/100/100"}
                      alt={content.principalName || "Principal"}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-school-primary">{content.principalName || "Dr. Sarah Jenkins"}</h4>
                    <p className="text-sm text-school-muted">{content.principalRole || "Principal, Evergreen School"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
