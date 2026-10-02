import React from 'react';
import { NavigationTab } from '../../types';
import { INITIAL_MATERIALS } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  Gamepad2, 
  FileSpreadsheet, 
  MonitorPlay, 
  BookMarked, 
  Layers, 
  ArrowRight, 
  Wand2, 
  Award, 
  FileText
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { themeConfig } = useTheme();

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Welcome Banner */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${themeConfig.heroGradient} rounded-3xl p-6 lg:p-10 text-white shadow-xl shadow-slate-900/20 border border-slate-800 transition-all duration-300`}>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wide border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-white">EduSmart Lab Ikanuraisma</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-200">Create • Learn • Teach with AI</span>
          </div>

          <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight text-white">
            Pusat Kreasi & Inovasi Produk Edukasi Digital
          </h2>

          <p className="text-xs lg:text-sm text-slate-300 font-medium leading-relaxed">
            Rancang game edukatif, lembar kerja anak siap cetak, media presentasi terstruktur, buku dongeng bersambung, flashcard edukasi, hingga lagu anak berima dengan panduan prompt AI terpadu.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('tool-game')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Game Studio</span>
            </button>
            <button
              onClick={() => onNavigate('tool-worksheet')}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Worksheet Studio</span>
            </button>
            <button
              onClick={() => onNavigate('tool-media')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <MonitorPlay className="w-4 h-4" />
              <span>Media Slide Studio</span>
            </button>
            <button
              onClick={() => onNavigate('tool-storybook')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <BookMarked className="w-4 h-4" />
              <span>Buku Cerita</span>
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-tr from-white/10 via-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 text-7xl opacity-20 select-none hidden sm:block">
          🦉✨
        </div>
      </div>

      {/* Metrics Status Bar (Clean without technical 300dpi in headings) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: 'Studio AI Lengkap', value: '8+ Generator', desc: 'Game, Worksheet, Slide, Dongeng', color: 'border-l-4 border-l-blue-500' },
          { label: 'Kesiapan Bahan Ajar', value: 'Format Siap Cetak', desc: 'Tata letak proporsional rapi', color: 'border-l-4 border-l-emerald-500' },
          { label: 'Disiplin Pedagogis', value: '1 Lembar 1 Aktivitas', desc: 'Fokus materi tanpa distraksi', color: 'border-l-4 border-l-purple-500' },
          { label: 'Kustomisasi Tampilan', value: 'Fleksibel & Modern', desc: 'Antarmuka bersih dan responsif', color: 'border-l-4 border-l-orange-500' }
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-4 lg:p-5 rounded-3xl border border-slate-200 shadow-2xs ${stat.color}`}>
            <span className="text-[11px] font-semibold text-slate-400 block">{stat.label}</span>
            <span className="text-base lg:text-lg font-extrabold text-slate-900 font-heading block mt-0.5">
              {stat.value}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">{stat.desc}</span>
          </div>
        ))}
      </div>

      {/* 6 Quick Creator Launchers without theme names or DPI in UI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base lg:text-lg font-bold text-slate-900 font-heading">
              Pilih Studio Pembuatan Produk Edukasi
            </h3>
            <p className="text-xs text-slate-500">
              Luncurkan generator AI interaktif sesuai format materi yang kamu butuhkan:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'tool-game',
              title: 'Game Edukasi',
              desc: 'Rancang kuis interaktif dengan pilihan format soal, tantangan adaptif, dan instruksi menyenangkan.',
              icon: Gamepad2,
              color: 'text-orange-600',
              bg: 'bg-orange-50',
              border: 'hover:border-orange-400',
              badge: 'Interaktif'
            },
            {
              id: 'tool-worksheet',
              title: 'Worksheet Studio',
              desc: 'Rancang lembar aktivitas coding arah, tracing garis, counting, dan logika anak usia dini hingga SD.',
              icon: FileSpreadsheet,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
              border: 'hover:border-emerald-400',
              badge: 'Siap Cetak'
            },
            {
              id: 'tool-media',
              title: 'Media Pembelajaran',
              desc: 'Presentasi kelas berurutan: Cover, Navigasi, Tujuan Pembelajaran, Materi, Kuis, Feedback, dan Penutup.',
              icon: MonitorPlay,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              border: 'hover:border-blue-400',
              badge: 'Presentasi Kelas'
            },
            {
              id: 'tool-storybook',
              title: 'Buku Dongeng & Cerita',
              desc: 'Rancang buku cerita anak dengan karakter konsisten, alur narasi mendidik, dan pesan moral.',
              icon: BookMarked,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
              border: 'hover:border-purple-400',
              badge: 'Buku Bergambar'
            },
            {
              id: 'tool-flashcard',
              title: 'Flashcard Studio',
              desc: 'Generator kartu bergambar untuk pengenalan kosakata, benda sekitar, dan konsep dasar anak.',
              icon: Layers,
              color: 'text-pink-600',
              bg: 'bg-pink-50',
              border: 'hover:border-pink-400',
              badge: 'Kartu Belajar'
            },
            {
              id: 'tool-lkpd',
              title: 'LKPD Kurikulum Merdeka',
              desc: 'Lembar kerja inkuiri sains dengan Profil Pelajar Pancasila, langkah pengamatan, dan rubrik asesmen.',
              icon: FileText,
              color: 'text-slate-800',
              bg: 'bg-slate-100',
              border: 'hover:border-slate-400',
              badge: 'Inkuiri Sains'
            }
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id as NavigationTab)}
                className={`bg-white rounded-3xl border border-slate-200 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer group ${card.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-blue-600 mt-4 pt-3 border-t border-slate-100">
                  <span>Buka Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Educational Materials */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base lg:text-lg font-bold text-slate-900 font-heading">
              Materi Edukasi Paling Populer Minggu Ini
            </h3>
            <p className="text-xs text-slate-500">
              Contoh hasil produk yang dapat langsung kamu pelajari atau remix:
            </p>
          </div>
          <button
            onClick={() => onNavigate('materi-worksheet')}
            className={`text-xs font-bold ${themeConfig.text} hover:opacity-80 flex items-center gap-1`}
          >
            <span>Lihat Semua Pustaka</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INITIAL_MATERIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(
                item.category === 'game' ? 'tool-game' :
                item.category === 'worksheet' ? 'tool-worksheet' :
                item.category === 'media' ? 'tool-media' : 'tool-storybook'
              )}
              className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between hover:border-slate-300"
            >
              <div>
                <div className="text-3xl mb-2">{item.thumbnail}</div>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  {item.categoryLabel}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                <span>{item.ageGroup}</span>
                <span className={`font-bold ${themeConfig.text} flex items-center gap-1`}>
                  <Wand2 className="w-3 h-3" />
                  Remix
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Manifesto & Quality Rules */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Pedoman Standar Kualitas EduSmart Lab Ikanuraisma</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-1">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-white block">1. 1 Halaman = 1 Aktivitas</span>
            <p className="text-slate-400">Mencegah cognitive overload pada anak dengan fokus pada satu konsep pembelajaran per lembar.</p>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-white block">2. Whitespace & Safe Margin</span>
            <p className="text-slate-400">Memberikan ruang bernapas lega di sekeliling halaman agar teks dan objek tidak terpotong saat dicetak atau dijilid.</p>
          </div>
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
            <span className="font-bold text-white block">3. Materi Bersih & Edukatif</span>
            <p className="text-slate-400">Menghasilkan karya berkualitas tinggi tanpa watermark promosi atau elemen yang mengganggu fokus belajar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
