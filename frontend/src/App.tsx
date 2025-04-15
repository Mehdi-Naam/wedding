import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Camera, Heart, MessageCircle, Image as ImageIcon, Sun, Moon } from 'lucide-react';
import HomePage from './pages/HomePage';
import MessageForm from './pages/MessageForm';
import GalleryPage from './pages/GalleryPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm fixed w-full z-10 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-xl font-serif text-gray-900 dark:text-white">Aouatif & Mahdi</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <a href="/" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400">
                  <MessageCircle className="h-5 w-5" />
                  <span>Home</span>
                </a>
                <a href="/message" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400">
                  <Camera className="h-5 w-5" />
                  <span>Leave Message</span>
                </a>
                <a href="/gallery" className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400">
                  <ImageIcon className="h-5 w-5" />
                  <span>Gallery</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/message" element={<MessageForm />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
