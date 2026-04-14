import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSurahList } from './api';
import { ListSkeleton } from './LoadingSkeleton';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSurahList();
        setSurahs(res.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data surat. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSurahs = surahs.filter(surah => 
    surah.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
    surah.arti.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Daftar Surat</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">114 Surat dalam Al-Qur'an</p>
        </div>
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Cari surat (contoh: Yasin)..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-secandary/20 dark:focus:ring-primary/40 focus:border-secandary transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}
      {loading && <ListSkeleton />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && filteredSurahs.map((surah, index) => (
          <Link key={surah.nomor} to={`/surah/${surah.nomor}`}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary/30 dark:hover:border-primary/50 transition-all flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 flex items-center justify-center rounded-xl font-semibold text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-colors">{surah.nomor}</div>
              <div className="flex-1"><h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">{surah.namaLatin}</h3><p className="text-xs text-gray-500 dark:text-gray-400">{surah.arti} • {surah.jumlahAyat} Ayat</p></div>
              <div className="font-arabic text-xl text-primary">{surah.nama}</div>
            </motion.div>
          </Link>
        ))}
      </div></motion.div>); }