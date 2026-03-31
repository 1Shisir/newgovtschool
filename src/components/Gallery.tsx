import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'gallery'));
    return () => unsub();
  }, []);

  return (
    <section id="gallery" className="py-24 bg-school-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-school-accent">
              <Camera size={24} />
              <h2 className="text-sm font-sans font-bold tracking-[0.2em] uppercase">
                Life at Evergreen
              </h2>
            </div>
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-school-primary leading-tight">
              Capturing Real-Life Moments
            </h3>
            <p className="text-school-muted text-lg font-sans leading-relaxed">
              Explore our gallery to see the vibrant life on campus, from classroom discoveries to athletic triumphs and artistic expressions.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-school-primary font-medium rounded-sm border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
            View All Photos
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.length === 0 ? (
             <p className="text-school-muted italic col-span-full text-center">Gallery is being updated...</p>
          ) : (
            images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg group ${image.span}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white font-serif font-bold text-xl">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
