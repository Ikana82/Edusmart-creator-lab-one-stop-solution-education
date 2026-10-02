import React, { useState, useEffect, useRef } from 'react';
import { EducationalMaterial, NavigationTab } from '../../types';
import { INITIAL_MATERIALS } from '../../data/initialData';
import { useTheme } from '../../context/ThemeContext';
import { 
  FolderOpen, 
  Search, 
  Download, 
  Wand2, 
  Sparkles, 
  X,
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

interface MateriEdukasiViewProps {
  initialCategory?: string;
  onNavigateToTool: (tab: NavigationTab) => void;
  onCategoryChange?: (tab: NavigationTab) => void;
}

export const MateriEdukasiView: React.FC<MateriEdukasiViewProps> = ({
  initialCategory = 'all',
  onNavigateToTool,
  onCategoryChange,
}) => {
  const { themeConfig } = useTheme();
  const [materials, setMaterials] = useState<EducationalMaterial[]>(INITIAL_MATERIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMaterial, setPreviewMaterial] = useState<EducationalMaterial | null>(null);

  // Tab button refs for smooth automatic scrolling & active alignment
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Prompt modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState('');
  const [promptTitle, setPromptTitle] = useState('');

  // Check scroll state for Prev / Next buttons
  const checkScrollState = () => {
    const el = tabContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScrollState();
    const el = tabContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState);
      window.addEventListener('resize', checkScrollState);
      return () => {
        el.removeEventListener('scroll', checkScrollState);
        window.removeEventListener('resize', checkScrollState);
      };
    }
  }, []);

  const handleScrollLeft = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (tabContainerRef.current) {
      tabContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  // Synchronize category whenever initialCategory prop changes from sidebar navigation
  useEffect(() => {
    if (initialCategory && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Smoothly scroll active category into view/centered when selected
  useEffect(() => {
    const activeEl = tabRefs.current[selectedCategory];
    if (activeEl && tabContainerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setTimeout(checkScrollState, 350);
    }
  }, [selectedCategory]);

  // Clean category definitions without theme names in labels
  const categories = [
    { 
      id: 'all', 
      label: 'Semua Materi', 
      activeClass: `${themeConfig.primary} shadow-md ring-2 ${themeConfig.ring}`,
      badgeClass: 'bg-slate-100 text-slate-800',
      toolId: 'tool-worksheet' as NavigationTab
    },
    { 
      id: 'worksheet', 
      label: 'Worksheet', 
      activeClass: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      toolId: 'tool-worksheet' as NavigationTab
    },
    { 
      id: 'lkpd', 
      label: 'LKPD', 
      activeClass: 'bg-slate-900 text-white shadow-md shadow-slate-900/25 ring-2 ring-slate-400',
      badgeClass: 'bg-slate-200 text-slate-900',
      toolId: 'tool-lkpd' as NavigationTab
    },
    { 
      id: 'media', 
      label: 'Media Pembelajaran', 
      activeClass: 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-400',
      badgeClass: 'bg-blue-100 text-blue-800',
      toolId: 'tool-media' as NavigationTab
    },
    { 
      id: 'game', 
      label: 'Game Edukasi', 
      activeClass: 'bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-400',
      badgeClass: 'bg-orange-100 text-orange-800',
      toolId: 'tool-game' as NavigationTab
    },
    { 
      id: 'komik', 
      label: 'Komik Edukasi', 
      activeClass: 'bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-400',
      badgeClass: 'bg-rose-100 text-rose-800',
      toolId: 'tool-komik' as NavigationTab
    },
    { 
      id: 'flashcard', 
      label: 'Flashcard', 
      activeClass: 'bg-purple-600 text-white shadow-md shadow-purple-600/25 ring-2 ring-purple-400',
      badgeClass: 'bg-purple-100 text-purple-800',
      toolId: 'tool-flashcard' as NavigationTab
    },
    { 
      id: 'ebook', 
      label: 'Storybook atau Buku Cerita', 
      activeClass: 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/25 ring-2 ring-fuchsia-400',
      badgeClass: 'bg-fuchsia-100 text-fuchsia-800',
      toolId: 'tool-storybook' as NavigationTab
    },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (onCategoryChange) {
      if (catId === 'all') {
        onCategoryChange('materi-worksheet');
      } else {
        onCategoryChange(`materi-${catId}` as NavigationTab);
      }
    }
  };

  const filteredMaterials = materials.filter((m) => {
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleDownload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, downloadCount: m.downloadCount + 1 } : m));
    const element = document.createElement('a');
    const file = new Blob([`Materi EduSmart Lab: ${id}\nUnduh materi edukasi digital.`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `edusmart_${id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRemix = (material: EducationalMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    switch (material.category) {
      case 'game':
        onNavigateToTool('tool-game');
        break;
      case 'worksheet':
        onNavigateToTool('tool-worksheet');
        break;
      case 'media':
        onNavigateToTool('tool-media');
        break;
      case 'ebook':
        onNavigateToTool('tool-storybook');
        break;
      case 'flashcard':
        onNavigateToTool('tool-flashcard');
        break;
      case 'lkpd':
        onNavigateToTool('tool-lkpd');
        break;
      case 'komik':
        onNavigateToTool('tool-komik');
        break;
      default:
        onNavigateToTool('tool-worksheet');
    }
  };

  const handleOpenPrompt = (material: EducationalMaterial, e: React.MouseEvent) => {
    e.stopPropagation();
    if (material.promptReady) {
      setActivePrompt(material.promptReady);
      setPromptTitle(`Prompt: ${material.title}`);
      setModalOpen(true);
    }
  };

  const currentActiveCategoryObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner with Clean Branding */}
      <div className={`p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 ${themeConfig.border}`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
            <span className={`flex items-center gap-1.5 ${themeConfig.text}`}>
              <FolderOpen className="w-4 h-4" />
              <span>EduSmart Lab</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-bold tracking-wide">Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Pustaka Materi Edukasi Digital
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kategori saat ini: <strong className="text-slate-800">{currentActiveCategoryObj?.label || 'Semua Materi'}</strong>
          </p>
        </div>

        {/* Polished Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik, pelajaran, tingkat kelas..."
            className="w-full pl-9 pr-9 py-2.5 text-xs rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-slate-300 bg-slate-50 hover:bg-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter Bar with Prev/Next Scroll Buttons */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className={`w-3.5 h-3.5 ${themeConfig.text}`} />
            <span>Kategori Materi:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">
              Menampilkan <strong>{filteredMaterials.length}</strong> materi
            </span>
            {currentActiveCategoryObj && currentActiveCategoryObj.id !== 'all' && (
              <button
                onClick={() => onNavigateToTool(currentActiveCategoryObj.toolId)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${currentActiveCategoryObj.badgeClass} flex items-center gap-1 hover:opacity-80 transition-opacity`}
              >
                <span>Buka {currentActiveCategoryObj.label} Studio</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Container with Prev & Next buttons for hidden/overflowing categories */}
        <div className="relative flex items-center group">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-1 z-20 p-2 rounded-xl bg-white/95 text-slate-700 shadow-md border border-slate-200 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll Kategori ke Kiri"
              title="Kategori Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Categories Tab Strip */}
          <div 
            ref={tabContainerRef}
            className="flex-1 flex items-center gap-2 overflow-x-auto p-2 bg-slate-100/90 rounded-2xl border border-slate-200 scrollbar-none shadow-inner scroll-smooth"
          >
            {categories.map((c) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  ref={(el) => { tabRefs.current[c.id] = el; }}
                  onClick={() => handleCategoryClick(c.id)}
                  className={`relative px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? `${c.activeClass} scale-105 z-10`
                      : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs'
                  }`}
                >
                  <span>{c.label}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-1 z-20 p-2 rounded-xl bg-white/95 text-slate-700 shadow-md border border-slate-200 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
              aria-label="Scroll Kategori ke Kanan"
              title="Kategori Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Selection Banner showing sync state */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-600">
              Kategori Aktif: <strong className="text-slate-900">{currentActiveCategoryObj?.label}</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Sinkron dengan Menu Sidebar
          </span>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => {
          let catBadgeStyle = 'bg-blue-100 text-blue-800';
          if (item.category === 'worksheet') catBadgeStyle = 'bg-emerald-100 text-emerald-800';
          if (item.category === 'lkpd') catBadgeStyle = 'bg-slate-200 text-slate-900';
          if (item.category === 'game') catBadgeStyle = 'bg-orange-100 text-orange-800';
          if (item.category === 'komik') catBadgeStyle = 'bg-rose-100 text-rose-800';
          if (item.category === 'flashcard') catBadgeStyle = 'bg-purple-100 text-purple-800';
          if (item.category === 'ebook') catBadgeStyle = 'bg-fuchsia-100 text-fuchsia-800';

          return (
            <div
              key={item.id}
              onClick={() => setPreviewMaterial(item)}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer group hover:border-slate-300"
            >
              <div>
                {/* Header card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.thumbnail}
                  </div>
                  <div className="text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${catBadgeStyle}`}>
                      {item.categoryLabel}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {item.downloadCount} kali diunduh
                    </div>
                  </div>
                </div>

                {/* Title & info */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Subject & Age Tag */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">{item.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.ageGroup}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                {item.promptReady ? (
                  <button
                    onClick={(e) => handleOpenPrompt(item, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lihat Prompt</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleRemix(item, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Remix</span>
                  </button>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleDownload(item.id, e)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Unduh Materi"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleRemix(item, e)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl ${themeConfig.primary} text-xs font-bold transition-all shadow-2xs`}
                  >
                    <span>Buka Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada materi yang sesuai
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau pilih kategori lain pada menu di atas.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-4 py-2 text-xs font-bold ${themeConfig.primary} rounded-xl`}
          >
            Tampilkan Semua Materi
          </button>
        </div>
      )}

      {/* Preview Modal Drawer */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{previewMaterial.thumbnail}</span>
                <div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {previewMaterial.categoryLabel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-heading mt-0.5">
                    {previewMaterial.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Deskripsi Materi
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  {previewMaterial.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Mata Pelajaran:</span>
                  <span className="font-bold text-slate-800 text-xs">{previewMaterial.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Kelompok Usia:</span>
                  <span className="font-bold text-slate-800 text-xs">{previewMaterial.ageGroup}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Tag Edukasi
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewMaterial.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {previewMaterial.promptReady && (
                <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Prompt Siap Pakai</span>
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(previewMaterial.promptReady!);
                        alert('Prompt berhasil disalin!');
                      }}
                      className="text-[11px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white"
                    >
                      Salin
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap">
                    {previewMaterial.promptReady}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
              <button
                onClick={(e) => handleDownload(previewMaterial.id, e)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh ({previewMaterial.downloadCount})</span>
              </button>

              <button
                onClick={(e) => {
                  setPreviewMaterial(null);
                  handleRemix(previewMaterial, e);
                }}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl ${themeConfig.primary} font-bold text-xs shadow-xs`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Kustomisasi di Studio AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Slide Structured Prompt Modal */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={promptTitle}
        subtitle="Prompt digital terstruktur"
        promptContent={activePrompt}
      />
    </div>
  );
};
