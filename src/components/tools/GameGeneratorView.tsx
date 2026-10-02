import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Layers, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  CheckCircle2,
  Wand2,
  Sliders,
  FileCode2,
  HelpCircle,
  Trophy,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { GameFormatType, VisualStyleType } from '../../types';
import { PromptModal } from '../common/PromptModal';
import { POPULAR_TOPICS } from '../../data/initialData';

export const GameGeneratorView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'wizard' | 'form' | 'play'>('wizard');

  // ==========================================
  // 1. WIZARD STATE (9 STEPS)
  // ==========================================
  const [wStep, setWStep] = useState<number>(1);
  const [wTopic, setWTopic] = useState('Matematika (Berhitung, Mengenal Angka & Bentuk, Perbandingan, Pola Sederhana)');
  const [wFormat, setWFormat] = useState<GameFormatType>('pilihan-ganda');
  const [wAgeGroup, setWAgeGroup] = useState('4–6 tahun (PAUD/TK)');
  const [wQuestionCount, setWQuestionCount] = useState<number>(6);
  const [wLayout, setWLayout] = useState<'Landscape (1920x1080)' | 'Portrait (1080x1920)'>('Landscape (1920x1080)');
  const [wVisualStyle, setWVisualStyle] = useState<VisualStyleType>('3D Pixar Style');
  const [wLanguage, setWLanguage] = useState<'Bahasa Indonesia' | 'English' | 'Dwibahasa (Bilingual)'>('Bahasa Indonesia');
  const [wMascotOption, setWMascotOption] = useState<'ai' | 'describe' | 'upload' | 'none'>('ai');
  const [wMascotDesc, setWMascotDesc] = useState('Owi, seekor burung hantu kecil yang memakai kacamata bundar besar, berwarna pastel cerah, tersenyum ramah');
  
  // Prompt Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedPromptText, setGeneratedPromptText] = useState('');
  const [generatedPromptSections, setGeneratedPromptSections] = useState<any[]>([]);
  const [modalTitle, setModalTitle] = useState('');

  // ==========================================
  // 2. FORM STATE (ROEMAHDESAIN_CA)
  // ==========================================
  const [formGameTypes, setFormGameTypes] = useState<string[]>(['Kuis Pilihan Ganda', 'Matching']);
  const [formLanguage, setFormLanguage] = useState<string>('Indonesia');
  const [formTopic, setFormTopic] = useState<string>('Gaya Magnet IPAS Kelas 4 SD');
  const [formGrade, setFormGrade] = useState<string>('SD');
  const [formAge, setFormAge] = useState<string>('9-10 tahun');
  const [formQuestionCount, setFormQuestionCount] = useState<string>('10 Soal');
  const [formGoals, setFormGoals] = useState<string[]>(['Memahami', 'Menganalisis', 'Memecahkan Masalah']);
  const [formVisualStyle, setFormVisualStyle] = useState<string>('3D Felt Toys Pastel');
  const [formFeatures, setFormFeatures] = useState<string[]>(['Progress bar/level', 'Timer opsional', 'Suara & efek', 'Animasi feedback', 'Bintang/skor']);
  const [formCustomInstructions, setFormCustomInstructions] = useState<string>('Buatkan penjelasan feedback mengapa jawaban benar saat murid menjawab.');
  const [formTargetAi, setFormTargetAi] = useState<string>('Google AI Studio');

  // ==========================================
  // 3. PLAYABLE GAME STATE (Interactive Math)
  // ==========================================
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const demoQuestions = [
    {
      id: 1,
      title: 'Soal 1 (Berhitung)',
      question: 'Ada berapa apel di pohon?',
      illustrationEmoji: '🌳 🍎🍎🍎',
      desc: 'Owi menunjuk ke pohon dengan 3 apel merah besar.',
      options: ['2', '3', '4'],
      correct: '3',
      explanation: 'Benar sekali! Mari kita hitung: satu, dua, tiga! Ada 3 buah apel merah.'
    },
    {
      id: 2,
      title: 'Soal 2 (Mengenal Angka)',
      question: 'Manakah yang merupakan angka empat?',
      illustrationEmoji: '🦉 🔢 🟨',
      desc: 'Balok kayu berwarna biru (3), kuning (4), dan hijau (5).',
      options: ['3', '4', '5'],
      correct: '4',
      explanation: 'Hebat! Balok kuning menunjukkan angka 4 yang benar.'
    },
    {
      id: 3,
      title: 'Soal 3 (Mengenal Bentuk)',
      question: 'Benda apa yang bentuknya lingkaran?',
      illustrationEmoji: '📖 ⚽ 📐',
      desc: 'Owi membawa kaca pembesar melihat buku kotak, bola lingkaran, dan topi segitiga.',
      options: ['Buku Cerita (Kotak)', 'Bola Pantai (Lingkaran)', 'Topi Pesta (Segitiga)'],
      correct: 'Bola Pantai (Lingkaran)',
      explanation: 'Pintar! Bola pantai memiliki bentuk bundar lingkaran yang sempurna.'
    },
    {
      id: 4,
      title: 'Soal 4 (Mengenal Bentuk Kotak)',
      question: 'Manakah benda yang memiliki bentuk persegi atau kotak?',
      illustrationEmoji: '📦 🍕 🪙',
      desc: 'Ada kardus kado (kotak), sepotong pizza (segitiga), dan koin (lingkaran).',
      options: ['Kotak Kado Mainan', 'Potongan Pizza', 'Koin Emas'],
      correct: 'Kotak Kado Mainan',
      explanation: 'Keren! Kotak kado memiliki 4 sisi sama panjang berbentuk persegi.'
    },
    {
      id: 5,
      title: 'Soal 5 (Perbandingan Ukuran)',
      question: 'Manakah hewan yang berukuran paling besar?',
      illustrationEmoji: '🐜 🐱 🐘',
      desc: 'Ada semut kecil, kucing lucu, dan gajah besar bersahabat.',
      options: ['Semut Kecil', 'Kucing Belang', 'Gajah Ramah'],
      correct: 'Gajah Ramah',
      explanation: 'Tepat sekali! Gajah adalah hewan paling besar di antara ketiganya.'
    },
    {
      id: 6,
      title: 'Soal 6 (Pola Warna Sederhana)',
      question: 'Lanjutkan pola warna balok ini: Merah, Biru, Merah, ...?',
      illustrationEmoji: '🟥 🟦 🟥 ❓',
      desc: 'Balok tersusun berurutan merah dan biru.',
      options: ['Merah', 'Biru', 'Hijau'],
      correct: 'Biru',
      explanation: 'Luar biasa! Setelah merah selalu kembali ke balok biru.'
    }
  ];

  // Helper for generating full 9-step wizard prompts
  const handleGenerateWizardPrompt = () => {
    const sections = [
      {
        id: 'game-title',
        title: 'Halaman Judul (Layar Pembuka Game)',
        subtitle: `Teks judul "Bermain ${wTopic.split(' ')[0]} Bersama Owi!"`,
        content: `Ukuran: ${wLayout}
Framing: Wide shot, centered composition.
Header: Teks judul "Bermain ${wTopic.split(' ')[0]} Bersama Owi!". Clean printed/digital sans-serif font, clearly readable.
Content: Karakter Owi (${wMascotDesc}) sedang tersenyum ramah melambaikan sayapnya. Owi berdiri di atas padang rumput hijau yang lembut, dikelilingi oleh simbol-simbol edukasi 3D yang melayang dengan warna-warni ceria.
Footer/Navigasi: Sebuah tombol besar dan menarik di bagian bawah tengah dengan teks "MULAI".
Rendering Quality: ${wVisualStyle}, high quality 3D animation render, expressive and cute, smooth lighting, volumetric rendering, colorful and vibrant pastel tones, 8k resolution. Compose like a premium educational game screen: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at the canvas edge. All important elements arranged with clean visual hierarchy from top to bottom.`
      },
      {
        id: 'game-q1',
        title: 'Halaman Soal 1: Berhitung Apel di Pohon',
        subtitle: 'Pertanyaan: "Ada berapa apel di pohon?"',
        content: `Ukuran: ${wLayout}
Framing: Eye-level shot, split layout (kiri untuk ilustrasi, kanan untuk teks/opsi).
Header: Teks pertanyaan "Ada berapa apel di pohon?". Clean printed/digital sans-serif font, clearly readable.
Content: Di sebelah kiri, Owi si maskot sedang menunjuk ke arah sebuah pohon kecil yang lucu. Di ranting pohon tersebut, terdapat tepat 3 (tiga) buah apel merah yang besar dan berkilau. Background langit biru cerah dengan awan putih lembut.
Footer/Navigasi: Di sebelah kanan atau bawah, terdapat 3 kotak pilihan jawaban yang sejajar rapi: [Kotak 1: "2"], [Kotak 2: "3"], [Kotak 3: "4"]. Opsi benar dan distraktor memiliki perlakuan visual setara tanpa highlight/glow/check. Di sudut kiri atas terdapat tombol panah "KEMBALI".
Rendering Quality: ${wVisualStyle}, 8k resolution, print-ready, high readability, safe margins.`
      },
      {
        id: 'game-q2',
        title: 'Halaman Soal 2: Mengenal Angka Empat (4)',
        subtitle: 'Pertanyaan: "Manakah yang merupakan angka empat?"',
        content: `Ukuran: ${wLayout}
Framing: Eye-level shot, clear and focused view.
Header: Teks pertanyaan "Manakah yang merupakan angka empat?". Clean printed/digital sans-serif font, clearly readable.
Content: Maskot Owi sedang berdiri di tengah ruangan bermain, melihat ke arah tiga buah balok kayu raksasa yang berwarna-warni cerah.
Footer/Navigasi: Tiga pilihan jawaban berupa gambar balok berjajar rapi: Pilihan 1: Balok berwarna biru dengan angka "3". Pilihan 2: Balok berwarna kuning dengan angka "4". Pilihan 3: Balok berwarna hijau dengan angka "5". Di sudut kiri atas terdapat tombol panah "KEMBALI".
Rendering Quality: ${wVisualStyle}, volumetric rendering, colorful and vibrant pastel tones, 8k resolution.`
      },
      {
        id: 'game-q3',
        title: 'Halaman Soal 3: Mengenal Bentuk Lingkaran',
        subtitle: 'Pertanyaan: "Benda apa yang bentuknya lingkaran?"',
        content: `Ukuran: ${wLayout}
Framing: Medium close-up, split layout.
Header: Teks pertanyaan "Benda apa yang bentuknya lingkaran?". Clean printed/digital sans-serif font, clearly readable.
Content: Maskot Owi sedang memegang sebuah kaca pembesar mainan besar, menatap penasaran ke arah meja kayu kecil tempat barang-barang diletakkan.
Footer/Navigasi: Tiga pilihan jawaban bergambar: Buku cerita (kotak), Bola pantai (lingkaran), Topi ulang tahun (segitiga).
Rendering Quality: ${wVisualStyle}, high quality render, clean visual hierarchy, generous whitespace.`
      },
      {
        id: 'game-q4',
        title: 'Halaman Soal 4: Mengenal Bentuk Persegi / Kotak',
        subtitle: 'Pertanyaan: "Manakah benda yang memiliki bentuk kotak atau persegi?"',
        content: `Ukuran: ${wLayout}
Framing: Centered educational play area.
Header: Teks pertanyaan "Manakah benda yang memiliki bentuk kotak atau persegi?".
Content: Maskot Owi tersenyum menunjukkan beberapa kotak mainan warna-warni di atas karpet bermain.
Footer/Navigasi: 3 Kotak pilihan respons bergambar: Kotak kado, pizza segitiga, dan piring bundar.
Rendering Quality: ${wVisualStyle}, child-friendly, balanced composition.`
      },
      {
        id: 'game-q5',
        title: 'Halaman Soal 5: Perbandingan Ukuran',
        subtitle: 'Pertanyaan: "Hewan mana yang ukurannya paling besar?"',
        content: `Ukuran: ${wLayout}
Framing: Wide eye-level comparison.
Header: Teks pertanyaan "Hewan mana yang ukurannya paling besar?".
Content: Tiga hewan lucu berjajar ramah: Semut kecil, Kucing belang, dan Gajah ramah.
Footer/Navigasi: Kotak pilihan jawaban dengan tombol konfirmasi ramah anak.
Rendering Quality: ${wVisualStyle}, expressive and cute, smooth lighting.`
      },
      {
        id: 'game-q6',
        title: 'Halaman Soal 6: Pola Warna Sederhana',
        subtitle: 'Pertanyaan: "Lengkapi pola balok: Merah - Biru - Merah - ...?"',
        content: `Ukuran: ${wLayout}
Framing: Sequence bar layout.
Header: Teks pertanyaan "Lengkapi pola balok: Merah - Biru - Merah - ...?".
Content: Deretan balok berwarna merah dan biru dengan satu ruang kosong bercahaya lembut bertanda tanya di akhir baris.
Footer/Navigasi: Kotak pilihan warna: Merah, Biru, Hijau.
Rendering Quality: ${wVisualStyle}, clean edges, high readability.`
      },
      {
        id: 'game-closing',
        title: 'Halaman Penutup: Perayaan Juara Bintang',
        subtitle: 'Layar ucapan selamat & tombol Main Lagi',
        content: `Ukuran: ${wLayout}
Framing: Celebration grand view, centered.
Header: Teks ucapan "Selamat! Kamu Anak Hebat & Pintar!".
Content: Karakter Owi sedang melompat riang membawa piala bintang emas berkilau, dikelilingi balon warna-warni pastel dan pita gembira.
Footer/Navigasi: Tombol besar bercahaya "MAIN LAGI" di tengah bawah.
Rendering Quality: ${wVisualStyle}, celebration lighting, 8k resolution.`
      }
    ];

    setGeneratedPromptSections(sections);

    let promptOutput = `RINGKASAN KONSEP GAME EDUKASI\n==================================================\nTopik : ${wTopic}\nJenis Game : ${wFormat === 'pilihan-ganda' ? 'Game Pilihan Ganda' : wFormat === 'petualangan' ? 'Game Petualangan' : 'Game dengan Cerita'}\nStruktur : 1 Halaman Judul, ${wQuestionCount} Halaman Soal, 1 Halaman Penutup\nTarget Usia : ${wAgeGroup}\nLayout : ${wLayout}\nGaya Visual : ${wVisualStyle}\nBahasa Narasi : ${wLanguage}\nMaskot : ${wMascotOption === 'ai' ? wMascotDesc : wMascotOption === 'none' ? 'Tanpa Maskot' : wMascotDesc}\n\n`;
    sections.forEach(s => {
      promptOutput += `==================================================\n${s.title}\n==================================================\n${s.content}\n\n`;
    });

    setGeneratedPromptText(promptOutput);
    setModalTitle('Prompt Game Edukasi');
    setModalOpen(true);
  };

  // Helper for generating ROEMAHDESAIN_CA structured form prompt
  const handleGenerateFormPrompt = () => {
    const promptOutput = `==================================================
AI EDUCATIONAL GAME GENERATOR SPECIFICATION
Source System: ROEMAHDESAIN_CA / EduSmart Creator Lab
Target AI Builder: ${formTargetAi}
==================================================

A. SPESIFIKASI UTAMA
- Platform Target   : Web Application (Responsive Desktop & Mobile First)
- Jenis Game        : ${formGameTypes.join(', ')}
- Bahasa Pengantar  : Bahasa ${formLanguage}
- Topik / Materi    : ${formTopic}
- Jenjang Peserta   : ${formGrade} (${formAge})
- Jumlah Tantangan  : ${formQuestionCount}

B. ALUR GAMEPLAY & INTERAKSI
1. Layar Beranda: Menampilkan judul materi edukatif, tombol Mulai besar, dan maskot visual.
2. Mode Permainan: Setiap soal menyajikan instruksi yang ringkas, ilustrasi bergaya visual terpilih, dan opsi jawaban yang seimbang.
3. Respon Interaktif: Suara feedback saat benar/salah, animasi gemintang, dan indikator kemajuan (progress bar).
4. Layar Hasil Akhir: Rekapitulasi bintang, skor nilai, pesan penyemangat anak, serta tombol "Main Lagi".

E. TUJUAN PEDAGOGIS (TAXONOMY BLOOM)
- Aspek yang diasah: ${formGoals.join(', ')}
- Menghadirkan pengalaman belajar bermakna tanpa beban stres pada anak.
- Mengadopsi prinsip scaffolding: dari pengenalan konsep dasar hingga aplikasi mandiri.

F. FITUR TERPILIH & DESAIN SISTEM
- Gaya Visual           : ${formVisualStyle}
- Fitur Game Aktif      : ${formFeatures.join(', ')}
- Instruksi Khusus Guru : ${formCustomInstructions}
- Aturan Grafis         : Sudut membulat lembut (rounded-2xl/3xl), warna pastel ramah anak, tipografi bersih sans-serif, tanpa watermark dan tanpa elemen terpotong.

G. ARSITEKTUR KODE / PROMPT IMPLEMENTASI
Harap susun kode game interaktif (Single-File HTML/CSS/JS atau React Component) yang siap dijalankan langsung di ${formTargetAi} dengan logika permainan yang solid, sound effects sintetis Web Audio API, dan state management responsif.`;

    setGeneratedPromptText(promptOutput);
    setModalTitle('Prompt Terstruktur AI Educational Game');
    setModalOpen(true);
  };

  // Playable interactive functions
  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(opt);
    setIsAnswerChecked(true);

    const isCorrect = opt.startsWith(demoQuestions[currentPlayIndex].correct) || opt === demoQuestions[currentPlayIndex].correct;
    if (isCorrect) {
      setScore(prev => prev + 100);
    }
  };

  const handleNextPlayQuestion = () => {
    if (currentPlayIndex < demoQuestions.length - 1) {
      setCurrentPlayIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setGameFinished(true);
    }
  };

  const handleRestartPlayGame = () => {
    setCurrentPlayIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setGameFinished(false);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Studio Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 lg:p-6 bg-white rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduSmart Game Studio · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            AI Educational Game Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pilih metode pembuatan: Panduan Wizard 9-Langkah, Formulir Cepat Builder, atau Uji Coba Game Interaktif.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-amber-50 rounded-2xl border border-amber-200/50 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('wizard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeMode === 'wizard'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Wizard 9-Step</span>
          </button>
          <button
            onClick={() => setActiveMode('form')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeMode === 'form'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Form Builder</span>
          </button>
          <button
            onClick={() => setActiveMode('play')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeMode === 'play'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Mainkan Demo</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: 9-STEP INTERACTIVE WIZARD */}
      {/* ======================================================== */}
      {activeMode === 'wizard' && (
        <div className="bg-white rounded-3xl border border-amber-100 shadow-xs overflow-hidden">
          {/* Wizard Step Indicator Bar */}
          <div className="px-6 py-4 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((stepNum) => (
                <button
                  key={stepNum}
                  onClick={() => setWStep(stepNum)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    wStep === stepNum
                      ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300 ring-offset-1'
                      : wStep > stepNum
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {stepNum}
                </button>
              ))}
            </div>
            <div className="text-xs font-semibold text-amber-800 ml-4 shrink-0">
              Langkah {wStep} dari 9
            </div>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* STEP 1: Topik Materi */}
            {wStep === 1 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 1: Judul atau Topik Game
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Kira-kira, apa topik materi yang ingin kamu jadikan game edukasi kali ini?
                </h3>
                <p className="text-xs text-slate-500">
                  Kamu bisa langsung mengetikkan topik materi, atau memilih salah satu tema rekomendasi guru di bawah ini:
                </p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={wTopic}
                    onChange={(e) => setWTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:outline-hidden text-sm"
                    placeholder="Contoh: Matematika Berhitung & Mengenal Bentuk..."
                  />

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs text-slate-400 py-1">Topik Cepat:</span>
                    {POPULAR_TOPICS.slice(0, 5).map((topic, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setWTopic(topic)}
                        className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-lg transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Format Game */}
            {wStep === 2 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 2: Jenis Game
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih format game yang ingin digunakan:
                </h3>
                <p className="text-xs text-slate-500">
                  Ada tiga pilihan format game sesuai panduan resmi:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'pilihan-ganda',
                      title: 'Game Pilihan Ganda',
                      desc: 'Fokus kuis tebak-tebakan langsung (default 6–10 soal cepat)',
                      badge: 'Direkomendasikan'
                    },
                    {
                      id: 'petualangan',
                      title: 'Game Petualangan',
                      desc: 'Pemain menyelesaikan misi 3 tema babak, masing-masing 5 soal',
                      badge: 'Eksplorasi'
                    },
                    {
                      id: 'cerita',
                      title: 'Game dengan Cerita',
                      desc: '5 babak cerita pendek bersambung diikuti pertanyaan cerita',
                      badge: 'Storytelling'
                    }
                  ].map((fmt) => (
                    <div
                      key={fmt.id}
                      onClick={() => setWFormat(fmt.id as GameFormatType)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        wFormat === fmt.id
                          ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-700">{fmt.badge}</span>
                        {wFormat === fmt.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{fmt.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{fmt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Target Usia */}
            {wStep === 3 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 3: Target Usia
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Siapa target usia pemain game edukasi ini?
                </h3>
                <p className="text-xs text-slate-500">
                  Mengetahui usia sangat penting untuk menyesuaikan kesulitan soal, gaya bahasa narasi, dan visual grafis.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    '4–6 tahun (PAUD/TK)',
                    '7–9 tahun (SD Kelas Rendah)',
                    '10–12 tahun (SD Kelas Tinggi)',
                    '13–15 tahun (SMP)',
                    '16–18 tahun (SMA/SMK)',
                    '18+ / Umum'
                  ].map((age) => (
                    <button
                      key={age}
                      onClick={() => setWAgeGroup(age)}
                      className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                        wAgeGroup === age
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Struktur Halaman */}
            {wStep === 4 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 4: Struktur Halaman & Jumlah Soal
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Susunan Halaman Game Edukasi
                </h3>
                <p className="text-xs text-slate-500">
                  Untuk anak usia 4–6 tahun, format 6 soal sangat pas agar anak tidak lelah. Kamu juga bisa memilih 10 soal.
                </p>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-700">Jumlah Soal:</span>
                  <div className="flex items-center gap-2">
                    {[6, 8, 10].map(cnt => (
                      <button
                        key={cnt}
                        onClick={() => setWQuestionCount(cnt)}
                        className={`px-3 py-1 text-xs rounded-lg font-semibold ${
                          wQuestionCount === cnt
                            ? 'bg-amber-500 text-white'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {cnt} Soal {cnt === 6 && '(Rekomendasi PAUD)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200 text-xs space-y-2">
                  <div className="font-bold text-amber-900">Daftar Struktur Halaman yang Digenerate:</div>
                  <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                    <li><strong>Halaman Judul:</strong> Layar pembuka & tombol Mulai</li>
                    <li><strong>Soal 1 (Berhitung):</strong> Menghitung jumlah benda (misal 3 buah apel di pohon)</li>
                    <li><strong>Soal 2 (Mengenal Angka):</strong> Identifikasi bentuk angka tertentu (angka 4)</li>
                    <li><strong>Soal 3 (Mengenal Bentuk):</strong> Mencari benda bentuk lingkaran</li>
                    <li><strong>Soal 4 (Bentuk Persegi):</strong> Mencari benda bentuk kotak</li>
                    <li><strong>Soal 5 (Perbandingan):</strong> Memilih hewan ukuran paling besar</li>
                    <li><strong>Soal 6 (Pola Sederhana):</strong> Melengkapi pola warna balok merah-biru</li>
                    <li><strong>Halaman Penutup:</strong> Layar ucapan selamat & piala bintang</li>
                  </ul>
                </div>
              </div>
            )}

            {/* STEP 5: Layout (Orientasi Layar) */}
            {wStep === 5 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 5: Layout (Orientasi Layar)
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih orientasi layar tampilan game:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'Landscape (1920x1080)',
                      title: 'Landscape (1920 x 1080 px)',
                      desc: 'Ideal untuk layar lebar, tablet kelas, laptop atau smart board interaktif.',
                      ratio: '16:9 Lebar'
                    },
                    {
                      id: 'Portrait (1080x1920)',
                      title: 'Portrait (1080 x 1920 px)',
                      desc: 'Sangat pas untuk mobile-first experience atau konten reel edukasi vertikal.',
                      ratio: '9:16 Vertikal'
                    }
                  ].map((ly) => (
                    <div
                      key={ly.id}
                      onClick={() => setWLayout(ly.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        wLayout === ly.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-amber-700">{ly.ratio}</span>
                        {wLayout === ly.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{ly.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{ly.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Gaya Visual */}
            {wStep === 6 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 6: Gaya Visual (Visual Style)
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih dari 11 gaya ilustrasi resmi:
                </h3>
                <p className="text-xs text-slate-500">
                  Tips: Untuk anak usia 4–6 tahun, gaya 3D Pixar Style atau 3D Soft Clay Pastel sangat disukai karena lembut dan ceria.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1">
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
                    '2d cartoon'
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => setWVisualStyle(style as VisualStyleType)}
                      className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                        wVisualStyle === style
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Bahasa Narasi */}
            {wStep === 7 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 7: Bahasa Narasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih bahasa instruksi dan teks di dalam game:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Bahasa Indonesia', flag: '🇮🇩', desc: 'Seluruh teks narasi, soal, dan feedback berbahasa Indonesia' },
                    { id: 'English', flag: '🇬🇧', desc: 'All gameplay text, questions and feedback in English' },
                    { id: 'Dwibahasa (Bilingual)', flag: '🌐', desc: 'Kombinasi Indonesia & English untuk pembelajaran bilingual' }
                  ].map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => setWLanguage(lang.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        wLanguage === lang.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{lang.flag}</div>
                      <h4 className="text-sm font-bold text-slate-900">{lang.id}</h4>
                      <p className="text-xs text-slate-500 mt-1">{lang.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Karakter Maskot */}
            {wStep === 8 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">
                  STEP 8: Karakter Maskot
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tentukan karakter pemandu game:
                </h3>
                <p className="text-xs text-slate-500">
                  Adanya maskot bikin game edukasi lebih hidup dan bersahabat bagi anak.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'ai',
                      title: 'Biarkan AI Merancang (Owi Burung Hantu)',
                      desc: 'Owi, seekor burung hantu kecil berkacamata bundar pastel ceria yang tersenyum ramah memandu permainan.'
                    },
                    {
                      id: 'describe',
                      title: 'Deskripsikan Sendiri',
                      desc: 'Ketikkan deskripsi wujud maskot yang kamu inginkan (misal kelinci cerdik berbaju astronot).'
                    },
                    {
                      id: 'upload',
                      title: 'Upload Gambar Referensi',
                      desc: 'Gunakan karakter yang sudah kamu miliki untuk menjaga konsistensi visual.'
                    },
                    {
                      id: 'none',
                      title: 'Tanpa Maskot',
                      desc: 'Fokus hanya pada objek materi dan soal kuis.'
                    }
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setWMascotOption(m.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        wMascotOption === m.id
                          ? 'border-amber-500 bg-amber-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                        {wMascotOption === m.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                      </div>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {wMascotOption === 'describe' && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Deskripsi Maskot Pemandu:
                    </label>
                    <textarea
                      value={wMascotDesc}
                      onChange={(e) => setWMascotDesc(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      placeholder="Ceritakan wujud maskot..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 9: Konfirmasi & Generate */}
            {wStep === 9 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  STEP 9: Konfirmasi Rancangan Game
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Ringkasan Konsep Game Edukasi
                </h3>
                <p className="text-xs text-slate-500">
                  Semua detail konfigurasi telah lengkap. Klik tombol di bawah untuk menghasilkan susunan prompt gambar dan teks game lengkap!
                </p>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Topik:</span>
                    <span className="font-bold text-slate-800 text-right">{wTopic}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Jenis Game:</span>
                    <span className="font-bold text-slate-800">{wFormat}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Struktur:</span>
                    <span className="font-bold text-slate-800">1 Halaman Judul, {wQuestionCount} Soal, 1 Halaman Penutup</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Target Usia:</span>
                    <span className="font-bold text-slate-800">{wAgeGroup}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Layout:</span>
                    <span className="font-bold text-slate-800">{wLayout}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Gaya Visual:</span>
                    <span className="font-bold text-slate-800">{wVisualStyle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Bahasa:</span>
                    <span className="font-bold text-slate-800">{wLanguage}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Maskot:</span>
                    <span className="font-bold text-slate-800 truncate max-w-xs">{wMascotDesc}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleGenerateWizardPrompt}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>✨ Generate Prompt Lengkap Per Halaman</span>
                  </button>
                  <button
                    onClick={() => setActiveMode('play')}
                    className="flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition-all"
                  >
                    <Play className="w-4 h-4" />
                    <span>Mainkan Demo Game Ini</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={wStep === 1}
                onClick={() => setWStep(prev => Math.max(1, prev - 1))}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  wStep === 1
                    ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {wStep < 9 ? (
                <button
                  onClick={() => setWStep(prev => Math.min(9, prev + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-xs transition-all"
                >
                  <span>Lanjut ke Step {wStep + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleGenerateWizardPrompt}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lihat Seluruh Prompt</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: FORM PROMPTER (ROEMAHDESAIN_CA SPECIFICATION) */}
      {/* ======================================================== */}
      {activeMode === 'form' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header & Hero Card */}
          <div className="bg-amber-50/70 p-6 lg:p-8 rounded-3xl border border-amber-200/60 shadow-xs text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-amber-800 uppercase bg-amber-200/70 px-2 py-0.5 rounded-md">
                ROEMAHDESAIN_CA
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                · AI EDUCATIONAL GAME GENERATOR
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-heading">
              Buat Kuis & Game Edukasi Jadi Mudah! 🎮✨
            </h1>
            <p className="text-xs lg:text-sm text-slate-600 max-w-xl mx-auto">
              Konfigurasikan preferensi materi, jenjang usia, tujuan pedagogis, serta gaya visual untuk menghasilkan prompt terstruktur siap pakai.
            </p>
          </div>

          {/* Section 1: Jenis Game & Bahasa */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">
                1. Jenis Game & Bahasa Pengantar
              </h3>
              <span className="text-[11px] text-slate-400">Pilih satu atau lebih</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Format Permainan (Centang format yang ingin dipadukan):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Kuis Pilihan Ganda', 'Matching', 'Drag & Drop', 'Benar/Salah',
                  'Balloon Pop', 'Catch Game', 'Word Search', 'Puzzle Gambar',
                  'Teka-Teki Silang', 'Sorting Game', 'Cerita Petualangan', 'Ular Tangga Edukasi',
                  'Mystery Box', 'Susun Huruf', 'Battle Quiz', 'Smart Race'
                ].map((type) => {
                  const checked = formGameTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        checked
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormGameTypes([...formGameTypes, type]);
                          } else {
                            setFormGameTypes(formGameTypes.filter(t => t !== type));
                          }
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                      />
                      <span className="truncate">{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Bahasa Pengantar:
              </label>
              <div className="flex items-center gap-3">
                {['Indonesia', 'English', 'Bilingual'].map((lang) => (
                  <label key={lang} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="formLanguage"
                      value={lang}
                      checked={formLanguage === lang}
                      onChange={(e) => setFormLanguage(e.target.value)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Materi / Tema Pembelajaran */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Materi / Tema Pembelajaran
            </h3>

            <div>
              <span className="text-xs text-slate-500 mb-1.5 block">Materi Populer Cepat:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Gaya Magnet IPAS Kelas 4',
                  'Hitung 1-10 PAUD',
                  'Siklus Air Kelas 5 SD',
                  'Hewan Laut Bahasa Inggris',
                  'Tata Surya SD',
                  'Pecahan Matematika'
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setFormTopic(chip)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded-lg transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Ketikkan Topik / Materi Spesifik:
              </label>
              <input
                type="text"
                value={formTopic}
                onChange={(e) => setFormTopic(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                placeholder="Contoh: Gaya Magnet IPAS Kelas 4 SD..."
              />
            </div>
          </div>

          {/* Section 3: Peserta Didik & Tujuan Pembelajaran */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. Peserta Didik & Tujuan Pembelajaran
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jenjang:</label>
                <select
                  value={formGrade}
                  onChange={(e) => setFormGrade(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
                >
                  <option value="PAUD/TK">PAUD / TK</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Usia Anak:</label>
                <input
                  type="text"
                  value={formAge}
                  onChange={(e) => setFormAge(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
                  placeholder="Contoh: 9-10 tahun"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jumlah Soal:</label>
                <select
                  value={formQuestionCount}
                  onChange={(e) => setFormQuestionCount(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
                >
                  <option value="5 Soal">5 Soal</option>
                  <option value="6 Soal">6 Soal (Rekomendasi Anak)</option>
                  <option value="8 Soal">8 Soal</option>
                  <option value="10 Soal">10 Soal</option>
                  <option value="15 Soal">15 Soal</option>
                  <option value="20 Soal">20 Soal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Tujuan Pembelajaran (Taksonomi Bloom):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Mengingat',
                  'Memahami',
                  'Menerapkan',
                  'Menganalisis',
                  'Memecahkan Masalah',
                  'Literasi & Numerasi'
                ].map((goal) => {
                  const checked = formGoals.includes(goal);
                  return (
                    <label
                      key={goal}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${
                        checked ? 'border-amber-500 bg-amber-50 font-medium' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) setFormGoals([...formGoals, goal]);
                          else setFormGoals(formGoals.filter(g => g !== goal));
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                      />
                      <span>{goal}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Gaya Visual & Fitur Game */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Gaya Visual & Pengalaman Bermain
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Pilih Gaya Visual:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: '3D Felt Toys Pastel', emoji: '🧸' },
                  { id: '3D Pixar Style', emoji: '🎬' },
                  { id: 'Cute Cartoon', emoji: '🎨' },
                  { id: 'Flat Illustration', emoji: '📐' },
                  { id: 'Nature Kids', emoji: '🌿' },
                  { id: 'Space Adventure', emoji: '🚀' }
                ].map((style) => (
                  <label
                    key={style.id}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer ${
                      formVisualStyle === style.id
                        ? 'border-amber-500 bg-amber-50 font-bold text-amber-900'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="formVisualStyle"
                      value={style.id}
                      checked={formVisualStyle === style.id}
                      onChange={(e) => setFormVisualStyle(e.target.value)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>{style.emoji} {style.id}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Fitur Game Aktif:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Progress bar/level',
                  'Timer opsional',
                  'Suara & efek',
                  'Animasi feedback',
                  'Bintang/skor'
                ].map((feat) => {
                  const checked = formFeatures.includes(feat);
                  return (
                    <label
                      key={feat}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer ${
                        checked ? 'border-amber-500 bg-amber-50 font-medium' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) setFormFeatures([...formFeatures, feat]);
                          else setFormFeatures(formFeatures.filter(f => f !== feat));
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                      />
                      <span>{feat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 5: Instruksi Khusus & Target AI */}
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              5. Instruksi Khusus & Target AI Builder
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Instruksi Manual Tambahan (Opsional):
              </label>
              <textarea
                value={formCustomInstructions}
                onChange={(e) => setFormCustomInstructions(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                placeholder="Catatan tambahan untuk AI builder..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Target AI Builder Platform:
              </label>
              <div className="flex flex-wrap gap-3">
                {['Google AI Studio', 'Gemini', 'Lovable', 'Claude', 'Canva', 'Lainnya'].map((target) => (
                  <label key={target} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="formTargetAi"
                      value={target}
                      checked={formTargetAi === target}
                      onChange={(e) => setFormTargetAi(e.target.value)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>{target}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar for Mobile / Floating Desktop */}
          <div className="sticky bottom-4 z-20 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-600 pl-2 hidden sm:block">
              Siap membuat prompt game edukasi terstruktur
            </div>
            <button
              onClick={handleGenerateFormPrompt}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Generate Prompt</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: PLAYABLE INTERACTIVE MATH GAME DEMO */}
      {/* ======================================================== */}
      {activeMode === 'play' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-amber-200 shadow-lg overflow-hidden animate-in fade-in">
          {/* Game Header Bar */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🦉</span>
              <div>
                <h3 className="text-sm font-bold leading-tight">Bermain Matematika Bersama Owi</h3>
                <p className="text-[11px] text-amber-100">PAUD / TK Usia 4–6 Tahun</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-xs rounded-xl text-xs font-bold">
                ⭐ Skor: {score}
              </div>
              <button
                onClick={handleRestartPlayGame}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Mulai Ulang"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!gameFinished ? (
            <div className="p-6 space-y-6">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>{demoQuestions[currentPlayIndex].title}</span>
                  <span>{currentPlayIndex + 1} dari {demoQuestions.length}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentPlayIndex + 1) / demoQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Central Illustration Area */}
              <div className="p-6 bg-gradient-to-b from-sky-50 to-amber-50/40 rounded-3xl border border-amber-100 text-center space-y-3">
                <div className="text-5xl py-2 tracking-widest animate-bounce">
                  {demoQuestions[currentPlayIndex].illustrationEmoji}
                </div>
                <h4 className="text-lg font-bold text-slate-800 font-heading">
                  "{demoQuestions[currentPlayIndex].question}"
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {demoQuestions[currentPlayIndex].desc}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Jawaban yang Tepat:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {demoQuestions[currentPlayIndex].options.map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt.startsWith(demoQuestions[currentPlayIndex].correct) || opt === demoQuestions[currentPlayIndex].correct;
                    
                    let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';
                    if (isAnswerChecked) {
                      if (isSelected) {
                        btnStyle = isCorrect 
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                          : 'bg-rose-500 text-white border-rose-600 shadow-md';
                      } else if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isAnswerChecked}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-4 rounded-2xl border text-sm font-semibold transition-all text-center ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation & Next */}
              {isAnswerChecked && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-3 animate-in fade-in">
                  <p className="text-slate-800 font-medium leading-relaxed">
                    💡 {demoQuestions[currentPlayIndex].explanation}
                  </p>
                  <button
                    onClick={handleNextPlayQuestion}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <span>{currentPlayIndex === demoQuestions.length - 1 ? 'Lihat Hasil Akhir' : 'Lanjut ke Soal Berikutnya'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Celebration Screen */
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl shadow-inner">
                🏆
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  Hore! Kamu Menyelesaikan Permainan!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Owi sangat bangga dengan kecerdasan dan ketelitianmu bermain matematika!
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 inline-block text-center px-8">
                <span className="text-xs text-slate-500 block">Total Skor Kamu:</span>
                <span className="text-3xl font-extrabold text-amber-700 font-mono">{score} Poin</span>
                <div className="flex justify-center gap-1 mt-1 text-amber-500 text-lg">
                  ⭐⭐⭐
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestartPlayGame}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  🔄 Main Lagi
                </button>
                <button
                  onClick={handleGenerateWizardPrompt}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all"
                >
                  📋 Ekspor Prompt Game Ini
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full-Screen Prompt Output Modal */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subtitle="Prompt siap pakai yang sudah dirangkai berdasarkan spesifikasi wizard & form"
        promptContent={generatedPromptText}
        promptSections={generatedPromptSections}
      />
    </div>
  );
};
