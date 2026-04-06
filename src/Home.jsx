import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-green-800 text-white p-8 md:p-12 shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Al-Qur'an Digital</h1>
          <p className="text-green-50 text-lg md:text-xl max-w-lg mb-6">
            Baca, pelajari, dan dengarkan lantunan ayat suci Al-Qur'an kapan saja dan di mana saja.
          </p>
          <Link to="/surah" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-md">
            <Book size={20} />
            Mulai Membaca
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <Book className="absolute -bottom-8 -right-8 w-64 h-64 text-white/10 rotate-12 pointer-events-none" />
      </div>

      {/* Stats & Quotes */}
      <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center transition-colors duration-300">
        <p className="font-arabic text-3xl mb-4 text-primary">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِيْ خَلَقَۚ</p>
        <p className="text-gray-600 dark:text-gray-300 italic">"Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan."</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">— Q.S Al-'Alaq: 1</p>
      </div>

      {/* Menu Cards */}
      <div className="max-w-2xl mx-auto w-full">
        <Link to="/surah" className="group bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/50 transition-all hover:-translate-y-1 flex items-center gap-6">
          <div className="w-16 h-16 bg-green-50 dark:bg-primary/10 rounded-2xl flex shrink-0 items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
            <Book size={32} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-1 text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">Daftar Surat</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Jelajahi 114 Surat dalam Al-Qur'an lengkap dengan terjemahan dan audio.</p>
          </div>
        </Link>
      </div>
      
    </motion.div>
  );
}