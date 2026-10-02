import React, { useState } from 'react';
import { 
  NavigationTab 
} from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Wand2, 
  Video, 
  FileText, 
  Compass, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  FileSpreadsheet,
  MonitorPlay,
  Gamepad2,
  Image as ImageIcon,
  Layers,
  Music,
  Sparkles,
  Clapperboard,
  BookMarked,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { themeConfig } = useTheme();
  const [openMateri, setOpenMateri] = useState(true);
  const [openTools, setOpenTools] = useState(true);
  const [openVideoAudio, setOpenVideoAudio] = useState(false);

  const handleTabClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  // Clean category items without theme names or parentheses
  const materiItems = [
    { id: 'materi-worksheet', label: 'Worksheet', icon: FileSpreadsheet, color: 'text-emerald-600', activeBg: 'bg-emerald-600 text-white', hoverBg: 'hover:bg-emerald-50' },
    { id: 'materi-lkpd', label: 'LKPD', icon: FileText, color: 'text-slate-800', activeBg: 'bg-slate-900 text-white', hoverBg: 'hover:bg-slate-100' },
    { id: 'materi-media', label: 'Media Pembelajaran', icon: MonitorPlay, color: 'text-blue-600', activeBg: 'bg-blue-600 text-white', hoverBg: 'hover:bg-blue-50' },
    { id: 'materi-game', label: 'Game Edukasi', icon: Gamepad2, color: 'text-orange-500', activeBg: 'bg-orange-500 text-white', hoverBg: 'hover:bg-orange-50' },
    { id: 'materi-komik', label: 'Komik Edukasi', icon: ImageIcon, color: 'text-rose-500', activeBg: 'bg-rose-500 text-white', hoverBg: 'hover:bg-rose-50' },
    { id: 'materi-flashcard', label: 'Flashcard', icon: Layers, color: 'text-purple-600', activeBg: 'bg-purple-600 text-white', hoverBg: 'hover:bg-purple-50' },
    { id: 'materi-ebook', label: 'Storybook atau Buku Cerita', icon: BookOpen, color: 'text-fuchsia-600', activeBg: 'bg-fuchsia-600 text-white', hoverBg: 'hover:bg-fuchsia-50' },
  ];

  const toolItems = [
    { id: 'tool-worksheet', label: 'Worksheet Studio', icon: FileSpreadsheet, activeBg: 'bg-emerald-600 text-white' },
    { id: 'tool-game', label: 'Game Studio', icon: Gamepad2, activeBg: 'bg-orange-500 text-white' },
    { id: 'tool-media', label: 'Media Pembelajaran', icon: MonitorPlay, activeBg: 'bg-blue-600 text-white' },
    { id: 'tool-storybook', label: 'Storybook Studio', icon: BookMarked, activeBg: 'bg-purple-600 text-white' },
    { id: 'tool-flashcard', label: 'Flashcard Studio', icon: Layers, activeBg: 'bg-pink-600 text-white' },
    { id: 'tool-lkpd', label: 'LKPD Generator', icon: FileText, activeBg: 'bg-slate-900 text-white' },
    { id: 'tool-komik', label: 'Komik Generator', icon: ImageIcon, activeBg: 'bg-rose-500 text-white' },
    { id: 'tool-song', label: 'Lagu Edukasi', icon: Music, activeBg: 'bg-violet-600 text-white' },
    { id: 'tool-video', label: 'Video & Storyboard', icon: Clapperboard, activeBg: 'bg-sky-600 text-white' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/95 backdrop-blur-md border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Area */}
        <div className={`p-4 border-b border-slate-100 bg-gradient-to-r ${themeConfig.bgLight} via-white to-slate-50`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Theme-Adaptive Brand Icon */}
              <div className={`w-9 h-9 rounded-2xl ${themeConfig.primary} flex items-center justify-center shadow-md shadow-slate-900/10`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-base text-slate-900 tracking-tight">EduSmart</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${themeConfig.badge}`}>Lab</span>
                </div>
                <p className="text-[11px] text-slate-600 font-bold tracking-wide">
                  Ikanuraisma
                </p>
              </div>
            </div>
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-5 text-sm">
          {/* Main: Dashboard */}
          <div>
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium transition-all ${
                activeTab === 'dashboard'
                  ? `${themeConfig.primary} shadow-md font-semibold`
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Group 1: Materi Edukasi */}
          <div className="space-y-1">
            <button
              onClick={() => setOpenMateri(!openMateri)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FolderOpen className={`w-3.5 h-3.5 ${themeConfig.text}`} />
                <span>Materi Edukasi</span>
              </div>
              {openMateri ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openMateri && (
              <div className="pl-2 space-y-0.5 pt-1">
                {materiItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id as NavigationTab)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? `${item.activeBg} font-semibold shadow-xs`
                          : `text-slate-600 ${item.hoverBg} hover:text-slate-900`
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 2: Tools AI Edukasi */}
          <div className="space-y-1">
            <button
              onClick={() => setOpenTools(!openTools)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Tools AI Edukasi</span>
              </div>
              {openTools ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openTools && (
              <div className="pl-2 space-y-0.5 pt-1">
                {toolItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id as NavigationTab)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? `${item.activeBg} font-semibold shadow-xs`
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group 3: Video & Audio */}
          <div className="space-y-1">
            <button
              onClick={() => setOpenVideoAudio(!openVideoAudio)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Video className="w-3.5 h-3.5 text-blue-600" />
                <span>Video & Audio</span>
              </div>
              {openVideoAudio ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openVideoAudio && (
              <div className="pl-2 space-y-0.5 pt-1">
                {[
                  { id: 'video-storyboard', label: 'Storyboard & Script Video', icon: Clapperboard, color: 'text-blue-600' },
                  { id: 'video-konsep', label: 'Konsep Video Edukasi', icon: MonitorPlay, color: 'text-sky-600' },
                  { id: 'video-lagu', label: 'Lirik & Musik Lagu', icon: Music, color: 'text-rose-500' },
                  { id: 'video-voiceover', label: 'Voiceover & Narasi', icon: Sparkles, color: 'text-purple-600' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id as NavigationTab)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? `${themeConfig.primary} font-semibold shadow-xs`
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Prompt Library & Directory */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleTabClick('prompt-library')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium transition-all ${
                activeTab === 'prompt-library'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 font-semibold'
                  : 'text-slate-700 hover:bg-purple-50 hover:text-purple-900'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Prompt Library</span>
            </button>

            <button
              onClick={() => handleTabClick('ai-directory')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium transition-all ${
                activeTab === 'ai-directory'
                  ? `${themeConfig.primary} shadow-md font-semibold`
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>AI Tools Directory</span>
            </button>
          </div>
        </div>

        {/* User / Creator Badge Footer */}
        <div className="p-3.5 border-t border-slate-200/80 bg-slate-50/70 text-xs">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full ${themeConfig.primary} flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}>
              IK
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 truncate">EduSmart Lab</p>
              <p className="text-[11px] text-slate-500 truncate font-semibold">Ikanuraisma</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
