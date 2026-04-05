import { Link, useLocation } from 'react-router-dom';
import { BookOpenText } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? "text-primary font-semibold" : "text-gray-600 hover:text-primary transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
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
            <Link to="/" className={isActive('/')}>Home</Link>
          </li>
          <li>
            <Link to="/surah" className={isActive('/surah') || location.pathname.startsWith('/surah') ? "text-primary font-semibold" : "text-gray-600 hover:text-primary transition-colors"}>Surah</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}