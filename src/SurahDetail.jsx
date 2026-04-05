import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ArrowLeft, Disc3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSurahDetail } from './api';
import { DetailSkeleton } from './LoadingSkeleton';

export default function SurahDetail() {
  const { nomor } = useParams();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Audio States
  const [playingAyah, setPlayingAyah] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSurahDetail(nomor);
        setSurah(res.data);
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

  if (loading) return <DetailSkeleton />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!surah) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-20">
      <Link to="/surah" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-max"><ArrowLeft size={18} /> Kembali ke Daftar Surat</Link>

      <div className="bg-gradient-to-br from-primary to-green-800 text-white p-8 rounded-3xl shadow-lg text-center relative overflow-hidden">
        <div className="relative z-10"><h1 className="text-4xl md:text-5xl font-bold font-arabic mb-2">{surah.nama}</h1><h2 className="text-2xl font-semibold mb-1">{surah.namaLatin}</h2><p className="text-green-50 mb-6">{surah.arti} • {surah.tempatTurun} • {surah.jumlahAyat} Ayat</p>
          <button onClick={toggleAutoPlay} className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-md">
            {isAutoPlay ? <><Pause size={20} /> Pause Audio</> : <><Play size={20} /> Putar Semua Ayat</>}
          </button>
        </div>
        <Disc3 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 pointer-events-none" />
      </div>

      <div className="space-y-4">
        {surah.ayat.map((ayat) => {
          const isPlaying = playingAyah === ayat.nomorAyat;
          return (
            <div key={ayat.nomorAyat} className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${isPlaying ? 'border-primary ring-4 ring-primary/10' : 'border-gray-100 hover:border-primary/30'}`}>
              <div className="flex justify-between items-center mb-6"><div className="w-10 h-10 bg-gray-50 text-primary font-semibold rounded-full flex items-center justify-center text-sm">{ayat.nomorAyat}</div>
                <button onClick={() => handlePlayPause(ayat.nomorAyat, ayat.audio['05'])} className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isPlaying ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary'}`}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                </button>
              </div>
              <p className="font-arabic text-3xl md:text-4xl text-right leading-loose mb-6 text-gray-800">{ayat.teksArab}</p>
              <div className="space-y-2"><p className="text-primary font-medium">{ayat.teksLatin}</p><p className="text-gray-600 text-sm md:text-base leading-relaxed">{ayat.teksIndonesia}</p></div>
            </div>
          );
        })}
      </div></motion.div>);
}