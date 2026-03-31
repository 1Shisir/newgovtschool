import { useState, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType, signOut } from '../firebase';
import { doc, getDoc, setDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Save, LogOut, Plus, Trash2, Image as ImageIcon, Type, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [siteContent, setSiteContent] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [academics, setAcademics] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    const unsubSite = onSnapshot(doc(db, 'config', 'site'), (snapshot) => {
      if (snapshot.exists()) {
        setSiteContent(snapshot.data());
      } else {
        // Initialize if not exists
        setSiteContent({
          hero: {
            title: 'Welcome to Evergreen Government School',
            subtitle: 'Empowering Minds, Shaping Futures',
            motto: 'A tradition of excellence in education, fostering a community of learners, leaders, and innovators since 1954.',
            backgroundImage: 'https://picsum.photos/seed/school-campus/1920/1080'
          },
          about: {
            title: 'A Tradition of Excellence Since 1954',
            subtitle: 'Our Legacy & Vision',
            description: 'Evergreen Government School has been a cornerstone of the community for over seven decades. Our mission is to provide high-quality, inclusive education that empowers every student to reach their full potential.',
            principalMessage: '"At Evergreen, we don\'t just teach subjects; we nurture character. Our goal is to prepare students not just for exams, but for life."',
            principalName: 'Dr. Sarah Jenkins',
            principalRole: 'Principal, Evergreen School',
            principalImage: 'https://picsum.photos/seed/principal/100/100',
            sideImage: 'https://picsum.photos/seed/school-building/800/1000'
          }
        });
      }
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'config/site'));

    const unsubNotices = onSnapshot(query(collection(db, 'notices'), orderBy('date', 'desc')), (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'notices'));

    const unsubAcademics = onSnapshot(collection(db, 'academics'), (snapshot) => {
      setAcademics(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'academics'));

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'gallery'));

    return () => {
      unsubSite();
      unsubNotices();
      unsubAcademics();
      unsubGallery();
    };
  }, []);

  const handleSaveSiteContent = async () => {
    try {
      await setDoc(doc(db, 'config', 'site'), siteContent);
      alert('Site content saved successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'config/site');
    }
  };

  const handleAddNotice = async () => {
    try {
      await addDoc(collection(db, 'notices'), {
        title: 'New Notice',
        description: 'Description here',
        date: new Date().toISOString().split('T')[0],
        type: 'Event'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'notices');
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `notices/${id}`);
    }
  };

  const handleUpdateNotice = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, 'notices', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `notices/${id}`);
    }
  };

  const handleAddGalleryImage = async () => {
    try {
      await addDoc(collection(db, 'gallery'), {
        src: 'https://picsum.photos/seed/new-image/800/600',
        alt: 'New Gallery Image',
        span: 'row-span-1'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gallery');
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-school-primary text-white p-6 flex flex-col">
        <h1 className="text-xl font-serif font-bold mb-8">Admin Panel</h1>
        <nav className="flex-grow space-y-2">
          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-4 py-2 rounded ${activeTab === 'hero' ? 'bg-school-accent' : 'hover:bg-white/10'}`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full text-left px-4 py-2 rounded ${activeTab === 'about' ? 'bg-school-accent' : 'hover:bg-white/10'}`}
          >
            About Section
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`w-full text-left px-4 py-2 rounded ${activeTab === 'notices' ? 'bg-school-accent' : 'hover:bg-white/10'}`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-4 py-2 rounded ${activeTab === 'gallery' ? 'bg-school-accent' : 'hover:bg-white/10'}`}
          >
            Gallery
          </button>
        </nav>
        <button
          onClick={() => signOut(auth)}
          className="mt-auto flex items-center gap-2 text-white/70 hover:text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-school-primary capitalize">{activeTab} Management</h2>
            {(activeTab === 'hero' || activeTab === 'about') && (
              <button
                onClick={handleSaveSiteContent}
                className="flex items-center gap-2 px-6 py-2 bg-school-accent text-white rounded shadow hover:bg-school-accent/90"
              >
                <Save size={18} /> Save Changes
              </button>
            )}
          </div>

          {activeTab === 'hero' && siteContent && (
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={siteContent.hero.title}
                  onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, title: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={siteContent.hero.subtitle}
                  onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, subtitle: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Motto</label>
                <textarea
                  value={siteContent.hero.motto}
                  onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, motto: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={siteContent.hero.backgroundImage}
                  onChange={(e) => setSiteContent({ ...siteContent, hero: { ...siteContent.hero, backgroundImage: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'about' && siteContent && (
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
                <input
                  type="text"
                  value={siteContent.about.title}
                  onChange={(e) => setSiteContent({ ...siteContent, about: { ...siteContent.about, title: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Description</label>
                <textarea
                  value={siteContent.about.description}
                  onChange={(e) => setSiteContent({ ...siteContent, about: { ...siteContent.about, description: e.target.value } })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name</label>
                  <input
                    type="text"
                    value={siteContent.about.principalName}
                    onChange={(e) => setSiteContent({ ...siteContent, about: { ...siteContent.about, principalName: e.target.value } })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Principal Image URL</label>
                  <input
                    type="text"
                    value={siteContent.about.principalImage}
                    onChange={(e) => setSiteContent({ ...siteContent, about: { ...siteContent.about, principalImage: e.target.value } })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-school-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-4">
              <button
                onClick={handleAddNotice}
                className="flex items-center gap-2 px-4 py-2 bg-school-primary text-white rounded hover:bg-school-primary/90"
              >
                <Plus size={18} /> Add Notice
              </button>
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="flex-grow space-y-3">
                    <input
                      type="text"
                      value={notice.title}
                      onChange={(e) => handleUpdateNotice(notice.id, { title: e.target.value })}
                      className="w-full font-bold text-lg border-b border-transparent focus:border-school-primary outline-none"
                    />
                    <textarea
                      value={notice.description}
                      onChange={(e) => handleUpdateNotice(notice.id, { description: e.target.value })}
                      className="w-full text-sm text-gray-600 border-b border-transparent focus:border-school-primary outline-none h-20"
                    />
                    <div className="flex gap-4">
                      <input
                        type="date"
                        value={notice.date}
                        onChange={(e) => handleUpdateNotice(notice.id, { date: e.target.value })}
                        className="text-sm border rounded p-1"
                      />
                      <select
                        value={notice.type}
                        onChange={(e) => handleUpdateNotice(notice.id, { type: e.target.value })}
                        className="text-sm border rounded p-1"
                      >
                        <option value="Event">Event</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Academic">Academic</option>
                        <option value="Holiday">Holiday</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <button
                onClick={handleAddGalleryImage}
                className="flex items-center gap-2 px-4 py-2 bg-school-primary text-white rounded hover:bg-school-primary/90"
              >
                <Plus size={18} /> Add Gallery Image
              </button>
              <div className="grid grid-cols-2 gap-6">
                {gallery.map((img) => (
                  <div key={img.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
                    <div className="h-40 bg-gray-100 rounded overflow-hidden">
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </div>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={img.src}
                      onChange={(e) => updateDoc(doc(db, 'gallery', img.id), { src: e.target.value })}
                      className="w-full text-xs border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Alt Text"
                      value={img.alt}
                      onChange={(e) => updateDoc(doc(db, 'gallery', img.id), { alt: e.target.value })}
                      className="w-full text-xs border rounded p-2"
                    />
                    <div className="flex justify-between items-center">
                      <select
                        value={img.span}
                        onChange={(e) => updateDoc(doc(db, 'gallery', img.id), { span: e.target.value })}
                        className="text-xs border rounded p-1"
                      >
                        <option value="row-span-1">Small (1 row)</option>
                        <option value="row-span-2">Large (2 rows)</option>
                      </select>
                      <button
                        onClick={() => handleDeleteGalleryImage(img.id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
