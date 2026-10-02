import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../../types';
import { Search, X, Wand2, FileSpreadsheet, Gamepad2, MonitorPlay, BookMarked, Music, FileText, Compass } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'Game Edukasi Studio', tab: 'tool-game' as NavigationTab, icon: Gamepad2, cat: 'Tool AI' },
    { title: 'Worksheet Studio Siap Cetak', tab: 'tool-worksheet' as NavigationTab, icon: FileSpreadsheet, cat: 'Tool AI' },
    { title: 'Media Pembelajaran', tab: 'tool-media' as NavigationTab, icon: MonitorPlay, cat: 'Tool AI' },
    { title: 'Buku Dongeng & Cerita Anak', tab: 'tool-storybook' as NavigationTab, icon: BookMarked, cat: 'Tool AI' },
    { title: 'Flashcard Studio', tab: 'tool-flashcard' as NavigationTab, icon: FileSpreadsheet, cat: 'Tool AI' },
    { title: 'LKPD Kurikulum Merdeka Generator', tab: 'tool-lkpd' as NavigationTab, icon: FileText, cat: 'Tool AI' },
    { title: 'Komik Edukasi 4-Panel Generator', tab: 'tool-komik' as NavigationTab, icon: Wand2, cat: 'Tool AI' },
    { title: 'Lagu Edukasi Generator', tab: 'tool-song' as NavigationTab, icon: Music, cat: 'Tool AI' },
    { title: 'Prompt Library Teruji', tab: 'prompt-library' as NavigationTab, icon: FileText, cat: 'Library' },
    { title: 'AI Tools Directory Rekomendasi', tab: 'ai-directory' as NavigationTab, icon: Compass, cat: 'Directory' },
    { title: 'Pustaka Materi Worksheet', tab: 'materi-worksheet' as NavigationTab, icon: FileSpreadsheet, cat: 'Materi' },
    { title: 'Pustaka Game Edukasi', tab: 'materi-game' as NavigationTab, icon: Gamepad2, cat: 'Materi' },
    { title: 'Storybook atau Buku Cerita', tab: 'materi-ebook' as NavigationTab, icon: BookMarked, cat: 'Materi' },
  ];

  const filtered = quickLinks.filter(l =>
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl border border-amber-100 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-amber-500" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama tools, jenis materi, atau modul..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-hidden text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectTab(item.tab);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-amber-50/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-100/60 text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-900">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{item.cat}</span>
                  </div>
                </div>
                <span className="text-[11px] text-amber-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Buka →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
