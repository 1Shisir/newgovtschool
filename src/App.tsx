import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SlidingCards from './components/SlidingCards';
import About from './components/About';
import NoticeBoard from './components/NoticeBoard';
import Academics from './components/Academics';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { auth, db, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState(window.location.pathname);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else if (user.email === 'shisirghimire21@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          // If user doc doesn't exist, check if it's the default admin
          if (user.email === 'shisirghimire21@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      unsub();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen bg-school-secondary font-serif text-school-primary">Evergreen School...</div>;

  // Simple routing
  if (path === '/admin') {
    if (!user) return <Login />;
    if (!isAdmin) return (
      <div className="min-h-screen flex items-center justify-center bg-school-secondary p-8 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-serif font-bold text-school-primary">Access Denied</h1>
          <p className="text-school-muted">You do not have administrative privileges. Please contact the school office if you believe this is an error.</p>
          <button onClick={() => auth.signOut()} className="text-school-accent underline">Logout</button>
          <br />
          <a href="/" className="inline-block mt-4 text-sm text-school-muted">Back to Home</a>
        </div>
      </div>
    );
    return <AdminDashboard />;
  }

  return (
    <div className="relative min-h-screen bg-school-secondary selection:bg-school-accent selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-school-accent z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <SlidingCards />
        </motion.div>

        <About />
        
        <NoticeBoard />
        
        <Academics />
        
        <Gallery />
      </main>

      <Footer />

      {/* Admin Link (Hidden/Subtle) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <a href="/admin" className="text-[10px] text-school-muted uppercase tracking-widest">Admin</a>
      </div>

      {/* Subtle Floating Contact Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-school-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-school-accent/90 transition-all md:hidden"
      >
        <span className="text-2xl">✉</span>
      </motion.button>
    </div>
  );
}
