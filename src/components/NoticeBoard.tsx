import { motion } from 'motion/react';
import { Calendar, ChevronRight, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function NoticeBoard() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'notices'));
    return () => unsub();
  }, []);

  return (
    <section id="notices" className="py-24 bg-school-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Section Header */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3 text-school-accent">
              <Bell size={24} />
              <h2 className="text-sm font-sans font-bold tracking-[0.2em] uppercase">
                Stay Informed
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-school-primary leading-tight">
              Latest Notices & Announcements
            </h3>
            <p className="text-school-muted text-lg font-sans leading-relaxed">
              Keep track of all the latest happenings, events, and important updates from Evergreen Government School.
            </p>
            <button className="px-8 py-4 bg-school-primary text-white font-medium rounded-sm hover:bg-school-primary/90 transition-all shadow-md">
              View All Notices
            </button>
          </div>

          {/* Right: Notice Board (Tactile Feel) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 sm:p-12 relative">
              {/* Decorative texture */}
              <div className="absolute inset-0 bg-texture opacity-5 pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                {notices.length === 0 ? (
                  <p className="text-school-muted italic">No notices at the moment.</p>
                ) : (
                  notices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-school-secondary rounded-xl text-school-primary border border-gray-100">
                        <Calendar size={24} className="mb-1" />
                        <span className="text-xs font-bold uppercase tracking-tighter">
                          {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="flex-grow space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-school-accent/10 text-school-accent text-[10px] font-bold uppercase tracking-wider rounded-full">
                            {notice.type}
                          </span>
                          <span className="text-xs text-school-muted">
                            {new Date(notice.date).getFullYear()}
                          </span>
                        </div>
                        <h4 className="text-xl font-serif font-bold text-school-primary group-hover:text-school-accent transition-colors cursor-pointer">
                          {notice.title}
                        </h4>
                        <p className="text-school-muted text-sm leading-relaxed max-w-2xl">
                          {notice.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-school-muted hover:bg-school-primary hover:text-white transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
