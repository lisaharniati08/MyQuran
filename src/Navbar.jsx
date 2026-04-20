import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenText, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  // Logika: Ambil dari localStorage, atau deteksi preferensi perangkat (System Preference)
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const isActive = (path) => location.pathname === path ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl text-white group-hover:scale-105 transition-transform">
            <BookOpenText size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700">
            QuranApp
          </span>
        </Link>
        
        <ul className="flex items-center gap-6 text-sm sm:text-base">
          <li>
            <Link to="/" className={isActive('/') ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"}>Home</Link>
          </li>
          <li>
            <Link to="/surah" className={isActive('/surah') || location.pathname.startsWith('/surah') ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"}>Surah</Link>
          </li>
          <li>
            <Link to="/profile" className={isActive('/profile') ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"}>Profile</Link>
          </li>
          <li>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}