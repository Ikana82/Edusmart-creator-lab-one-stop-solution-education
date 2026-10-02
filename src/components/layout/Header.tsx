import React from 'react';
import { NavigationTab } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { ThemeSelector } from '../common/ThemeSelector';
import { 
  Menu, 
  Search, 
  Plus, 
  Gamepad2, 
  FileSpreadsheet, 
  MonitorPlay, 
  BookMarked,
  Layers,
  FileText,
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenMobile,
  onOpenSearch,
  onReset
}) => {
  const { themeConfig } = useTheme();

  const getTabLabel = (tab: NavigationTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'materi-worksheet': return 'Pustaka Worksheet';
      case 'materi-lkpd': return 'Pustaka LKPD';
      case 'materi-media': return 'Pustaka Media';
      case 'materi-game': return 'Pustaka Game';
      case 'materi-komik': return 'Pustaka Komik';
      case 'materi-flashcard': return 'Pustaka Flashcard';
      case 'materi-ebook': return 'Storybook atau Buku Cerita';
      case 'tool-worksheet': return 'Worksheet Studio';
      case 'tool-game': return 'Game Studio';
      case 'tool-media': return 'Media Pembelajaran';
      case 'tool-storybook': return 'Storybook Studio';
      case 'tool-flashcard': return 'Flashcard Studio';
      case 'tool-lkpd': return 'LKPD Generator';
      case 'tool-komik': return 'Komik Generator';
      case 'tool-song': return 'Lagu Edukasi';
      case 'tool-video': return 'Storyboard Video';
      case 'video-storyboard': return 'Storyboard & Script';
      case 'video-konsep': return 'Konsep Video';
      case 'video-lagu': return 'Lirik & Musik';
      case 'video-voiceover': return 'Voiceover & Narasi';
      case 'prompt-library': return 'Prompt Library';
      case 'ai-directory': return 'AI Tools Directory';
      default: return 'EduSmart Lab';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Left: Mobile trigger & clean, non-cluttered single-line heading */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 tracking-tight text-sm">EduSmart Lab</span>
          <span className="text-slate-300 font-medium">·</span>
          <span className="text-xs font-bold text-slate-600">Ikanuraisma</span>
          {activeTab !== 'dashboard' && (
            <>
              <span className="text-slate-300">/</span>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg ${themeConfig.badge}`}>
                {getTabLabel(activeTab)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Theme Switcher (ONLY 1 place in the whole app) & Search & Reset & Create */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* The single official Theme Switcher in the app */}
        <ThemeSelector />

        {/* Minimalist Round Search Button for Neat Look */}
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-center w-9 h-9 text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-800 rounded-xl transition-all border border-slate-200 shadow-2xs group shrink-0"
          title="Cari materi, prompt, atau tools (Ctrl+K)"
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors" />
        </button>

        {/* Compact Reset Button to Restart Everything */}
        <button
          onClick={onReset}
          className="flex items-center justify-center w-9 h-9 text-slate-500 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all border border-slate-200 shadow-2xs group shrink-0"
          title="Reset Aplikasi / Mulai Ulang"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-45" />
        </button>

        {/* Quick Creator Button Dropdown */}
        <div className="relative group">
          <button 
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold ${themeConfig.primary} ${themeConfig.primaryHover} rounded-2xl shadow-xs transition-all active:scale-95`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Buat Produk AI</span>
          </button>

          {/* Hover Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 hidden group-hover:block transition-all z-40 animate-in fade-in slide-in-from-top-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pilih Studio AI:
            </div>
            <button
              onClick={() => onSelectTab('tool-game')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-orange-500" />
              <span>Game Studio</span>
            </button>
            <button
              onClick={() => onSelectTab('tool-worksheet')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Worksheet Studio</span>
            </button>
            <button
              onClick={() => onSelectTab('tool-media')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <MonitorPlay className="w-4 h-4 text-blue-600" />
              <span>Media Pembelajaran</span>
            </button>
            <button
              onClick={() => onSelectTab('tool-storybook')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <BookMarked className="w-4 h-4 text-purple-600" />
              <span>Storybook Studio</span>
            </button>
            <button
              onClick={() => onSelectTab('tool-flashcard')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <Layers className="w-4 h-4 text-pink-600" />
              <span>Flashcard Studio</span>
            </button>
            <button
              onClick={() => onSelectTab('tool-lkpd')}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium text-left transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-800" />
              <span>LKPD Kurikulum Merdeka</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
