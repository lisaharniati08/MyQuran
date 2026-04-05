import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import SurahList from './SurahList';
import SurahDetail from './SurahDetail';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col relative">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surah" element={<SurahList />} />
            <Route path="/surah/:nomor" element={<SurahDetail />} />
          </Routes>
        </main>
        <ScrollToTop />
      </div>
    </HashRouter>
  );
}

export default App;