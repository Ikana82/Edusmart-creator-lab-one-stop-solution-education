import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, RefreshCw, X, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface PromptSection {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  content: string;
}

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  promptContent: string;
  promptSections?: PromptSection[];
  onRegenerate?: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  promptContent,
  promptSections,
  onRegenerate,
}) => {
  const { themeConfig } = useTheme();
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'raw'>('split');
  const [selectedSlideFilter, setSelectedSlideFilter] = useState<string>('all');

  // Auto-split promptContent into sections if promptSections not explicitly provided
  const parsedSections: PromptSection[] = React.useMemo(() => {
    if (promptSections && promptSections.length > 0) {
      return promptSections;
    }

    if (!promptContent) return [];

    // Comprehensive delimiter regex for slide/page splits
    const delimiterRegex = /(?=(?:={3,}\s*(?:Prompt\s+)?(?:Slide|Halaman|Panel|Shot|Scene|Kartu)\s+\d+:?|-{3,}\s*(?:Prompt\s+)?(?:Slide|Halaman|Panel|Shot|Scene|Kartu)\s+\d+:?|#{2,}\s*(?:Prompt\s+)?(?:Slide|Halaman|Panel|Shot|Scene|Kartu)\s+\d+:?|(?:Prompt\s+)?(?:Slide|Halaman|Panel|Shot|Scene|Kartu)\s+\d+:?|Cover\s+(?:Depan|Belakang)|Halaman\s+(?:Soal\s+\d+|Judul|Penutup|\d+)|Halaman\s+\d+\s*\(Flashcard\)))/i;
    const parts = promptContent.split(delimiterRegex).filter(p => p.trim().length > 0);

    if (parts.length > 1) {
      return parts.map((part, index) => {
        const trimmed = part.trim();
        const firstLine = trimmed.split('\n')[0].replace(/^[#=\s*-]+|[#=\s*-]+$/g, '').trim();
        const rest = trimmed.substring(trimmed.indexOf('\n') + 1).trim();
        return {
          id: `sec-${index + 1}`,
          title: firstLine || `Slide ${index + 1}`,
          content: rest || trimmed
        };
      });
    }

    return [];
  }, [promptContent, promptSections]);

  const hasMultipleSections = parsedSections.length > 1;

  // Reset filter when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedSlideFilter('all');
      setViewMode(hasMultipleSections ? 'split' : 'raw');
    }
  }, [isOpen, hasMultipleSections]);

  if (!isOpen) return null;

  const handleCopyAll = () => {
    navigator.clipboard.writeText(promptContent);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleCopySection = (section: PromptSection) => {
    navigator.clipboard.writeText(section.content);
    setCopiedSectionId(section.id);
    setTimeout(() => setCopiedSectionId(null), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([promptContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const visibleSections = parsedSections.filter(s =>
    selectedSlideFilter === 'all' || s.id === selectedSlideFilter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r ${themeConfig.bgLight} via-white to-slate-50`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${themeConfig.primary} rounded-2xl shadow-xs`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${themeConfig.text}`}>
                  Prompt Siap Pakai
                </span>
                {hasMultipleSections && (
                  <>
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {parsedSections.length} Slide Terpisah
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-heading">{title}</h2>
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Tools */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50/90 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-lg">
            {hasMultipleSections && (
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  viewMode === 'split'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pisah Per Slide ({parsedSections.length})
              </button>
            )}
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                viewMode === 'raw' || !hasMultipleSections
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Teks (Raw Plaintext)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
              title="Download teks prompt"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh TXT</span>
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1.5 px-3 py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Variasi Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Bar for Multiple Slides */}
        {hasMultipleSections && viewMode === 'split' && (
          <div className="px-6 py-2 bg-slate-100/70 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="font-semibold text-slate-500 shrink-0">Lompat Slide:</span>
            <button
              onClick={() => setSelectedSlideFilter('all')}
              className={`px-2.5 py-1 rounded-md shrink-0 font-medium transition-colors ${
                selectedSlideFilter === 'all'
                  ? `${themeConfig.primary} font-bold`
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua Slide ({parsedSections.length})
            </button>
            {parsedSections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSlideFilter(sec.id)}
                className={`px-2.5 py-1 rounded-md shrink-0 font-medium transition-colors ${
                  selectedSlideFilter === sec.id
                    ? `${themeConfig.primary} font-bold`
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                #{idx + 1} {sec.title.replace(/^(?:Prompt\s+)?(?:Slide|Halaman|Panel)\s*\d+:\s*/i, '').split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {viewMode === 'split' && hasMultipleSections ? (
            /* MULTIPLE SLIDE PROMPTS SEPARATED WITH DEDICATED INDIVIDUAL COPY BUTTONS */
            <div className="space-y-6">
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Setiap slide prompt telah <strong>dipisahkan ke kotak plaintext tersendiri</strong>. Klik tombol <strong>"Salin Prompt Slide"</strong> pada masing-masing kotak untuk menyalin prompt secara terpisah.
                  </span>
                </div>
              </div>

              {visibleSections.map((sec, idx) => {
                const isCopied = copiedSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300 hover:shadow-md"
                  >
                    {/* Slide Header with Individual Copy Button */}
                    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full ${themeConfig.primary} flex items-center justify-center font-mono font-bold text-xs shadow-2xs`}>
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {sec.title}
                          </h4>
                          {sec.subtitle && (
                            <p className="text-[11px] text-slate-500">{sec.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                          Plaintext #{idx + 1}
                        </span>
                        {/* Dedicated Individual Copy Button for this specific slide */}
                        <button
                          onClick={() => handleCopySection(sec)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs active:scale-95 ${
                            isCopied
                              ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                              : `${themeConfig.primary} ${themeConfig.primaryHover}`
                          }`}
                          title={`Salin teks prompt untuk ${sec.title}`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>📋 Salin Prompt Slide</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Dedicated Plaintext Box */}
                    <div className="p-4 bg-slate-950 text-slate-100 relative group">
                      <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap select-all font-normal">
                        {sec.content}
                      </pre>
                    </div>

                    {/* Card Footer info */}
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{sec.content.length} karakter · {sec.content.split(/\s+/).length} kata</span>
                      <button
                        onClick={() => handleCopySection(sec)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Salin Slide Ini</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* RAW SINGLE TEXT MODE */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Semua Teks Prompt Plaintext:</span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                  Full Plaintext
                </span>
              </div>
              <pre className="p-5 font-mono text-xs md:text-sm bg-slate-950 text-slate-100 rounded-2xl overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner select-all">
                {promptContent}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{hasMultipleSections ? `${parsedSections.length} Slide Terpisah` : '1 Prompt'}</span>
            <span aria-hidden="true">·</span>
            <span>Total {promptContent.length} karakter</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleCopyAll}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 ${
                copiedAll
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                  : `${themeConfig.primary} ${themeConfig.primaryHover}`
              }`}
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Semua Prompt Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>📋 Salin Semua Slide Sekaligus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
