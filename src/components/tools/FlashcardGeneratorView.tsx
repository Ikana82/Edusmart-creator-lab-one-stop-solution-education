import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  Grid, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Download
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const FlashcardGeneratorView: React.FC = () => {
  const [topic, setTopic] = useState('Alat Transportasi');
  const [ageGroup, setAgeGroup] = useState('4–5 tahun (PAUD)');
  const [cardCount, setCardCount] = useState<number>(16); // multiple of 8
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [visualStyle, setVisualStyle] = useState('2d cartoon');

  const [activeSheet, setActiveSheet] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [promptSections, setPromptSections] = useState<any[]>([]);

  // Sample cards for Sheet 1 & Sheet 2
  const sheet1Cards = [
    { num: 1, name: 'Mobil', icon: '🚗', desc: 'Kendaraan roda empat untuk bepergian keluarga' },
    { num: 2, name: 'Sepeda Motor', icon: '🛵', desc: 'Kendaraan roda dua yang lincah' },
    { num: 3, name: 'Sepeda', icon: '🚲', desc: 'Kendaraan sehat dikayuh dengan kaki' },
    { num: 4, name: 'Bis', icon: '🚌', desc: 'Kendaraan besar pengangkut banyak penumpang' },
    { num: 5, name: 'Kereta Api', icon: '🚆', desc: 'Rangkaian gerbong berjalan di atas rel' },
    { num: 6, name: 'Pesawat Udara', icon: '✈️', desc: 'Burung besi terbang cepat menembus awan' },
    { num: 7, name: 'Kapal Laut', icon: '🚢', desc: 'Kapal besar mengarungi samudra luas' },
    { num: 8, name: 'Helikopter', icon: '🚁', desc: 'Terbang dengan baling-baling di atasnya' }
  ];

  const sheet2Cards = [
    { num: 9, name: 'Truk', icon: '🚛', desc: 'Pengangkut barang berat dan material' },
    { num: 10, name: 'Taksi', icon: '🚕', desc: 'Mobil umum penjemput penumpang' },
    { num: 11, name: 'Ambulans', icon: '🚑', desc: 'Kendaraan medis pembawa sirine darurat' },
    { num: 12, name: 'Truk Pemadam', icon: '🚒', desc: 'Pahlawan penyelamat api' },
    { num: 13, name: 'Perahu Layar', icon: '⛵', desc: 'Berlayar ditiup angin di laut' },
    { num: 14, name: 'Balon Udara', icon: '🎈', desc: 'Melayang anggun di udara tinggi' },
    { num: 15, name: 'Skuter', icon: '🛴', desc: 'Skuter anak yang seru dimainkan' },
    { num: 16, name: 'Kapal Selam', icon: '潜', desc: 'Menyelam di kedalaman samudra biru' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePrompts = () => {
    const sections = [
      {
        id: 'flashcard-sheet-1',
        title: 'Halaman 1 (Flashcard 1–8)',
        subtitle: '8 Kartu Kendaraan Utama (Lembar A4 #1)',
        content: `A4 landscape format, a sheet of 8 educational flashcards arranged in a neat grid of 4 columns and 2 rows with fine dashed cutting guide lines. Theme: ${topic} for ${ageGroup} kids. Each card features a cute illustration of a vehicle with its name written clearly in ${language} at the bottom of each card.
Card 1: Mobil
Card 2: Sepeda Motor
Card 3: Sepeda
Card 4: Bis
Card 5: Kereta Api
Card 6: Pesawat Udara
Card 7: Kapal Laut
Card 8: Helikopter
Style description: ${visualStyle}, colorful, simple and expressive shapes, flat vector illustration, child-friendly, bright and cheerful environment.
ultra detailed, professional illustration, premium quality, 8K resolution, 300 dpi, print-ready, sharp focus, high resolution, crisp details, clean edges, commercial quality.`
      },
      {
        id: 'flashcard-sheet-2',
        title: 'Halaman 2 (Flashcard 9–16)',
        subtitle: '8 Kartu Kendaraan Tambahan (Lembar A4 #2)',
        content: `A4 landscape format, a sheet of 8 educational flashcards arranged in a neat grid of 4 columns and 2 rows with fine dashed cutting guide lines. Theme: ${topic} for ${ageGroup} kids. Each card features a cute illustration of a vehicle with its name written clearly in ${language} at the bottom of each card.
Card 9: Truk
Card 10: Taksi
Card 11: Ambulans
Card 12: Truk Pemadam Kebakaran
Card 13: Perahu
Card 14: Balon Udara
Card 15: Skuter
Card 16: Kapal Selam
Style description: ${visualStyle}, colorful, simple and expressive shapes, flat vector illustration, child-friendly, bright and cheerful environment.
ultra detailed, professional illustration, premium quality, 8K resolution, 300 dpi, print-ready, sharp focus, high resolution, crisp details, clean edges, commercial quality.`
      }
    ];

    setPromptSections(sections);

    let output = `RINGKASAN FLASHCARD EDUKASI\n==================================================\nTopik            : ${topic}\nUsia             : ${ageGroup}\nJumlah Flashcard : ${cardCount} Kartu (Kelipatan 8: ${cardCount / 8} Lembar A4 Landscape)\nBahasa           : ${language}\nStyle Ilustrasi  : ${visualStyle}\n\n`;
    sections.forEach(s => {
      output += `==================================================\n${s.title}\n==================================================\n${s.content}\n\n`;
    });

    setPromptText(output);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-pink-700 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>EduSmart Flashcard Studio · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Flashcard Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Format kartu edukasi bergambar dengan garis potong rapi dan teks nama benda jelas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Lembar Kartu</span>
          </button>
          <button
            onClick={handleGeneratePrompts}
            className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Prompt AI</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-xs space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Topik Flashcard:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {['Transportasi', 'Hewan Laut', 'Buah Segar', 'Profesi', 'Planet', 'Emosi'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-amber-50 text-[11px] rounded-md text-slate-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Target Usia:</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              >
                <option value="3–4 tahun (PAUD Awal)">3–4 tahun (PAUD Awal)</option>
                <option value="4–5 tahun (PAUD)">4–5 tahun (PAUD)</option>
                <option value="6–7 tahun (SD Kelas 1)">6–7 tahun (SD Kelas 1)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Jumlah Kartu (Kelipatan 8):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { count: 8, sheet: '1 Lembar A4' },
                  { count: 16, sheet: '2 Lembar A4' },
                  { count: 24, sheet: '3 Lembar A4' },
                  { count: 32, sheet: '4 Lembar A4' }
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setCardCount(item.count)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      cardCount === item.count
                        ? 'border-amber-500 bg-amber-50 font-bold text-amber-900 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-sm font-heading">{item.count} Kartu</span>
                    <span className="text-[10px] text-slate-500">{item.sheet}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Style Ilustrasi:</label>
              <select
                value={visualStyle}
                onChange={(e) => setVisualStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              >
                <option value="2d cartoon">2D Cartoon (Simple & Clean)</option>
                <option value="Cute Pastel Kids">Cute Pastel Kids</option>
                <option value="3D Clay Cute">3D Clay Cute</option>
                <option value="Kawaii Anime Chibi">Kawaii Anime Chibi</option>
                <option value="Watercolor Storybook">Watercolor Storybook</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Bahasa Teks:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              >
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="English">English</option>
                <option value="Bilingual">Bilingual</option>
                <option value="Tanpa Teks">Tanpa Teks (Gambar Saja)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Printable A4 Landscape Grid Preview (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sheet Selector */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-amber-100 text-xs">
            <span className="font-semibold text-slate-700">
              Tinjauan Lembar Cetak ({cardCount / 8} Lembar Tersedia):
            </span>
            <div className="flex gap-1.5">
              {[1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSheet(s)}
                  className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
                    activeSheet === s
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Lembar #{s} (Kartu {s === 1 ? '1–8' : '9–16'})
                </button>
              ))}
            </div>
          </div>

          {/* A4 Landscape Grid Container (4 Cols x 2 Rows) */}
          <div className="aspect-[1.414/1] w-full bg-white rounded-2xl border-2 border-dashed border-amber-300 p-5 shadow-md flex flex-col justify-between">
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-full">
              {(activeSheet === 1 ? sheet1Cards : sheet2Cards).map((card) => (
                <div
                  key={card.num}
                  className="bg-amber-50/40 rounded-xl border border-amber-200/80 p-3 flex flex-col items-center justify-between text-center shadow-2xs hover:bg-amber-50 transition-colors"
                >
                  <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>#{card.num}</span>
                    <span>✂</span>
                  </div>

                  <div className="text-4xl my-auto py-1">
                    {card.icon}
                  </div>

                  <div className="w-full border-t border-amber-200/60 pt-1.5">
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {card.name}
                    </span>
                    <span className="text-[9px] text-slate-500 block truncate">
                      {card.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            💡 Tips: Setiap kartu dipisahkan oleh garis potong (✂). Gunakan kertas Concorde atau Karton Manila tebal untuk hasil print terbaik.
          </div>
        </div>
      </div>

      {/* Prompt Modal */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Prompt Flashcard Edukasi"
        subtitle="Prompt terpisah per kartu yang siap digunakan pada AI pilihanmu"
        promptContent={promptText}
        promptSections={promptSections}
      />
    </div>
  );
};
