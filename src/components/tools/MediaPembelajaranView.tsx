import React, { useState } from 'react';
import { 
  MonitorPlay, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Copy, 
  Check, 
  Play, 
  ExternalLink,
  Presentation,
  CheckCircle2,
  Compass,
  ArrowRight,
  Eye,
  UploadCloud,
  FileText
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const MediaPembelajaranView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'preview'>('wizard');

  // Wizard state (8 Steps exactly as requested)
  const [step, setStep] = useState<number>(1);
  const [topic, setTopic] = useState('Ekosistem');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // STEP 2: Target Usia
  const [ageGroup, setAgeGroup] = useState('7–9 tahun (SD Kelas Rendah)');

  // STEP 3: Struktur Halaman & Customization
  const [structureOption, setStructureOption] = useState<'standard' | 'custom'>('standard');
  const [customStructureNotes, setCustomStructureNotes] = useState('');

  // STEP 4: Layout
  const [layout, setLayout] = useState('Landscape (1920 x 1080 px)');

  // STEP 5: Gaya Visual
  const [visualStyle, setVisualStyle] = useState('Flat Cartoon');

  // STEP 6: Bahasa Narasi
  const [language, setLanguage] = useState('Bahasa Indonesia');

  // STEP 7: Karakter Maskot
  const [mascotOption, setMascotOption] = useState<'ai' | 'describe' | 'upload' | 'none'>('ai');
  const [mascotDescInput, setMascotDescInput] = useState('');
  const [uploadedMascotFile, setMascotUploadedFile] = useState<string | null>(null);

  // Slide carousel demo
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Prompt modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedPromptText, setGeneratedPromptText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Pagination for Step 8: Halaman 1-5, 6-10, 11-15, 16-20
  const [promptPageGroup, setPromptPageGroup] = useState<number>(1); // 1 = 1-5, 2 = 6-10, 3 = 11-15, 4 = 16-20

  // Copied alerts helper
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Fallbacks for empty states
  const resolvedTopic = topic.trim() || 'Ekosistem';
  const resolvedMascot = mascotOption === 'none' 
    ? 'Tanpa maskot' 
    : mascotOption === 'ai' 
    ? 'Penjelajah alam cilik berbaju safari hijau yang ceria'
    : mascotDescInput.trim() || 'Karakter pendidik ceria membawa buku dan penunjuk materi';

  // Structure definitions dynamically incorporating resolvedTopic
  const dynamicSlideStructure = [
    { num: 1, title: 'Cover', type: 'Cover', desc: `Judul utama "Petualangan di ${resolvedTopic}!" dengan ilustrasi dan tombol mulai.` },
    { num: 2, title: 'Navigasi', type: 'Navigasi', desc: 'Pilihan tombol menu: Tujuan Pembelajaran, Materi, Video Pembelajaran, Kuis.' },
    { num: 3, title: 'Tujuan Pembelajaran', type: 'Tujuan', desc: `Papan kayu berisi 3 poin kompetensi inti tentang "${resolvedTopic}".` },
    { num: 4, title: 'Apersepsi', type: 'Apersepsi', desc: `Pertanyaan pemantik menantang "Pernahkah kamu mengamati ${resolvedTopic} di sekitar kita?"` },
    { num: 5, title: `Materi 1: Apa itu ${resolvedTopic}?`, type: 'Materi', desc: `Konsep dasar dan definisi esensial mengenai "${resolvedTopic}".` },
    { num: 6, title: 'Materi 2: Karakteristik Utama', type: 'Materi', desc: `Komponen biotik: Makhluk hidup yang ada di dalam "${resolvedTopic}".` },
    { num: 7, title: 'Materi 3: Komponen Abiotik', type: 'Materi', desc: `Bagian tak hidup pembentuk "${resolvedTopic}" (tanah, air, matahari).` },
    { num: 8, title: 'Materi 4: Contoh Ekosistem Darat', type: 'Materi', desc: `Hutan dan taman sebagai contoh konkret "${resolvedTopic}" daratan.` },
    { num: 9, title: 'Materi 5: Contoh Ekosistem Air', type: 'Materi', desc: `Sungai dan laut sebagai contoh konkret "${resolvedTopic}" perairan.` },
    { num: 10, title: 'Video Pembelajaran', type: 'Video', desc: 'Layar video interaktif modern dengan tombol play pemutaran simulasi.' },
    { num: 11, title: 'Rangkuman/Summary', type: 'Summary', desc: 'Peta konsep ringkas seluruh materi yang telah dipelajari bersama.' },
    { num: 12, title: 'Peta Perjalanan Kuis', type: 'Peta Kuis', desc: 'Jalur setapak berliku dengan pos 1 s.d 5 menuju istana piala emas.' },
    { num: 13, title: 'Kuis 1', type: 'Kuis', desc: `Tantangan kognitif pilihan ganda pertama tentang dasar "${resolvedTopic}".` },
    { num: 14, title: 'Kuis 2', type: 'Kuis', desc: `Mencocokkan karakteristik objek yang sesuai dengan "${resolvedTopic}".` },
    { num: 15, title: 'Kuis 3', type: 'Kuis', desc: `Menentukan peran komponen penting di dalam "${resolvedTopic}".` },
    { num: 16, title: 'Kuis 4', type: 'Kuis', desc: `Menganalisis contoh konkret "${resolvedTopic}" di lingkungan.` },
    { num: 17, title: 'Kuis 5', type: 'Kuis', desc: 'Refleksi karakter peduli lingkungan dan kesimpulan praktis.' },
    { num: 18, title: 'Respon Benar', type: 'Feedback', desc: 'Maskot tersenyum lebar melompat gembira memberikan apresiasi.' },
    { num: 19, title: 'Respon Salah', type: 'Feedback', desc: 'Maskot tersenyum ramah memberikan motivasi dan petunjuk pengerjaan.' },
    { num: 20, title: 'Penutup', type: 'Penutup', desc: 'Ucapan terima kasih, pesan moral penutup, dan tombol home.' },
  ];

  const renderingNegative = 'clean typography placement, presentation-ready, 8K resolution, 300 dpi, highly detailed, professional quality, sharp focus, crisp details, clean edges, balanced composition, safe margins, no cropped elements, cohesive visual system, high readability, visually engaging, tidak ada teks handwrite sebagai ornamen, no unreal engine 5, no hyper-detailed, no oversharpened, no overexposed, no oversaturated, no extra fingers, no mutated hands, no bad anatomy, no deformed, no cluttered, no messy, no busy background, no chaotic layout, no multiple lighting, no double shadows, no watermark, no signature.';

  // Build the dynamic prompt text for a given slide index
  const getPromptForSlide = (num: number) => {
    switch (num) {
      case 1:
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at the canvas edge. All important elements — title, illustration, body content, navigation/button elements — arranged with clean typography placement and clear visual hierarchy from top to bottom. Only background decorations may extend to the canvas edge.
Header: Teks judul utama "Petualangan di ${resolvedTopic}!" dengan typography ceria, tebal, dan mudah dibaca.
Content: Gaya visual ${visualStyle}, warna cerah seimbang. Ilustrasi karakter maskot ${resolvedMascot} sedang tersenyum dan melambai ke arah audiens. Maskot berdiri di tengah lingkungan yang asri berkaitan dengan "${resolvedTopic}".
Footer/Navigasi: Tombol "Mulai" berbentuk melengkung yang mencolok di bagian tengah bawah.
Rendering Quality: ${renderingNegative}`;

      case 2:
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at the canvas edge.
Header: Teks "Pilih Tujuanmu!" di bagian atas dengan font tebal dan ceria.
Content: Gaya visual ${visualStyle}. Terdapat 4 tombol menu besar dan menarik di tengah layar: "Tujuan Belajar" (ikon target), "Materi" (ikon buku), "Video" (ikon play), dan "Kuis" (ikon tanda tanya). Maskot ${resolvedMascot} berdiri di sebelah kiri menu, tersenyum sambil menunjuk ke arah tombol-tombol tersebut.
Footer/Navigasi: Tombol "Kembali" di sudut kiri bawah.
Rendering Quality: ${renderingNegative}`;

      case 3:
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace.
Header: Teks "Tujuan Belajar" di bagian atas layar.
Content: Gaya visual ${visualStyle}. Terdapat elemen papan kayu ilustrasi yang berisi 3 poin teks besar mengenai kompetensi siswa menguasai "${resolvedTopic}". Maskot ${resolvedMascot} berdiri di samping papan sambil memeluk sebuah pensil raksasa dengan riang.
Footer/Navigasi: Tombol "Home", "Kembali", dan "Lanjut" sejajar rapi di bagian bawah.
Rendering Quality: ${renderingNegative}`;

      case 4:
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace.
Header: Teks pemantik "Pernahkah Kamu mengamati ${resolvedTopic} di sekitar kita?" dengan tanda tanya besar.
Content: Gaya visual ${visualStyle}. Ilustrasi pemandangan lingkungan alam atau situasi sehari-hari yang indah dan hidup menggambarkan "${resolvedTopic}". Maskot ${resolvedMascot} berada di sudut kanan bawah, sedang mengintip penasaran menggunakan teropong.
Footer/Navigasi: Tombol "Home", "Kembali", dan "Lanjut" sejajar rapi di bagian bawah.
Rendering Quality: ${renderingNegative}`;

      case 5:
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace.
Header: Teks "Apa itu ${resolvedTopic}?" di bagian tengah atas.
Content: Gaya visual ${visualStyle}. Teks penjelasan ramah anak: "${resolvedTopic} adalah lingkungan dan ekosistem tempat tinggal bersama makhluk hidup dan benda tak hidup." Di bawah teks terdapat ilustrasi lingkaran setengah yang menunjukkan interaksi harmoni. Maskot ${resolvedMascot} tersenyum riang sambil memegang buku catatan terbuka di tangannya.
Footer/Navigasi: Tombol "Home", "Kembali", dan "Lanjut" sejajar rapi di bagian bawah.
Rendering Quality: ${renderingNegative}`;

      default:
        // Dynamic fallback generator for remaining slides 6 to 20
        const slideMeta = dynamicSlideStructure[num - 1] || { title: `Slide ${num}`, type: 'Materi', desc: 'Penjelasan topik' };
        return `Ukuran: ${layout.includes('Landscape') ? 'Landscape 16:9' : 'Portrait 9:16'}
Framing: Premium educational slide presentation, generous whitespace, clean layout, perfect typography placement.
Header: Teks "${slideMeta.title}" di bagian atas.
Content: Gaya visual ${visualStyle}. Ilustrasi grafis edukatif yang melukiskan secara jelas dan presisi mengenai: "${slideMeta.desc}". Maskot pemandu ${resolvedMascot} berdiri di sudut layar membantu menunjukkan diagram visual.
Footer/Navigasi: Tombol kontrol interaktif di bagian bawah.
Rendering Quality: ${renderingNegative}`;
    }
  };

  const handleCopySinglePrompt = (num: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(`slide-${num}`);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleFileUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleMascotUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMascotUploadedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>EduSmart Platform · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Media Pembelajaran
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rancang presentasi kelas interaktif terstruktur lengkap dengan opsi layout, visual style premium, serta maskot pemandu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'wizard'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Wizard 8-Step
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Slide Deck</span>
          </button>
        </div>
      </div>

      {activeTab === 'wizard' ? (
        /* WIZARD CONTAINER */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Progress Step Bar */}
          <div className="px-6 py-4 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1'
                      : step > s
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-blue-900 ml-4 shrink-0">
              Langkah {step} dari 8
            </span>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* STEP 1: Topik Materi */}
            {step === 1 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 1: Judul atau Topik Presentasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Presentasi ini mau membahas judul atau topik apa?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kamu boleh ketik bebas judul presentasimu pada kolom di bawah, atau unggah dokumen materi (Word/PDF/PPT) yang mau dijadikan sebagai dasar presentasinya:
                </p>

                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ketik topik presentasi (Contoh: Ekosistem, Tata Surya, Struktur Atom...)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-hidden text-sm placeholder:text-slate-400/60 placeholder:font-normal"
                />

                {/* Document Upload Mockup */}
                <div className="pt-3">
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Atau Unggah Dokumen Pendukung Materi:
                  </span>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/20 rounded-2xl cursor-pointer transition-all">
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-slate-700">Pilih dokumen Word, PDF, atau PPT</span>
                    <span className="text-[10px] text-slate-400/80 mt-1 block">Maksimal ukuran file 15MB</span>
                    <input 
                      type="file" 
                      accept=".doc,.docx,.pdf,.ppt,.pptx" 
                      onChange={handleFileUploadMock}
                      className="hidden" 
                    />
                  </label>
                  {uploadedFileName && (
                    <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-1">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Berhasil memuat: {uploadedFileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Target Usia */}
            {step === 2 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 2: Target Usia Pembelajar
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Target usia untuk presentasi ini adalah?
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih salah satu dari opsi berikut untuk menyesuaikan bahasa narasi dan visualisasi materi:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '4–6 tahun (PAUD / TK)',
                    '7–9 tahun (SD Kelas Rendah)',
                    '10–12 tahun (SD Kelas Tinggi)',
                    '13–15 tahun (SMP)',
                    '16–18 tahun (SMA/SMK)',
                    '18+ tahun (Mahasiswa / Umum / Korporat)'
                  ].map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGroup(age)}
                      className={`p-3.5 text-left rounded-2xl border text-xs font-semibold transition-all ${
                        ageGroup === age
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Struktur Halaman */}
            {step === 3 && (
              <div className="space-y-4 max-w-3xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 3: Struktur Halaman Standar
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Berikut adalah struktur halaman standar untuk topik "{resolvedTopic}" ({ageGroup}):
                </h3>

                {/* Standard List */}
                <div className="max-h-56 overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600 scrollbar-thin">
                  <div className="font-bold text-slate-800 pb-1 mb-1 border-b border-slate-200">20 Halaman Standar:</div>
                  <p>1. Cover</p>
                  <p>2. Navigasi (Tujuan Pembelajaran, Materi, Video Pembelajaran, Kuis)</p>
                  <p>3. Tujuan Pembelajaran</p>
                  <p>4. Apersepsi</p>
                  <p>5. Materi 1: Apa itu {resolvedTopic}? (Definisi dasar)</p>
                  <p>6. Materi 2: Karakteristik Utama (Hewan dan tumbuhan)</p>
                  <p>7. Materi 3: Komponen Abiotik (Air, tanah, matahari)</p>
                  <p>8. Materi 4: Contoh di Darat (Hutan dan taman)</p>
                  <p>9. Materi 5: Contoh di Air (Sungai dan laut)</p>
                  <p>10. Video Pembelajaran</p>
                  <p>11. Rangkuman/Summary</p>
                  <p>12. Peta Perjalanan Kuis</p>
                  <p>13. Kuis 1</p>
                  <p>14. Kuis 2</p>
                  <p>15. Kuis 3</p>
                  <p>16. Kuis 4</p>
                  <p>17. Kuis 5</p>
                  <p>18. Respon Benar</p>
                  <p>19. Respon Salah</p>
                  <p>20. Penutup</p>
                </div>

                {/* Customization Choice */}
                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-semibold text-slate-800">
                    Apakah kamu ingin memakai struktur standar ini, atau ada yang ingin ditambah, dikurangi, atau diubah urutannya?
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStructureOption('standard')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        structureOption === 'standard' ? 'bg-blue-600 text-white border-transparent' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      Gunakan Struktur Standar (20 Halaman)
                    </button>
                    <button
                      onClick={() => setStructureOption('custom')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        structureOption === 'custom' ? 'bg-blue-600 text-white border-transparent' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      Kustomisasi Struktur Halaman
                    </button>
                  </div>

                  {structureOption === 'custom' && (
                    <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-150">
                      <label className="block text-xs font-semibold text-slate-700">Tulis instruksi kustomisasi struktur di bawah ini:</label>
                      <textarea
                        value={customStructureNotes}
                        onChange={(e) => setCustomStructureNotes(e.target.value)}
                        rows={3}
                        placeholder="Contoh: Tolong hapus video pembelajaran, dan tambahkan 1 halaman pengenalan proyek sains setelah kuis..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-hidden placeholder:text-slate-400/60 placeholder:font-normal"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: Orientasi Layar */}
            {step === 4 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 4: Orientasi Layar (Layout)
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih orientasi layar (layout) untuk presentasi ini:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Landscape (1920 x 1080 px)',
                    'Portrait (1080 x 1920 px)'
                  ].map((lay) => (
                    <button
                      key={lay}
                      onClick={() => setLayout(lay)}
                      className={`p-4 text-center rounded-2xl border text-xs font-bold transition-all ${
                        layout === lay
                          ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {lay}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Gaya Visual */}
            {step === 5 && (
              <div className="space-y-4 max-w-3xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 5: Gaya Visual (Visual Style)
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Silakan pilih gaya visual (Visual Style) untuk presentasinya:
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1 bg-slate-50/50 rounded-2xl border border-slate-200">
                  {[
                    '3D Pixar Style',
                    '3D Clay Animation',
                    '3D Felt Toys',
                    '3D Plastic Toy',
                    'Watercolor Storybook',
                    'Paper Cut',
                    'Flat Cartoon',
                    'Anime Chibi',
                    '3D Soft Clay Pastel',
                    '3D Crochet / Amigurumi',
                    '3D Clay Glossy (Vibrant & Colorful)',
                    '2d cartoon',
                    'watercolor',
                    '2d vector education',
                    'Whimsical 3D miniature diorama'
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => setVisualStyle(style)}
                      className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                        visualStyle === style
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Bahasa Narasi */}
            {step === 6 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 6: Bahasa Narasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Silakan pilih bahasa narasi yang akan digunakan:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Bahasa Indonesia',
                    'English',
                    'Dwibahasa (Indonesia & English)'
                  ].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`p-4 text-center rounded-2xl border text-xs font-semibold transition-all ${
                        language === lang
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Karakter Maskot */}
            {step === 7 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">
                  STEP 7: Karakter Maskot Presentasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Apakah kamu ingin menggunakan karakter maskot dalam presentasi ini?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'ai',
                      title: 'Biarkan AI merancang maskot',
                      desc: `AI akan menyusun maskot yang disesuaikan topik "${resolvedTopic}", usia, dan gaya visual "${visualStyle}" secara otomatis.`
                    },
                    {
                      id: 'describe',
                      title: 'Deskripsikan maskot sendiri',
                      desc: 'Tuliskan deskripsi tag visual maskot impianmu secara kustom.'
                    },
                    {
                      id: 'upload',
                      title: 'Upload gambar referensi maskot sendiri',
                      desc: 'Gunakan logo institusi atau file gambar maskot eksternal.'
                    },
                    {
                      id: 'none',
                      title: 'Tanpa maskot',
                      desc: 'Fokus hanya pada infografis pelajaran tanpa karakter pemandu.'
                    }
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setMascotOption(m.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        mascotOption === m.id
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {mascotOption === 'describe' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-150 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">Tulis deskripsi maskot pembelajaranmu:</label>
                    <textarea
                      value={mascotDescInput}
                      onChange={(e) => setMascotDescInput(e.target.value)}
                      rows={2}
                      placeholder="Contoh: Burung hantu penjelajah cerdas memakai topi wisuda kecil membawa tongkat bintang kecil berkilau..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-400 focus:outline-hidden placeholder:text-slate-400/60 placeholder:font-normal"
                    />
                  </div>
                )}

                {mascotOption === 'upload' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-150 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">Pilih berkas gambar maskot:</label>
                    <label className="flex items-center justify-center p-4 border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer text-xs font-semibold text-slate-700 transition-all">
                      <span>Pilih gambar maskot (JPG, PNG, WebP)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleMascotUploadMock}
                        className="hidden" 
                      />
                    </label>
                    {uploadedMascotFile && (
                      <p className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 block">
                        Karakter dimuat: {uploadedMascotFile}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 8: Ringkasan & Generate Slices */}
            {step === 8 && (
              <div className="space-y-6 max-w-3xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold animate-pulse">
                  STEP 8: Ringkasan Presentasi & Prompt Output
                </div>
                
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <h4 className="font-extrabold text-slate-900 border-l-4 border-blue-600 pl-2 text-sm mb-3">
                    Berikut adalah ringkasan untuk presentasimu:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Judul/Topik:</span>
                      <span className="font-bold text-slate-800 text-sm">{resolvedTopic}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Target Usia:</span>
                      <span className="font-bold text-slate-800">{ageGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Struktur Halaman:</span>
                      <span className="font-bold text-slate-800">
                        20 Halaman ({structureOption === 'standard' ? 'Sesuai Struktur Standar' : 'Sesuai Kustomisasi Guru'})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Layout / Orientasi:</span>
                      <span className="font-bold text-slate-800">{layout}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Gaya Visual:</span>
                      <span className="font-bold text-slate-800">{visualStyle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Bahasa Narasi:</span>
                      <span className="font-bold text-slate-800">{language}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block text-[10px]">Karakter Maskot:</span>
                      <span className="font-bold text-slate-800">{resolvedMascot}</span>
                    </div>
                  </div>
                </div>

                {/* Prompt List Page Spread (Paginator for 1-5, 6-10, 11-15, 16-20) */}
                <div className="space-y-4 pt-3 border-t border-slate-200">
                  <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      Berikut adalah prompt untuk <strong>Halaman {((promptPageGroup - 1) * 5) + 1} sampai {promptPageGroup * 5}</strong>. Silakan salin prompt ini jika kamu ingin menggunakan AI Image Generator pilihanmu.
                    </span>
                  </div>

                  {/* Paginator Tab Switcher bar */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-[11px] font-bold">
                    <span className="text-slate-500 px-2 shrink-0">Navigasi Halaman:</span>
                    {[
                      { g: 1, label: 'Halaman 1–5' },
                      { g: 2, label: 'Halaman 6–10' },
                      { g: 3, label: 'Halaman 11–15' },
                      { g: 4, label: 'Halaman 16–20' }
                    ].map((btn) => (
                      <button
                        key={btn.g}
                        onClick={() => setPromptPageGroup(btn.g)}
                        className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                          promptPageGroup === btn.g 
                            ? 'bg-blue-600 text-white shadow-2xs' 
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* The actual prompt boxes for selected page group */}
                  <div className="space-y-5">
                    {Array.from({ length: 5 }).map((_, offsetIdx) => {
                      const slideNum = ((promptPageGroup - 1) * 5) + offsetIdx + 1;
                      const promptText = getPromptForSlide(slideNum);
                      const isCopied = copiedPromptId === `slide-${slideNum}`;
                      const slideMeta = dynamicSlideStructure[slideNum - 1] || { title: `Slide ${slideNum}`, type: 'Materi' };

                      return (
                        <div key={slideNum} className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden transition-all hover:border-slate-300">
                          {/* Slide Box Header */}
                          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs">
                            <span className="font-bold text-slate-900">
                              Prompt Halaman {slideNum}: {slideMeta.title.replace(/^Prompt Slide \d+:\s*/i, '')}
                            </span>
                            <button
                              onClick={() => handleCopySinglePrompt(slideNum, promptText)}
                              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all active:scale-95 ${
                                isCopied ? 'bg-emerald-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                              }`}
                            >
                              {isCopied ? '✓ Tersalin!' : '📋 Salin Plaintext'}
                            </button>
                          </div>
                          
                          {/* Prompt pre display */}
                          <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all max-h-36 overflow-y-auto">
                            {promptText}
                          </pre>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next Group trigger footer exactly matching the user request instructions */}
                  <div className="p-4 bg-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border border-slate-200">
                    <span className="text-slate-600">
                      Klik <strong>"Halaman Berikutnya"</strong> untuk menampilkan slide <strong>{promptPageGroup === 4 ? '1-5' : `${(promptPageGroup * 5) + 1} s.d ${(promptPageGroup + 1) * 5}`}</strong>.
                    </span>
                    <button
                      onClick={() => setPromptPageGroup(prev => prev === 4 ? 1 : prev + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-1 shrink-0"
                    >
                      <span>Lanjut Halaman</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step navigation bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={step === 1}
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  step === 1
                    ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {step < 8 ? (
                <button
                  onClick={() => setStep(prev => Math.min(8, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all"
                >
                  <span>Lanjut ke Step {step + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    let allPromptsConcat = `RINGKASAN MEDIA PEMBELAJARAN SLIDE\n==================================================\nJudul: ${resolvedTopic}\nTarget Usia: ${ageGroup}\nLayout: ${layout}\nGaya: ${visualStyle}\n\n`;
                    for (let s = 1; s <= 20; s++) {
                      allPromptsConcat += `==================================================\nPrompt Slide ${s}\n==================================================\n${getPromptForSlide(s)}\n\n`;
                    }
                    setGeneratedPromptText(allPromptsConcat);
                    setModalTitle('Seluruh Prompt Slide Presentasi (1 s.d 20)');
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all animate-bounce"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ekspor Semua Prompt Slide (1-20)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE SLIDE DECK VIEWER */
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-in fade-in">
          {/* Slide Stage Header */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-500 text-white rounded font-mono font-bold">
                Slide {currentSlideIndex + 1} / {dynamicSlideStructure.length}
              </span>
              <span className="text-slate-300 font-medium">
                {dynamicSlideStructure[currentSlideIndex].title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="p-1.5 rounded hover:bg-slate-800 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(dynamicSlideStructure.length - 1, prev + 1))}
                disabled={currentSlideIndex === dynamicSlideStructure.length - 1}
                className="p-1.5 rounded hover:bg-slate-800 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 16:9 Canvas Slide Mockup */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-emerald-50 via-teal-50/50 to-blue-50 p-8 flex flex-col justify-between border-b border-slate-200 overflow-hidden">
            {/* Slide Header */}
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <h3 className="text-lg lg:text-xl font-extrabold text-emerald-950 font-heading">
                  {dynamicSlideStructure[currentSlideIndex].title}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {dynamicSlideStructure[currentSlideIndex].type}
              </span>
            </div>

            {/* Slide Central Content */}
            <div className="flex-1 flex items-center justify-between py-6 gap-6">
              <div className="max-w-md space-y-3">
                <p className="text-sm lg:text-base font-medium text-slate-800 leading-relaxed">
                  {dynamicSlideStructure[currentSlideIndex].desc}
                </p>
                <div className="p-3 bg-white/80 backdrop-blur-xs rounded-xl border border-emerald-100 text-xs text-slate-600">
                  <strong>Informasi Slide:</strong> Menggunakan layout {layout} dengan style visual {visualStyle} dan bahasa {language}.
                </div>
              </div>

              {/* Graphic Mascot Element */}
              <div className="w-48 h-48 rounded-3xl bg-white/90 border border-emerald-200 shadow-sm flex flex-col items-center justify-center text-center p-4">
                <div className="text-5xl mb-2">🧭</div>
                <span className="text-xs font-bold text-slate-800">
                  {mascotOption === 'none' ? 'Informatif' : 'Maskot Pemandu'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium truncate max-w-full">
                  {resolvedMascot}
                </span>
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-emerald-200/60 text-xs text-emerald-900 font-medium">
              <span>EduSmart Platform · Tema {resolvedTopic}</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700 shadow-2xs">Home</button>
                <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg shadow-2xs">Lanjut</button>
              </div>
            </div>
          </div>

          {/* Quick Slide Selector Strip */}
          <div className="p-4 bg-slate-50 flex items-center gap-2 overflow-x-auto">
            {dynamicSlideStructure.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                  currentSlideIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                #{s.num} {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Modal */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subtitle="Prompt siap pakai yang dapat digunakan pada AI pilihanmu"
        promptContent={generatedPromptText}
      />
    </div>
  );
};
