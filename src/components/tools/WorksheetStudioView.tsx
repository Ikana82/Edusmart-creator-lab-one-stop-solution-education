import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Grid, 
  Layers, 
  HelpCircle,
  Settings2,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Info,
  Wand2,
  Eye
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const WorksheetStudioView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'preview'>('wizard');
  const [step, setStep] = useState<number>(1);

  // STEP 1: Jenis Worksheet (13 Kategori Utama dari Menu Utama)
  const [category, setCategory] = useState<'coloring' | 'tracing' | 'counting' | 'matching' | 'cut-paste' | 'same-different' | 'maze' | 'coding' | 'literacy' | 'indonesian' | 'math' | 'science' | 'islamic'>('coding');

  // STEP 2: Subjenis / Aktivitas (Sesuai Aturan: 1 Halaman = 1 Kegiatan)
  const [subCategory, setSubCategory] = useState('Coding Arah');

  // STEP 3: Target Jenjang / Usia (6 Pilihan Sesuai Aturan)
  const [ageGrade, setAgeGrade] = useState('TK B (5–6 Tahun)');

  // STEP 4: Tema / Topik
  const [theme, setTheme] = useState('');

  // STEP 5: Jumlah Soal & Tingkat Kesulitan
  const [itemCount, setItemCount] = useState<number>(6);
  const [difficulty, setDifficulty] = useState<'Mudah (Basic)' | 'Sedang (Intermediate)' | 'Menantang (Advanced)'>('Sedang (Intermediate)');

  // STEP 6: Gaya Visual
  const [visualStyle, setVisualStyle] = useState<'Minimalist' | 'Cute 2D' | 'Kawaii' | 'Cartoon' | 'B&W Printable'>('Cute 2D');

  // STEP 7: Bahasa Pengantar
  const [language, setLanguage] = useState<'Bahasa Indonesia' | 'English' | 'Dwibahasa (Indonesia & English)'>('Bahasa Indonesia');

  // Interactive copied helper
  const [isCopied, setIsCopied] = useState(false);

  // Modal prompt state
  const [modalOpen, setModalOpen] = useState(false);
  const [promptText, setPromptText] = useState('');

  // Solid fallbacks if input fields are left blank
  const resolvedTheme = theme.trim() || 'Dinosaurus Lucu';
  const resolvedTitle = `Worksheet ${subCategory}: Tema ${resolvedTheme}`;
  const resolvedInstructions = `Mari selesaikan aktivitas ${subCategory.toLowerCase()} bertema ${resolvedTheme} dengan teliti dan gembira!`;

  // Standard main categories matching the prompt menu
  const mainCategories = [
    { id: 'coding', label: 'Coding Anak', desc: 'Coding Arah, Koneksi Warna, Sandi Rahasia' },
    { id: 'math', label: 'Matematika', desc: 'Penjumlahan Gambar, Pola Angka, Pengurangan' },
    { id: 'counting', label: 'Counting', desc: 'Menghitung Objek Ceria & Menulis Angka' },
    { id: 'matching', label: 'Matching', desc: 'Menghubungkan Objek & Bayangan Setara' },
    { id: 'tracing', label: 'Tracing', desc: 'Penebalan Garis, Huruf Alfabet, & Bentuk' },
    { id: 'cut-paste', label: 'Cut & Paste', desc: 'Gunting Tempel Pola & Bangun Datar' },
    { id: 'same-different', label: 'Same & Different', desc: 'Mencari Perbedaan Gambar & Pola Setara' },
    { id: 'maze', label: 'Maze / Labirin', desc: 'Jalur Masuk & Keluar Bertema Petualangan' },
    { id: 'coloring', label: 'Coloring', desc: 'Mewarnai Gambar Outline Kreatif' },
    { id: 'literacy', label: 'Alphabet & Literacy', desc: 'Pengenalan Huruf Depan, Kosakata, Tracing' },
    { id: 'indonesian', label: 'Bahasa Indonesia', desc: 'Suku Kata Hilang, Tebak Kata Bergambar' },
    { id: 'science', label: 'Science', desc: 'Observasi Siklus Hidup, Pengelompokkan Alami' },
    { id: 'islamic', label: 'Islamic Worksheet', desc: 'Tracing Hijaiyah, Urutan Wudhu & Shalat' },
  ];

  // Dynamic subcategories dropdown suggestions based on category chosen
  const getSubCategoryOptions = () => {
    switch (category) {
      case 'coding':
        return [
          'Coding Arah',
          'Line Coding',
          'Coding Warna / Koneksi Warna',
          'Pola Warna',
          'Coding Angka',
          'Coding Penjumlahan',
          'Coding Matematika',
          'Luas Objek / Grid Coding',
          'Menimbang dan Menjumlah',
          'Pattern Coding',
          'Grid Coding',
          'Pixel Coding'
        ];
      case 'math':
        return ['Penjumlahan Gambar', 'Pengurangan Visual', 'Pola Deret Angka', 'Berhitung Loncat', 'Matematika Dasar'];
      case 'counting':
        return ['Menghitung Objek Ceria', 'Menggambar Sesuai Angka', 'Berhitung dengan Jari', 'Mewarnai Sesuai Jumlah'];
      case 'matching':
        return ['Mencocokkan Bayangan', 'Menyamakan Gambar', 'Menyamakan Warna', 'Mencocokkan Bentuk & Pola'];
      case 'tracing':
        return ['Tracing Garis Putus-putus', 'Tracing Bentuk Geometri', 'Tracing Alfabet', 'Tracing Angka'];
      case 'cut-paste':
        return ['Gunting Tempel Suku Kata', 'Menyusun Puzzle Padang Rumput', 'Membangun Robot Kertas', 'Gunting Tempel Anggota Tubuh'];
      case 'same-different':
        return ['Temukan Perbedaan Gambar', 'Mencari Gambar yang Berbeda', 'Mencari Gambar yang Sama Persis'];
      case 'maze':
        return ['Labirin Petualangan', 'Maze Game Geometri', 'Maze Pencarian Objek'];
      case 'coloring':
        return ['Coloring Page Kreatif', 'Color by Number', 'Color by Letter', 'Mewarnai Bentuk'];
      case 'literacy':
        return ['Mencari Huruf Depan', 'Melengkapi Huruf Rumpang', 'Menulis Suku Kata', 'Menulis Huruf Besar & Kecil'];
      case 'indonesian':
        return ['Suku Kata yang Hilang', 'Tebak Nama Hewan', 'Mari Menulis Sesuai Kode'];
      case 'science':
        return ['Siklus Hidup Kupu-kupu', 'Siklus Hidup Ayam', 'Mengenal Makanan Hewan', 'Klasifikasi Tempat Tinggal Hewan'];
      case 'islamic':
        return ['Tracing Huruf Hijaiyah', 'Menangkap Kepiting Hijaiyah', 'Mencocokkan Gerakan Wudhu', 'Mencocokkan Gerakan Shalat'];
      default:
        return ['Aktivitas Edukatif Standar'];
    }
  };

  // Recommendation Mode: 4-7 relevant activities based on target age
  const getRecommendations = () => {
    if (ageGrade.includes('3–4') || ageGrade.includes('4–5')) {
      return [
        { cat: 'coloring', sub: 'Coloring Page Kreatif', label: '🎨 Mewarnai Hewan Lucu' },
        { cat: 'tracing', sub: 'Tracing Garis Putus-putus', label: '✏️ Tracing Garis Bergelombang' },
        { cat: 'matching', sub: 'Mencocokkan Bayangan', label: '🔍 Mencocokkan Bayangan Hewan' },
        { id: 'counting-basic', cat: 'counting', sub: 'Menghitung Objek Ceria', label: '🔢 Menghitung Buah 1-5' },
        { cat: 'same-different', sub: 'Mencari Gambar yang Berbeda', label: '❓ Mencari Gambar Berbeda' },
      ];
    } else if (ageGrade.includes('5–6')) {
      return [
        { cat: 'coding', sub: 'Coding Arah', label: '🤖 Coding Arah (Grid 5x5)' },
        { cat: 'maze', sub: 'Labirin Petualangan', label: '🌀 Maze Petualangan Hutan' },
        { cat: 'cut-paste', sub: 'Gunting Tempel Anggota Tubuh', label: '✂️ Gunting Tempel Wajah' },
        { cat: 'literacy', sub: 'Mencari Huruf Depan', label: '🅰️ Mencari Huruf Depan Kata' },
        { cat: 'islamic', sub: 'Tracing Huruf Hijaiyah', label: '🕌 Tracing Hijaiyah Alif-Ya' },
      ];
    } else {
      // SD levels
      return [
        { cat: 'coding', sub: 'Coding Penjumlahan', label: '➕ Coding Penjumlahan Simbol' },
        { cat: 'math', sub: 'Pola Deret Angka', label: '📈 Pola Deret Angka Matematika' },
        { cat: 'science', sub: 'Siklus Hidup Kupu-kupu', label: '🦋 Siklus Hidup Kupu-kupu' },
        { cat: 'coding', sub: 'Coding Warna / Koneksi Warna', label: '🌈 Koneksi Warna Kode Angka' },
        { cat: 'indonesian', sub: 'Suku Kata yang Hilang', label: '📝 Suku Kata Bahasa Indonesia' },
        { cat: 'islamic', sub: 'Mencocokkan Gerakan Shalat', label: '🕌 Gerakan Shalat & Wudhu' },
      ];
    }
  };

  const applyRecommendation = (rec: { cat: any, sub: string }) => {
    setCategory(rec.cat);
    setSubCategory(rec.sub);
    // Move to step 4 directly (theme) to speed up configurations as requested
    setStep(4);
  };

  const handleGeneratePrompt = () => {
    let specificRule = '';

    if (category === 'coding') {
      if (subCategory === 'Coding Arah') {
        specificRule = `Aktivitas: Coding Arah Murni (1 Halaman = 1 Aktivitas) bertema "${resolvedTheme}". Satu central 5x5 grid dengan titik START (Karakter utama bertema ${resolvedTheme}) di pojok kiri atas dan titik FINISH (Objek target bertema ${resolvedTheme}) di pojok kanan bawah. Di bawah grid, sediakan satu rangkaian kode panah navigasi: [↑] [→] [→] [↓] [→] [↓] sesuai tema. Anak mengikuti dan menggambar jalur sesuai urutan kode.`;
      } else if (subCategory === 'Line Coding') {
        specificRule = `Aktivitas: Line Coding bertema "${resolvedTheme}". Kotak contoh pola garis berdasarkan hubungan titik-titik di sebelah kiri, kotak kosong serupa di sebelah kanan. Menyediakan 4 baris latihan simetris untuk disalin polanya oleh anak usia ${ageGrade}.`;
      } else if (subCategory === 'Coding Warna / Koneksi Warna') {
        specificRule = `Aktivitas: Koneksi Warna Berdasarkan Kode Angka bertema "${resolvedTheme}". Tabel legend di atas: 1=Merah, 2=Kuning, 3=Hijau, 4=Biru, 5=Ungu. ${itemCount} Baris soal urutan angka bercorak "${resolvedTheme}" dengan lingkaran warna yang siap dihubungkan garis.`;
      } else if (subCategory === 'Coding Penjumlahan') {
        specificRule = `Aktivitas: Coding Penjumlahan Simbol bertema "${resolvedTheme}". Tabel kode bentuk dan angka di bagian atas (contoh: ${resolvedTheme} 1 = 3, ${resolvedTheme} 2 = 2). Sediakan ${itemCount} soal penjumlahan simbol: [Simbol 1] + [Simbol 2] = [ ... ] dengan kotak jawaban yang jelas untuk dilatih anak usia ${ageGrade}.`;
      } else {
        specificRule = `Aktivitas: ${subCategory} bertema "${resolvedTheme}". Menampilkan tabel legend yang jelas di bagian atas, diikuti dengan ${itemCount} soal latihan konsisten di area aktivitas utama.`;
      }
    } else if (category === 'counting') {
      specificRule = `Aktivitas: Menghitung Objek Ceria (Counting) bertema "${resolvedTheme}". Terdapat ${itemCount} kotak aktivitas berjajar rapi. Tiap kotak berisi objek gambar bertema ${resolvedTheme} dengan jumlah bervariasi yang mudah dihitung oleh anak usia ${ageGrade}. Di sebelah kanan tiap kotak ada kotak lingkaran kosong untuk menulis angka jawaban.`;
    } else if (category === 'matching') {
      specificRule = `Aktivitas: Menghubungkan Objek (Matching) bertema "${resolvedTheme}". Kolom kiri berisi ${itemCount} gambar objek bertema ${resolvedTheme}, kolom kanan berisi bayangan atau pasangan objek tersebut yang diacak posisinya. Whitespace lega di antara kedua kolom.`;
    } else if (category === 'tracing') {
      specificRule = `Aktivitas: Tracing Garis Putus-putus (Motorik Halus) bertema "${resolvedTheme}". Menyediakan pola-pola garis putus-putus spiral, bergelombang, dan zigzag bertema ${resolvedTheme} yang siap ditebalkan oleh anak usia ${ageGrade} menggunakan krayon/pensil warna.`;
    } else if (category === 'maze') {
      specificRule = `Aktivitas: Labirin Pintar (Maze Game) bertema "${resolvedTheme}". Desain labirin berbentuk ilustrasi sederhana bertema ${resolvedTheme} dengan titik START dan titik FINISH yang jelas dan whitespace lebar agar mudah ditarik garis oleh anak usia ${ageGrade}.`;
    } else if (category === 'cut-paste') {
      specificRule = `Aktivitas: Gunting & Tempel (Cut & Paste) bertema "${resolvedTheme}". Bagian bawah lembar kerja berisi beberapa gambar komponen ${resolvedTheme} dengan garis potong (cut-lines) putus-putus berikon gunting siap dipotong, untuk ditempelkan pada tempat yang sesuai pada background gambar utama di bagian tengah.`;
    } else if (category === 'coloring') {
      specificRule = `Aktivitas: Mewarnai Gambar Kreatif (Coloring Page) bertema "${resolvedTheme}". Ilustrasi petualangan bertema ${resolvedTheme} berskala besar dengan outline bersih, tebal, dan tanpa bayangan/arsiran berat, menyisakan area kosong yang luas untuk diwarnai secara bebas.`;
    } else if (category === 'literacy' || category === 'indonesian') {
      specificRule = `Aktivitas: Pengenalan Huruf & Suku Kata Bahasa Indonesia bertema "${resolvedTheme}". Menyediakan ${itemCount} baris latihan membaca/menulis kata kunci berkaitan dengan tema ${resolvedTheme}, lengkap dengan gambar ilustrasi pendukung di sebelahnya.`;
    } else if (category === 'science') {
      specificRule = `Aktivitas: Observasi & Penyelidikan Sains Sederhana bertema "${resolvedTheme}". Mengajak anak usia ${ageGrade} mengamati siklus hidup, mengelompokkan karakteristik alami, dan mencentang gambar-gambar objek bertema ${resolvedTheme} yang sesuai.`;
    } else if (category === 'islamic') {
      specificRule = `Aktivitas: Edukasi Islami Anak bertema "${resolvedTheme}". Menampilkan draf latihan "${subCategory}" dengan ejaan bahasa Indonesia yang benar, disertai ilustrasi ramah anak yang bersih tanpa dekorasi berlebihan.`;
    } else {
      specificRule = `Aktivitas edukatif ramah anak bertema "${resolvedTheme}": Gambar outline bersih, teks jelas dan besar, siap dikerjakan oleh anak usia ${ageGrade}.`;
    }

    const fullPrompt = `A4 Portrait, target 2480 x 3508 px, setara 300 DPI untuk kebutuhan printable edukasi anak.
Layout: page-within-a-page: background luar sederhana + central white activity area dengan generous whitespace.
Header atas:
Nama: _______________________      Kelas: _______________________
Judul: "${resolvedTitle}"
Instruksi: "${resolvedInstructions}"

Area Aktivitas:
${specificRule}

Aturan Desain & Validasi:
- SATU HALAMAN = SATU JENIS AKTIVITAS (Tidak mencampur jenis aktivitas).
- Area kerja dominan, tanpa watermark, tanpa logo, tanpa harga, tanpa random letters/numbers.
- Typography jelas, ramah anak, mudah dibaca.
- Style: ${visualStyle === 'B&W Printable' ? 'Black & White Printable, clean line art, outline tebal jelas, siap diwarnai / printable hitam putih' : `${visualStyle} style, warna cerah seimbang, child-friendly, sharp focus 8k render`}.
- Commercial print-ready 300 DPI, margin aman cetak.`;

    setPromptText(fullPrompt);
    setModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>EduSmart Worksheet Studio · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Worksheet Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Buat lembar aktivitas anak PAUD, TK, dan SD berstandar pedagogis tinggi: 1 Halaman = 1 Aktivitas, whitespace seimbang, area kerja dominan.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'wizard'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Wizard Pembuat Worksheet
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'preview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tinjau Lembar Kerja</span>
          </button>
        </div>
      </div>

      {activeTab === 'wizard' ? (
        /* WIZARD CONTAINER */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Progress Step Bar */}
          <div className="px-6 py-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 ring-offset-1'
                      : step > s
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-emerald-900 ml-4 shrink-0">
              Langkah {step} dari 8
            </span>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* Recommendation drawer (Always floating near steps to assist) */}
            {step <= 3 && (
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
                <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rekomendasi Aktivitas Sesuai Target Usia ({ageGrade.split(' ')[0]}):</span>
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {getRecommendations().map((rec, i) => (
                    <button
                      key={i}
                      onClick={() => applyRecommendation(rec)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-3xs"
                    >
                      {rec.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Pilih Kategori Utama */}
            {step === 1 && (
              <div className="space-y-4 max-w-3xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 1: Pilih Kategori Worksheet Utama
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Aktivitas atau mata pelajaran apa yang ingin dikembangkan?
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih salah satu menu kategori utama di bawah ini untuk memuat sub-aktivitas yang sesuai:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mainCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCategory(c.id as any);
                        const defaultSubs = getSubCategoryOptions();
                        setSubCategory(defaultSubs[0]);
                      }}
                      className={`p-4 text-left rounded-2xl border transition-all ${
                        category === c.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold block text-slate-900">{c.label}</span>
                      <span className="text-[10px] text-slate-500 font-normal mt-1 block leading-tight">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Pilih Sub-kategori / Aktivitas */}
            {step === 2 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 2: Pilih Jenis Aktivitas Spesifik
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Ingat Aturan: Satu Halaman Worksheet = Satu Jenis Kegiatan
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kami membatasi aktivitas kaku agar anak tetap fokus tanpa bingung oleh instruksi campuran dalam satu lembar kerja. Pilih pola aktivitas yang diinginkan:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto p-1.5 border border-slate-200 rounded-2xl bg-slate-50/50">
                  {getSubCategoryOptions().map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSubCategory(opt)}
                      className={`p-3 text-left text-xs font-semibold rounded-xl border transition-colors ${
                        subCategory === opt
                          ? 'bg-emerald-600 text-white border-transparent shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Target Jenjang / Usia */}
            {step === 3 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 3: Pilih Target Jenjang & Usia Anak
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Siapa target pembelajar untuk lembar kerja ini?
                </h3>
                <p className="text-xs text-slate-500">
                  Jenjang usia akan memandu tingkat kerumitan, ukuran objek visual, dan whitespace agar sesuai kemampuan kognitif & motorik halus anak:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'PAUD / TK (3–4 Tahun)',
                    'TK A (4–5 Tahun)',
                    'TK B (5–6 Tahun)',
                    'SD Kelas 1 (6–7 Tahun)',
                    'SD Kelas 2–3 (7–9 Tahun)',
                    'SD Kelas 4–6 (9–12 Tahun)'
                  ].map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGrade(age)}
                      className={`p-4 text-left rounded-2xl border text-xs font-semibold transition-all ${
                        ageGrade === age
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Tema / Topik */}
            {step === 4 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 4: Tema atau Topik Visual Worksheet
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Topik atau karakter apa yang mendominasi lembar kerja?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Menyisipkan tema yang disukai anak dapat melipatgandakan motivasi belajar mereka secara signifikan. Ketik bebas tema idemu di bawah:
                </p>

                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Ketik tema cerita di sini (Contoh: Kelinci & Wortel, Luar Angkasa, Dinosaurus...)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-400 focus:outline-hidden text-sm placeholder:text-slate-400/60 placeholder:font-normal"
                />

                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-xs text-slate-400 py-1 mr-1">Rekomendasi Tema Terlaris:</span>
                  {['Hewan Hutan', 'Buah-buahan Tropis', 'Kendaraan Konstruksi', 'Luar Angkasa', 'Dinosaurus', 'Kebersihan Diri'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Jumlah Soal & Kesulitan */}
            {step === 5 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 5: Konfigurasi Soal & Tingkat Kesulitan
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tentukan jumlah soal dan kedalaman tantangan:
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Jumlah Soal / Objek Aktivitas:</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[4, 5, 6, 8, 10].map((num) => (
                        <button
                          key={num}
                          onClick={() => setItemCount(num)}
                          className={`p-3 rounded-xl border text-xs font-extrabold text-center transition-all ${
                            itemCount === num
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {num} Soal
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tingkat Kesulitan Kognitif:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['Mudah (Basic)', 'Sedang (Intermediate)', 'Menantang (Advanced)'].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setDifficulty(diff as any)}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            difficulty === diff
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Pilih Gaya Visual */}
            {step === 6 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 6: Pilih Gaya Visual Ilustrasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih sentuhan gaya gambar atau opsi cetak hitam-putih:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Minimalist', label: 'Minimalist Clean', desc: 'Desain bersih dengan ornamen visual minimal fokus isi materi.' },
                    { id: 'Cute 2D', label: 'Cute 2D Pastel', desc: 'Warna-warni pastel manis yang sangat disukai anak PAUD & TK.' },
                    { id: 'Kawaii', label: 'Kawaii Character', desc: 'Gaya Jepang imut berpipi merah merona, mata berbinar manis.' },
                    { id: 'Cartoon', label: 'Cartoon Playful', desc: 'Ilustrasi kartun petualangan yang ceria, tegas, dan kontras.' },
                    { id: 'B&W Printable', label: 'Black & White Printable (Outline Only)', desc: 'Garis outline bersih siap diwarnai anak, hemat tinta printer guru.' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setVisualStyle(style.id as any)}
                      className={`p-4 text-left rounded-2xl border transition-all ${
                        visualStyle === style.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold block">{style.label}</span>
                      <span className="text-[10px] text-slate-500 font-normal mt-1 block leading-tight">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Pilih Bahasa Pengantar */}
            {step === 7 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 7: Pilih Bahasa Pengantar Instruksi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Bahasa apa yang ingin disematkan pada lembar kerja?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Bahasa Indonesia', 'English', 'Dwibahasa (Indonesia & English)'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang as any)}
                      className={`p-4 text-center rounded-2xl border text-xs font-bold transition-all ${
                        language === lang
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Ringkasan & Generate */}
            {step === 8 && (
              <div className="space-y-6 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 8: Ringkasan & Output Generator Worksheet
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Berikut ringkasan konfigurasi lembar aktivitas edukatif anak:
                </h3>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Kategori Worksheet:</span>
                    <span className="font-bold text-slate-800 uppercase">{category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Subjenis / Kegiatan:</span>
                    <span className="font-bold text-slate-800">{subCategory}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Target Usia/Kelas:</span>
                    <span className="font-bold text-slate-800">{ageGrade}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Tema Visual:</span>
                    <span className="font-bold text-slate-800">{resolvedTheme}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Jumlah Soal / Objek:</span>
                    <span className="font-bold text-slate-800">{itemCount} Soal ({difficulty})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Style Gambar:</span>
                    <span className="font-bold text-slate-800">{visualStyle}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-medium">Bahasa Pengantar:</span>
                    <span className="font-bold text-slate-800">{language}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleGeneratePrompt}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-xs transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tampilkan Prompt AI Worksheet Siap Pakai</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="px-5 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-all"
                  >
                    Tinjau Lembar Kerja (Preview)
                  </button>
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
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
                >
                  <span>Lanjut ke Step {step + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleGeneratePrompt}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-all animate-pulse"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Prompt</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* TINJAU LEMBAR KERJA / PREVIEW SHEET (7 COLS GRAPHIC PREVIEW) */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 text-slate-800 select-none">
            {/* White activity box with dashed border mirroring page-within-a-page layout */}
            <div className="border-2 border-dashed border-emerald-300/80 rounded-2xl p-5 flex flex-col justify-between aspect-[1/1.414]">
              {/* Header section with Nama & Kelas line guides */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-300 pb-2 text-[10px] font-semibold text-slate-700">
                  <div className="flex gap-2">
                    <span>Nama:</span>
                    <span className="w-24 border-b border-dotted border-slate-500"></span>
                  </div>
                  <div className="flex gap-2">
                    <span>Kelas:</span>
                    <span className="w-16 border-b border-dotted border-slate-500"></span>
                  </div>
                  <div className="flex gap-2">
                    <span>Nilai:</span>
                    <span className="w-10 border-b border-dotted border-slate-500"></span>
                  </div>
                </div>

                <div className="text-center py-4">
                  <h3 className="text-sm lg:text-base font-extrabold text-emerald-950 tracking-tight font-heading">
                    {resolvedTitle}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1 italic leading-tight">
                    "{resolvedInstructions}"
                  </p>
                </div>
              </div>

              {/* Central Active Area simulation dynamically adapting to chosen category */}
              <div className="flex-1 flex flex-col items-center justify-center py-4 w-full">
                {category === 'coding' && subCategory === 'Coding Arah' ? (
                  <div className="space-y-4 w-full text-center">
                    <div className="inline-grid grid-cols-5 gap-1.5 p-2 bg-amber-50/50 border-2 border-emerald-400 rounded-2xl mx-auto">
                      {[
                        '🦊 (START)', '', '', '', '',
                        '', '🧱', '', '🧱', '',
                        '', '', '🧱', '', '',
                        '🧱', '', '', '', '🧱',
                        '', '', '', '', '💎 (GOAL)'
                      ].map((cell, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold border ${
                            cell.includes('START')
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                              : cell.includes('GOAL')
                              ? 'bg-orange-100 border-orange-400 text-orange-900'
                              : cell.includes('🧱')
                              ? 'bg-slate-200 border-slate-400 text-slate-600'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          {cell.split(' ')[0]}
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto text-center">
                      <span className="text-[9px] font-bold text-slate-400 block mb-1">
                        KODE NAVIGASI ARAH:
                      </span>
                      <div className="flex gap-1 items-center justify-center text-xs font-bold text-emerald-800">
                        {['→', '→', '↓', '↓', '→', '→', '↓'].map((arrow, i) => (
                          <span key={i} className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                            {arrow}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : category === 'counting' ? (
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    {[
                      { sym: '🍏 🍏 🍏', cnt: 3 },
                      { sym: '🎈 🎈 🎈 🎈', cnt: 4 },
                      { sym: '🚗 🚗', cnt: 2 },
                      { sym: '⭐ ⭐ ⭐ ⭐ ⭐', cnt: 5 }
                    ].slice(0, Math.min(itemCount, 4)).map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="tracking-widest">{item.sym}</span>
                        <span className="w-6 h-6 rounded-full border border-dashed border-emerald-600 flex items-center justify-center text-[10px] text-slate-400">
                          ?
                        </span>
                      </div>
                    ))}
                  </div>
                ) : category === 'matching' ? (
                  <div className="flex items-center justify-between w-full px-4 text-[11px] font-bold">
                    <div className="space-y-4 text-left">
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🐱 Kucing</div>
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🐰 Kelinci</div>
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🐵 Monyet</div>
                    </div>
                    <div className="text-slate-300 text-lg">· · · · ·</div>
                    <div className="space-y-4 text-right">
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🍌 Pisang</div>
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🐟 Ikan</div>
                      <div className="p-1.5 bg-slate-50 rounded border border-slate-200">🥕 Wortel</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 space-y-3">
                    <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 mx-auto flex items-center justify-center text-3xl">
                      📝
                    </div>
                    <span className="text-xs font-bold text-slate-800">Aktivitas {subCategory}</span>
                    <span className="text-[10px] text-slate-400 block max-w-xs mx-auto italic">
                      Draf visualisasi lembar kerja bertema {resolvedTheme} ramah anak usia {ageGrade.split(' ')[0]}.
                    </span>
                  </div>
                )}
              </div>

              {/* Safe margin bottom print footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[9px] text-slate-400 font-medium">
                <span>EduSmart Worksheet Studio</span>
                <span>Ukuran: A4 Portrait (300 DPI)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil Cetakan</span>
            </button>
            <button
              onClick={handleGeneratePrompt}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Salin Prompt AI</span>
            </button>
          </div>
        </div>
      )}

      {/* Prompt Modal */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Prompt AI Worksheet Studio"
        subtitle="Salin prompt teruji di bawah ini untuk digunakan pada AI Image Generator (Midjourney, DALL-E, atau Canva AI)"
        promptContent={promptText}
      />
    </div>
  );
};
