import { motion } from 'framer-motion';
import { User, Mail, BookOpen, GraduationCap } from 'lucide-react';

export default function Profile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-2xl mx-auto space-y-6 pb-10"
    >
      <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-300">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src="./public/purplesunflower.jpg"
            alt="Foto Profil"
            className="rounded-full object-cover w-full h-full border-4 border-secandary dark:border-primary/20 shadow-md"
          />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700">Lisa Harniati</h1>
        <p className="text-primary font-medium mb-8">Mahasiswa UIN SUSKA RIAU</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-center gap-4 p-4 bg-yellow-100 dark:bg-gray-900 rounded-2xl transition-colors transition-all hover:-translate-y-1 flex items-center gap-6">
            <div className="bg-secandary/50 dark:bg-primary/20 p-3 rounded-xl text-primary"><User size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">NIM</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">12450121423</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-purple-100 dark:bg-gray-900 rounded-2xl transition-colors transition-all hover:-translate-y-1 flex items-center gap-6">
            <div className="bg-secandary/50 dark:bg-primary/20 p-3 rounded-xl text-primary"><GraduationCap size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Kelas</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">PWeb 4C</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-purple-100 dark:bg-gray-900 rounded-2xl transition-colors transition-all hover:-translate-y-1 flex items-center gap-6">
            <div className="bg-secandary/50 dark:bg-primary/20 p-3 rounded-xl text-primary"><BookOpen size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Program Studi</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Teknik Informatika</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-yellow-100 dark:bg-gray-900 rounded-2xl transition-colors transition-all hover:-translate-y-1 flex items-center gap-6">
            <div className="bg-secandary/50 dark:bg-primary/20 p-3 rounded-xl text-primary"><Mail size={20} /></div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">lisha08@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}