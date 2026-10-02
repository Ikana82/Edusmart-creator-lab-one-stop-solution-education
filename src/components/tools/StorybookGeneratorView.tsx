import React, { useState } from 'react';
import { 
  BookMarked, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  Check, 
  BookOpen, 
  Eye, 
  Download,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const StorybookGeneratorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'reader'>('wizard');
  
  // 7-Step Wizard state (Empty by default as requested so user is not confused by Rara)
  const [step, setStep] = useState<number>(1);
  const [theme, setTheme] = useState('');
  const [charName, setCharName] = useState('');
  const [charDesc, setCharDesc] = useState('');
  const [charOption, setCharOption] = useState<'ai' | 'describe' | 'upload'>('ai');
  const [ageGroup, setAgeGroup] = useState('5–6 tahun (Alur ringan, 8–15 kata per halaman)');
  const [pageCount, setPageCount] = useState<number>(12);
  const [layout, setLayout] = useState('Landscape (A4 Landscape, print-ready)');
  const [visualStyle, setVisualStyle] = useState('Kawaii Anime Chibi');
  const [language, setLanguage] = useState('Bahasa Indonesia');

  // Reader mode state (Page 0 = Cover depan, 1-12 = isi, 13 = Cover belakang)
  const [currentReaderPage, setCurrentReaderPage] = useState<number>(0);

  // Prompt modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [promptContent, setPromptContent] = useState('');
  const [promptSections, setPromptSections] = useState<any[]>([]);

  // Resolve actual display values with solid fallback defaults when fields are left blank
  const resolvedCharName = charName.trim() || 'Kimi';
  const resolvedTheme = theme.trim() || 'Persahabatan dan belajar berbagi di sekolah baru';
  const resolvedCharDesc = charDesc.trim() || 'Anak perempuan berumur 5 tahun yang periang, bermata bulat besar, berambut dikuncir dua yang lucu, memakai pakaian anak-anak ceria bergaya pastel';

  // Sample story pages dynamically substituting resolvedCharName
  const storyPages = [
    {
      page: 1,
      text: `Hari ini hari pertama ${resolvedCharName} masuk taman kanak-kanak.`,
      wordCount: 9,
      scene: `${resolvedCharName} berdiri di depan gerbang TK baru yang penuh warna pastel, memegang tas ranselnya dengan mata berbinar penasaran.`,
      bg: 'from-pink-50 to-amber-50'
    },
    {
      page: 2,
      text: `Kelas baru ${resolvedCharName} sangat ramai dan penuh mainan.`,
      wordCount: 9,
      scene: `${resolvedCharName} mengintip ke dalam kelas yang luas, anak-anak chibi lain sedang bermain gembira di atas karpet berwarna pastel.`,
      bg: 'from-amber-50 to-orange-50'
    },
    {
      page: 3,
      text: `${resolvedCharName} duduk di sudut, memeluk boneka kesayangannya erat-erat.`,
      wordCount: 9,
      scene: `${resolvedCharName} duduk sendiri di atas karpet kuning lembut, merasa agak malu menghadapi lingkungan baru.`,
      bg: 'from-blue-50 to-pink-50'
    },
    {
      page: 4,
      text: 'Tiba-tiba, seorang anak laki-laki datang membawa balok mainan.',
      wordCount: 9,
      scene: 'Bima, anak laki-laki berwajah ramah dengan seragam sekolah serasi, melangkah mendekat sambil membawa beberapa balok kayu susun.',
      bg: 'from-emerald-50 to-amber-50'
    },
    {
      page: 5,
      text: `\"Namaku Bima, ayo main bersama!\" kata anak itu kepada ${resolvedCharName}.`,
      wordCount: 11,
      scene: 'Close-up hangat. Bima tersenyum ramah dan mengulurkan balok kayu berwarna biru cerah ke arahnya.',
      bg: 'from-sky-50 to-blue-50'
    },
    {
      page: 6,
      text: `${resolvedCharName} tersenyum malu dan menerima balok berwarna biru itu.`,
      wordCount: 9,
      scene: `${resolvedCharName} tersipu dengan pipi merona manis, mengulurkan tangannya menerima balok biru dari Bima dengan gembira.`,
      bg: 'from-pink-50 to-purple-50'
    },
    {
      page: 7,
      text: `${resolvedCharName} membagi buah camilan kesukaannya kepada teman barunya.`,
      wordCount: 9,
      scene: `${resolvedCharName} tersenyum lebar dan memperlihatkan buah camilannya kepada Bima, saling berbagi dengan gembira.`,
      bg: 'from-teal-50 to-emerald-50'
    },
    {
      page: 8,
      text: 'Mereka menyusun balok menjadi menara yang sangat tinggi.',
      wordCount: 9,
      scene: `${resolvedCharName} dan Bima duduk bersila bersama, fokus menyusun balok-balok kayu berwarna-warni hingga menjulang tinggi.`,
      bg: 'from-amber-50 to-yellow-50'
    },
    {
      page: 9,
      text: 'Gubrak! Menaranya jatuh, tapi mereka berdua malah tertawa.',
      wordCount: 9,
      scene: 'Balok-balok berjatuhan di udara, keduanya tertawa terbahak-bahak bahagia bersama di karpet bermain.',
      bg: 'from-orange-50 to-rose-50'
    },
    {
      page: 10,
      text: `Saat istirahat, ${resolvedCharName} berbagi kue cokelat dengan Bima.`,
      wordCount: 9,
      scene: `Waktu makan kudapan. ${resolvedCharName} membagi kue cokelat manisnya menjadi dua bagian untuk dinikmati bersama Bima.`,
      bg: 'from-amber-50 to-stone-50'
    },
    {
      page: 11,
      text: `${resolvedCharName} senang sekali punya teman baru di sekolah barunya.`,
      wordCount: 10,
      scene: 'Keduanya bermain ayunan di halaman sekolah di bawah langit biru cerah bertabur awan kapas putih yang indah.',
      bg: 'from-sky-50 to-indigo-50'
    },
    {
      page: 12,
      text: `Besok ${resolvedCharName} pasti bersemangat pergi ke sekolah lagi!`,
      wordCount: 9,
      scene: `Jam pulang sekolah. ${resolvedCharName} melambaikan tangan pamit pada Bima dan gedung sekolah dengan senyum lebar penuh semangat.`,
      bg: 'from-pink-50 to-amber-50'
    }
  ];

  const handleGenerateStorybookPrompts = () => {
    const sections: any[] = [];

    // Front Cover
    sections.push({
      id: 'book-cover-front',
      title: 'Cover Depan Buku Cerita',
      subtitle: `Judul: "Kisah Indah ${resolvedCharName}"`,
      content: `Style: ${visualStyle}.
Layout: Landscape (A4 Landscape, print-ready).
Characters: ${resolvedCharName}, a 5-year-old child, ${visualStyle} style, ${resolvedCharDesc}.
Scene: A bright, cheerful kindergarten playground with pastel-colored slides and sunny skies. ${resolvedCharName} is standing with a new friend, smiling happily.
Text Zone: A large, clear area in the center or top sky for the book title.
Include Text: Title "Kisah Indah ${resolvedCharName}" in a cute, playful font.
Compose like a printed storybook page: keep a quiet safe margin around all edges.
ultra detailed, professional illustration, premium quality, 8K resolution, sharp focus, clean edges.`
    });

    // Story Pages
    storyPages.forEach((p) => {
      sections.push({
        id: `book-page-${p.page}`,
        title: `Halaman ${p.page}`,
        subtitle: `Teks cerita: "${p.text}"`,
        content: `Style: ${visualStyle}.
Layout: Landscape (A4 Landscape, print-ready).
Characters: ${resolvedCharName} (${resolvedCharDesc}).
Scene: ${p.scene}
Text Zone: Designated quiet margin area with clean typography placement.
Page Number: Render the number "${p.page}" once, small at the bottom right corner, inside the Safe Margin.
Include Text: "${p.text}"
Compose like a printed storybook page: keep a quiet safe margin around all edges. Leave a clearly readable open area within the scene itself for the story text.
ultra detailed, professional illustration, premium quality, 8K resolution.`
      });
    });

    // Back Cover
    sections.push({
      id: 'book-cover-back',
      title: 'Cover Belakang Buku Cerita (Blurb)',
      subtitle: 'Sinopsis belakang buku',
      content: `Style: ${visualStyle}.
Layout: Landscape (A4 Landscape, print-ready).
Scene: A simple, soft pastel background featuring beautiful children building blocks resting on a soft yellow surface.
Text Zone: A large, clear area in the center for the book blurb.
Include Text: "${resolvedCharName} sangat gugup di hari pertamanya masuk sekolah. Namun, sebuah balok mainan dan teman baru mengubah segalanya. Yuk, ikuti kisah manis ${resolvedCharName} menemukan sahabat baru!"
ultra detailed, professional illustration, premium quality, 8K resolution.
Teks Blurb: "${resolvedCharName} sangat gugup di hari pertamanya masuk sekolah. Namun, sebuah balok mainan dan teman baru mengubah segalanya. Yuk, ikuti kisah manis ${resolvedCharName} menemukan sahabat baru!"`
    });

    setPromptSections(sections);

    let fullPrompts = `RINGKASAN RANCANGAN BUKU DONGENG\n==================================================\nTema Cerita     : ${resolvedTheme}\nTokoh Utama     : ${resolvedCharName}\nDeskripsi Fisik : ${resolvedCharDesc}\nUsia Pembaca    : ${ageGroup}\nJumlah Halaman  : ${pageCount} Halaman Isi\nLayout Buku     : ${layout}\nStyle Ilustrasi : ${visualStyle}\nBahasa          : ${language}\n\n`;
    sections.forEach(s => {
      fullPrompts += `==================================================\n${s.title}\n==================================================\n${s.content}\n\n`;
    });

    setPromptContent(fullPrompts);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <BookMarked className="w-3.5 h-3.5" />
            <span>EduSmart Storybook Studio · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Buku Dongeng & Cerita Anak
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Buat buku dongeng berkualitas dengan tokoh konsisten, alur narasi mendidik, dan rancangan prompt per halaman lengkap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'wizard'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Wizard Pembuat Buku
          </button>
          <button
            onClick={() => setActiveTab('reader')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'reader'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Baca Buku Dongeng</span>
          </button>
        </div>
      </div>

      {activeTab === 'wizard' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Progress Header */}
          <div className="px-6 py-4 bg-purple-50/50 border-b border-purple-100 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-purple-600 text-white ring-2 ring-purple-300 ring-offset-1'
                      : step > s
                      ? 'bg-purple-100 text-purple-900'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-purple-900 ml-4 shrink-0">
              Langkah {step} dari 7
            </span>
          </div>

          <div className="p-6 lg:p-8 space-y-6">
            {/* STEP 1: Tema Cerita */}
            {step === 1 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 1: Tema Cerita
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Kira-kira, cerita ini mau mengangkat tema apa?
                </h3>
                <p className="text-xs text-slate-500">
                  Kamu bebas memilih saran tema di bawah ini atau mengetik tema idemu sendiri pada kolom di bawah:
                </p>

                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Ketik tema cerita di sini (Contoh: Menolong sesama teman di sekolah baru, keberanian anak kelinci...)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-purple-400 focus:outline-hidden text-sm placeholder:text-slate-400/60 placeholder:font-normal"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {[
                    'Belajar berbagi dan berteman di sekolah baru',
                    'Petualangan hewan kecil yang berani di hutan ajaib',
                    'Petualangan ke luar angkasa mencari bintang jatuh',
                    'Mengenal macam-macam emosi lewat karakter lucu'
                  ].map((rec) => (
                    <button
                      key={rec}
                      onClick={() => setTheme(rec)}
                      className="p-3 text-left rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-xs font-medium text-slate-700 transition-colors"
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Tokoh Utama */}
            {step === 2 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 2: Tokoh Utama Cerita
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Siapa yang akan jadi bintang di cerita kita ini?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'ai',
                      title: 'Biarkan AI Merancang Karakter Utama',
                      desc: 'AI akan menyusun profil fisik & pakaian karakter utama secara otomatis berdasarkan tema.'
                    },
                    {
                      id: 'describe',
                      title: 'Deskripsikan Ciri Tokoh Sendiri',
                      desc: 'Tuliskan nama tokoh, ciri fisik, pakaian, atau atribut khas yang ingin ditampilkan.'
                    },
                    {
                      id: 'upload',
                      title: 'Upload Gambar Karakter',
                      desc: 'Gunakan referensi gambar karakter utama yang sudah kamu miliki.'
                    }
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setCharOption(opt.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        charOption === opt.id
                          ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-slate-900">{opt.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Tokoh Utama:</label>
                    <input
                      type="text"
                      value={charName}
                      onChange={(e) => setCharName(e.target.value)}
                      placeholder="Masukkan nama tokoh di sini (Contoh: Kimi, Owi, Rara, Bima...)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-400 focus:outline-hidden placeholder:text-slate-400/60 placeholder:font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Fisik & Visual Tokoh:</label>
                    <textarea
                      value={charDesc}
                      onChange={(e) => setCharDesc(e.target.value)}
                      rows={3}
                      placeholder="Gambarkan tokoh di sini (Contoh: Anak perempuan usia 5 tahun, rambut dikuncir dua, memakai rompi rajut krem, membawa ransel mungil yang lucu...)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-400 focus:outline-hidden placeholder:text-slate-400/60 placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Usia Pembaca */}
            {step === 3 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 3: Usia Pembaca
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Target usia pembaca buku dongeng ini adalah:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '3–4 tahun (kalimat sangat pendek, berulang, cerita aman)',
                    '5–6 tahun (alur ringan, 8–15 kata per halaman)',
                    '7–9 tahun (alur cerita klasik lebih seru, kalimat lebih panjang)',
                    '10–12 tahun (konflik lebih dalam dan karakter berkembang)'
                  ].map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGroup(age)}
                      className={`p-4 text-left rounded-2xl border text-xs font-medium transition-all ${
                        ageGroup === age
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Jumlah Halaman */}
            {step === 4 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 4: Jumlah Halaman Isi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Berapa panjang buku dongeng yang kamu inginkan?
                </h3>
                <p className="text-xs text-slate-500">
                  Pilihan standar buku cerita anak (di luar cover depan & belakang):
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[8, 12, 16, 20, 24].map((count) => (
                    <button
                      key={count}
                      onClick={() => setPageCount(count)}
                      className={`p-4 text-center rounded-2xl border transition-all ${
                        pageCount === count
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-lg block font-heading">{count}</span>
                      <span className="text-[11px] text-slate-500">Halaman</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Layout Buku */}
            {step === 5 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 5: Layout Buku
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih format ukuran dan orientasi buku dongeng:
                </h3>

                <div className="space-y-3">
                  {[
                    'Landscape (A4 Landscape, print-ready)',
                    'Portrait (A4 Portrait, print-ready)',
                    'Square (Cetakan persegi, buku digital, atau media sosial)'
                  ].map((ly) => (
                    <div
                      key={ly}
                      onClick={() => setLayout(ly)}
                      className={`p-4 rounded-2xl border cursor-pointer text-xs font-semibold transition-all ${
                        layout === ly
                          ? 'border-purple-600 bg-purple-50/70 text-purple-900 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {ly}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Style Ilustrasi */}
            {step === 6 && (
              <div className="space-y-4 max-w-3xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">
                  LANGKAH 6: Style Ilustrasi
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Gaya gambar apa yang kamu inginkan untuk cerita ini?
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1">
                  {[
                    'Kawaii Anime Chibi',
                    'Cute Flat Storybook',
                    '3D Cartoon Kids Storybook',
                    'Watercolor Storybook',
                    'Semi Watercolor Digital',
                    'Whimsical Watercolor Fantasy',
                    'Cute Pastel Kids',
                    'Playful Doodle Style',
                    '3D Clay Cute',
                    'Bright Kids Color Pop',
                    'Cute Watercolor Animal',
                    'Crochet Amigurumi',
                    'Paper Quilling Illustration',
                    '3D Clay Chibi Faceless'
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => setVisualStyle(style)}
                      className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                        visualStyle === style
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Bahasa & Ringkasan */}
            {step === 7 && (
              <div className="space-y-4 max-w-2xl animate-in fade-in">
                <div className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                  LANGKAH 7: Bahasa & Ringkasan Konsep
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pilih bahasa dan tinjau ringkasan buku dongengmu:
                </h3>

                <div className="flex gap-2 mb-3">
                  {['Bahasa Indonesia', 'English', 'Dwibahasa (ID & EN)'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-bold ${
                        language === l ? 'bg-purple-600 text-white' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Tema Cerita:</span>
                    <span className="font-bold text-slate-800">{resolvedTheme}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Tokoh Utama:</span>
                    <span className="font-bold text-slate-800">{resolvedCharName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Usia Pembaca:</span>
                    <span className="font-bold text-slate-800">{ageGroup.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Panjang Buku:</span>
                    <span className="font-bold text-slate-800">{pageCount} Halaman Isi</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Style Visual:</span>
                    <span className="font-bold text-slate-800">{visualStyle}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Bahasa:</span>
                    <span className="font-bold text-slate-800">{language}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="flex justify-between pt-4 border-t border-slate-100 text-xs">
              <button
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl disabled:opacity-30"
              >
                Kembali
              </button>

              {step < 7 ? (
                <button
                  onClick={() => setStep(prev => Math.min(7, prev + 1))}
                  className="flex items-center gap-1 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  <span>Lanjut</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleGenerateStorybookPrompts}
                  className="flex items-center gap-1 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lihat Prompt AI Buku</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* READER PREVIEW MODE */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Reader Header */}
          <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-purple-600 rounded font-mono font-bold">
                {currentReaderPage === 0 
                  ? 'Cover Depan' 
                  : currentReaderPage === pageCount + 1 
                  ? 'Cover Belakang' 
                  : `Halaman ${currentReaderPage}`}
              </span>
              <span className="text-slate-300 font-medium">
                {currentReaderPage === 0 
                  ? `Kisah Indah ${resolvedCharName}` 
                  : currentReaderPage === pageCount + 1 
                  ? 'Sinopsis Belakang' 
                  : `Halaman ${currentReaderPage}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentReaderPage(prev => Math.max(0, prev - 1))}
                disabled={currentReaderPage === 0}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentReaderPage(prev => Math.min(pageCount + 1, prev + 1))}
                disabled={currentReaderPage === pageCount + 1}
                className="p-1 rounded hover:bg-slate-800 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Book Page Spread */}
          <div className="aspect-video w-full bg-gradient-to-br from-purple-50 via-pink-50/50 to-indigo-50 p-8 flex flex-col justify-between overflow-hidden border-b border-slate-200">
            {/* Top Info */}
            <div className="flex items-center justify-between border-b border-purple-200/50 pb-2">
              <h3 className="text-sm font-extrabold text-purple-950 font-heading">
                {currentReaderPage === 0 
                  ? `Buku Dongeng ${resolvedCharName}` 
                  : currentReaderPage === pageCount + 1 
                  ? 'Blurb Penutup' 
                  : `Petualangan Hebat ${resolvedCharName}`}
              </h3>
              <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                {visualStyle}
              </span>
            </div>

            {/* Central Stage */}
            <div className="flex-1 flex items-center justify-between py-6 gap-8">
              <div className="max-w-md space-y-3">
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed font-heading">
                  {currentReaderPage === 0 
                    ? `\"Kisah Indah ${resolvedCharName}\"` 
                    : currentReaderPage === pageCount + 1 
                    ? `\"${resolvedCharName} sangat gugup di hari pertamanya masuk sekolah. Namun, sebuah balok mainan dan teman baru mengubah segalanya. Yuk, ikuti kisah manis ${resolvedCharName} menemukan sahabat baru!\"` 
                    : storyPages[(currentReaderPage - 1) % storyPages.length].text}
                </p>
                <p className="text-xs text-slate-500 italic">
                  {currentReaderPage === 0 
                    ? 'Buku dongeng berkualitas karya pendidik.' 
                    : currentReaderPage === pageCount + 1 
                    ? 'Blurb belakang buku untuk menarik pembaca.' 
                    : `Skenario adegan: ${storyPages[(currentReaderPage - 1) % storyPages.length].scene}`}
                </p>
              </div>

              {/* Cover/Illustration Canvas Placeholder */}
              <div className="w-44 h-44 rounded-2xl bg-white border border-purple-200 shadow-sm flex flex-col items-center justify-center text-center p-4">
                <div className="text-4xl mb-2">
                  {currentReaderPage === 0 ? '📖' : currentReaderPage === pageCount + 1 ? '✨' : '🎨'}
                </div>
                <span className="text-xs font-bold text-slate-800">{resolvedCharName}</span>
                <span className="text-[10px] text-slate-500 font-medium">Ilustrasi {visualStyle}</span>
              </div>
            </div>

            {/* Bottom spread info */}
            <div className="flex items-center justify-between text-xs text-purple-900 border-t border-purple-200/50 pt-2 font-medium">
              <span>Layout: {layout.split('(')[0]}</span>
              <span>Halaman {currentReaderPage}</span>
            </div>
          </div>

          {/* Page Strip Selector */}
          <div className="p-4 bg-slate-50 flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setCurrentReaderPage(0)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 ${
                currentReaderPage === 0 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              Cover Depan
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReaderPage(idx + 1)}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-lg shrink-0 ${
                  currentReaderPage === idx + 1 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                #{idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentReaderPage(pageCount + 1)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg shrink-0 ${
                currentReaderPage === pageCount + 1 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              Cover Belakang
            </button>
          </div>
        </div>
      )}

      {/* Structured Prompts Modal (User-choice Neutral AI targets) */}
      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Prompt Buku Dongeng Siap Pakai"
        subtitle="Prompt terpisah per halaman yang dapat digunakan pada AI pilihanmu"
        promptContent={promptContent}
        promptSections={promptSections}
      />
    </div>
  );
};
