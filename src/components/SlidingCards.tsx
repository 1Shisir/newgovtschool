import { motion } from 'motion/react';
import { Microscope, Palette, Trophy, Library, FlaskConical, Trees } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const iconMap: any = {
  Microscope: <Microscope size={32} />,
  Palette: <Palette size={32} />,
  Trophy: <Trophy size={32} />,
  Library: <Library size={32} />,
  FlaskConical: <FlaskConical size={32} />,
  Trees: <Trees size={32} />,
};

export default function SlidingCards() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'academics'), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'academics'));
    return () => unsub();
  }, []);

  if (cards.length === 0) return null;

  return (
    <section className="py-24 bg-school-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-school-primary mb-4">
          Programs & Facilities
        </h2>
        <div className="w-20 h-1 bg-school-accent" />
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          className="flex gap-8 px-4"
        >
          {[...cards, ...cards].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-[320px] sm:w-[400px] bg-white rounded-lg shadow-soft overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image || "https://picsum.photos/seed/school-facility/600/400"}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-school-primary shadow-md">
                  {iconMap[card.icon] || <Library size={32} />}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif font-bold text-school-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-school-muted text-sm leading-relaxed">
                  {card.description}
                </p>
                <button className="mt-6 text-sm font-medium text-school-accent hover:text-school-primary transition-colors flex items-center gap-2">
                  Learn More <span className="text-lg">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
