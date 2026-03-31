import { auth, googleProvider, signInWithPopup } from '../firebase';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-school-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-10 text-center space-y-8 border border-gray-100"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-school-primary rounded-full flex items-center justify-center text-white shadow-lg">
            <GraduationCap size={32} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-school-primary">Admin Access</h1>
          <p className="text-school-muted font-sans">Please sign in with your authorized Google account to manage the school website.</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-school-primary/30 transition-all shadow-sm"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="pt-4">
          <a href="/" className="text-sm text-school-muted hover:text-school-primary transition-colors">
            ← Back to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
