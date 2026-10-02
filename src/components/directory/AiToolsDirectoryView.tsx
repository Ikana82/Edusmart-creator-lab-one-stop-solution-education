import React, { useState } from 'react';
import { AiToolItem } from '../../types';
import { AI_TOOLS_DIRECTORY } from '../../data/initialData';
import { 
  Compass, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Star, 
  Zap, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const AiToolsDirectoryView: React.FC = () => {
  const [tools, setTools] = useState<AiToolItem[]>(AI_TOOLS_DIRECTORY);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Semua Tools' },
    { id: 'image', label: 'Image AI' },
    { id: 'presentation', label: 'Presentation & Slides' },
    { id: 'game', label: 'Game & Quiz AI' },
    { id: 'video', label: 'Video AI' },
    { id: 'audio', label: 'Music & Voice AI' },
  ];

  const filtered = tools.filter((t) => {
    const matchCat =
      selectedCategory === 'all' ||
      t.category === selectedCategory ||
      (selectedCategory === 'game' && t.category === 'quiz') ||
      (selectedCategory === 'audio' && (t.category === 'audio' || t.category === 'all-in-one'));
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="p-6 bg-white rounded-3xl border border-amber-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Katalog Resmi & Panduan Workflow</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            AI Tools Directory untuk Edukasi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekomendasi AI tools terkurasi beserta panduan integrasi praktis untuk guru, tutor, dan kreator konten edukasi.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tools atau use case..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
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

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-amber-100 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    {item.featured && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        <Star className="w-2.5 h-2.5 fill-amber-600 text-amber-600" />
                        Pilihan Guru
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {item.categoryLabel}
                  </span>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.pricing === 'Gratis'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.pricing === 'Freemium'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.pricing}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Best For Tag */}
              <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100 text-xs text-slate-700">
                <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wider mb-0.5">
                  Paling Pas Untuk:
                </span>
                {item.bestFor}
              </div>

              {/* Recommended Workflow */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <strong className="text-slate-700">Workflow EduSmart:</strong> {item.recommendedWorkflow}
              </div>
            </div>

            {/* Link button */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
              >
                <span>Buka Website {item.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
