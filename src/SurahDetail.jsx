import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ArrowLeft, Disc3, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSurahDetail, getTafsirDetail } from './api';
import { DetailSkeleton } from './LoadingSkeleton';

export default function SurahDetail() {
  const { nomor } = useParams();
  const [surah, setSurah] = useState(null);
  const [tafsir, setTafsir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTafsirs, setExpandedTafsirs] = useState({});
  
  // Audio States
  const [playingAyah, setPlayingAyah] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surahRes, tafsirRes] = await Promise.all([
          getSurahDetail(nomor),
          getTafsirDetail(nomor)
        ]);
        setSurah(surahRes.data);
        setTafsir(tafsirRes.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat detail surat.');
        setLoading(false);
      }
    };

    fetchData();
      
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, [nomor]);

  // Handle Audio Ended for AutoPlay
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      if (isAutoPlay && surah && playingAyah < surah.jumlahAyat) {
        const nextAyahNum = playingAyah + 1;
        const nextAyah = surah.ayat.find(a => a.nomorAyat === nextAyahNum);
        if (nextAyah) {
          audio.src = nextAyah.audio['05'];
          audio.play();
          setPlayingAyah(nextAyahNum);
        }
      } else {
        setIsAutoPlay(false);
        setPlayingAyah(null);
      }
    };
    
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [isAutoPlay, playingAyah, surah]);

  const handlePlayPause = (ayatNumber, audioUrl) => {
    if (playingAyah === ayatNumber) {
      audioRef.current.pause();
      setPlayingAyah(null);
      setIsAutoPlay(false);
    } else {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingAyah(ayatNumber);
    }
  };

  const toggleAutoPlay = () => {
    if (isAutoPlay || playingAyah) {
      audioRef.current.pause();
      setIsAutoPlay(false);
      setPlayingAyah(null);
    } else if (surah && surah.ayat.length > 0) {
      setIsAutoPlay(true);
      handlePlayPause(surah.ayat[0].nomorAyat, surah.ayat[0].audio['05']);
    }
  };

  const toggleTafsir = (nomorAyat) => {
    setExpandedTafsirs(prev => ({
      ...prev,
      [nomorAyat]: !prev[nomorAyat]
    }));
  };

  if (loading) return <DetailSkeleton />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!surah) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
      <Link to="/surah" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-max"><ArrowLeft size={18} /> Kembali ke Daftar Surat</Link>

      <div className="bg-gradient-to-br from-primary to-green-800 text-white p-8 rounded-3xl shadow-lg text-center relative overflow-hidden">
        <div className="relative z-10"><h1 className="text-4xl md:text-5xl font-bold font-arabic mb-2">{surah.nama}</h1><h2 className="text-2xl font-semibold mb-1">{surah.namaLatin}</h2><p className="text-green-50 dark:text-green-100 mb-6">{surah.arti} • {surah.tempatTurun} • {surah.jumlahAyat} Ayat</p>
          <button onClick={toggleAutoPlay} className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors shadow-md">
            {isAutoPlay ? <><Pause size={20} /> Pause Audio</> : <><Play size={20} /> Putar Semua Ayat</>}
          </button>
        </div>
        <Disc3 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 pointer-events-none" />
      </div>

      <div className="space-y-4">
        {surah.ayat.map((ayat) => {
          const isPlaying = playingAyah === ayat.nomorAyat;
          const ayahTafsir = tafsir?.tafsir?.find(t => t.ayat === ayat.nomorAyat);
          return (
            <div key={ayat.nomorAyat} className={`bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${isPlaying ? 'border-primary ring-4 ring-primary/10 dark:ring-primary/20' : 'border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/50'}`}>
              <div className="flex justify-between items-center mb-6"><div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 text-primary dark:text-green-400 font-semibold rounded-full flex items-center justify-center text-sm">{ayat.nomorAyat}</div>
                <button onClick={() => handlePlayPause(ayat.nomorAyat, ayat.audio['05'])} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isPlaying ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary'}`}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                </button>
              </div>
              <p className="font-arabic text-3xl md:text-4xl text-right leading-loose mb-6 text-gray-800 dark:text-gray-100">{ayat.teksArab}</p>
              <div className="space-y-2"><p className="text-primary dark:text-green-400 font-medium">{ayat.teksLatin}</p><p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">{ayat.teksIndonesia}</p></div>

              {ayahTafsir && (
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => toggleTafsir(ayat.nomorAyat)} className="inline-flex items-center gap-2 text-sm font-medium text-primary dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                    <BookOpen size={16} />
                    {expandedTafsirs[ayat.nomorAyat] ? 'Tutup Tafsir' : 'Baca Tafsir'}
                  </button>
                  {expandedTafsirs[ayat.nomorAyat] && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-green-50/50 dark:bg-primary/5 rounded-2xl border border-green-100 dark:border-primary/20 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {ayahTafsir.teks}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div></motion.div>);
}