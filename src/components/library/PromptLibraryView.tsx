import React, { useState } from 'react';
import { PromptItem, NavigationTab } from '../../types';
import { PROMPT_LIBRARY_ITEMS } from '../../data/initialData';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Wand2, 
  ExternalLink,
  BookOpen,
  Filter
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

interface PromptLibraryViewProps {
  onNavigateToTool: (tab: NavigationTab) => void;
}

export const PromptLibraryView: React.FC<PromptLibraryViewProps> = ({ onNavigateToTool }) => {
  const [prompts, setPrompts] = useState<PromptItem[]>(PROMPT_LIBRARY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Variable values per prompt id
  const [variableValues, setVariableValues] = useState<Record<string, Record<string, string>>>({
    'p-worksheet-coding': { age: '5-7 tahun', theme: 'Kelinci mencari wortel' },
    'p-game-mascot': { mascot_desc: 'Owi, seekor burung hantu kecil berbulu pastel lembut' },
    'p-slide-media': { topic: 'Siklus Daur Air di Bumi', age: '7-9 tahun', slide_title: 'Dari Mana Asal Hujan?', style: 'Flat Cartoon 2D vector' },
    'p-flashcard-transport': {
      theme: 'Alat Transportasi',
      age: '4-5 tahun',
      style: '2D flat cartoon',
      item1: 'Mobil',
      item2: 'Sepeda Motor',
      item3: 'Sepeda',
      item4: 'Bis',
      item5: 'Kereta Api',
      item6: 'Pesawat Udara',
      item7: 'Kapal Laut',
      item8: 'Helikopter'
    }
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const getComputedPrompt = (item: PromptItem) => {
    let result = item.promptText;
    const values = variableValues[item.id] || {};
    item.variables.forEach((v) => {
      const val = values[v.name] || v.defaultValue;
      result = result.replaceAll(`{${v.name}}`, val);
    });
    return result;
  };

  const handleCopy = (item: PromptItem) => {
    const text = getComputedPrompt(item);
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenModal = (item: PromptItem) => {
    setModalContent(getComputedPrompt(item));
    setModalTitle(item.title);
    setModalOpen(true);
  };

  const handleVariableChange = (itemId: string, varName: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [varName]: value
      }
    }));
  };

  const filtered = prompts.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="p-6 bg-white rounded-3xl border border-amber-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Engineering Lab</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Prompt Library Siap Pakai
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formula prompt teruji untuk Midjourney, DALL-E, Gemini, Canva, dan Suno AI khusus produk edukasi.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kata kunci prompt..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Semua Kategori' },
          { id: 'worksheet', label: 'Worksheet' },
          { id: 'game', label: 'Game Edukasi' },
          { id: 'presentation', label: 'Slide Media' },
          { id: 'flashcard', label: 'Flashcard' },
          { id: 'song', label: 'Lagu Suno AI' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Prompts List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const computedText = getComputedPrompt(item);
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-amber-100 shadow-xs p-6 space-y-4 hover:border-amber-300 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-amber-700 font-semibold mb-0.5">
                    <span>Target AI: {item.targetAi.join(' · ')}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors font-medium border border-slate-200"
                  >
                    Buka Editor
                  </button>
                  <button
                    onClick={() => handleCopy(item)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-2xs ${
                      copiedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Dynamic Variables Customizer */}
              {item.variables.length > 0 && (
                <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-2">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Kustomisasi Variabel Cepat:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {item.variables.map((v) => {
                      const curVal = variableValues[item.id]?.[v.name] ?? v.defaultValue;
                      return (
                        <div key={v.name} className="space-y-0.5">
                          <label className="text-[10px] font-medium text-slate-500">{v.label}:</label>
                          <input
                            type="text"
                            value={curVal}
                            onChange={(e) => handleVariableChange(item.id, v.name, e.target.value)}
                            className="w-full px-2.5 py-1 text-xs bg-white rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prompt Text Preview Box */}
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {computedText}
              </pre>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-slate-500">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subtitle="Prompt siap disalin ke AI tool pilihanmu"
        promptContent={modalContent}
      />
    </div>
  );
};
