import { motion } from 'motion/react';
import { BookOpen, Users, Globe, Code, Music, HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const iconMap: any = {
  BookOpen: <BookOpen size={24} />,
  Users: <Users size={24} />,
  Globe: <Globe size={24} />,
  Code: <Code size={24} />,
  Music: <Music size={24} />,
  HeartPulse: <HeartPulse size={24} />,
};

export default function Academics() {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'academics'), (snapshot) => {
      setSubjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'academics'));
    return () => unsub();
  }, []);

  return (
    <section id="academics" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-sans font-bold tracking-[0.2em] uppercase text-school-accent">
            Academic Excellence
          </h2>
          <h3 className="text-4xl sm:text-5xl font-serif font-bold text-school-primary leading-tight">
            Our Curriculum & Subjects
          </h3>
          <div className="w-24 h-1 bg-school-accent mx-auto" />
          <p className="text-school-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We provide a comprehensive and balanced curriculum that prepares students for the challenges of the 21st century.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.length === 0 ? (
            <p className="text-school-muted italic col-span-full text-center">Curriculum details are being updated...</p>
          ) : (
            subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-school-secondary rounded-2xl border border-gray-100 shadow-soft hover:shadow-lg transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${subject.color || 'bg-blue-50 text-blue-600'} group-hover:scale-110 transition-transform`}>
                  {iconMap[subject.icon] || <BookOpen size={24} />}
                </div>
                <h4 className="text-xl font-serif font-bold text-school-primary mb-3">
                  {subject.title}
                </h4>
                <p className="text-school-muted text-sm leading-relaxed">
                  {subject.description}
                </p>
                <button className="mt-6 text-xs font-bold uppercase tracking-widest text-school-primary hover:text-school-accent transition-colors flex items-center gap-2">
                  Learn More <span className="text-lg">→</span>
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
