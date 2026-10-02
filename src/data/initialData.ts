import { EducationalMaterial, AiToolItem, PromptItem } from '../types';

export const POPULAR_TOPICS = [
  'Gaya Magnet & Listrik (IPAS Kelas 4)',
  'Matematika Berhitung 1-10 & Bentuk Geometri (PAUD/TK)',
  'Tata Surya & Planet (Kelas 6 SD)',
  'Kosakata Bahasa Inggris: Hewan & Buah (Kelas 2 SD)',
  'Ekosistem Hutan & Rantai Makanan (Kelas 5 SD)',
  'Pecahan Senilai & Desimal (Kelas 4 SD)',
  'Siklus Air & Cuaca di Bumi (Kelas 3 SD)',
  'Pengenalan Huruf Hijaiyah & Angka Arab (TPA/TK)',
  'Emosi Diri & Belajar Berbagi (PAUD 4-6 Tahun)',
  'Sejarah Kemerdekaan Indonesia 1945 (SMP)'
];

export const AI_TOOLS_DIRECTORY: AiToolItem[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'all-in-one',
    categoryLabel: 'AI Multimodal & Coding',
    description: 'Model AI multimodal cerdas untuk membuat rencana modul ajar, narasi komik, soal kuis, hingga logic game HTML interaktif.',
    bestFor: 'Modul ajar kurikulum merdeka, kuis otomatis, ide materi',
    url: 'https://gemini.google.com',
    pricing: 'Freemium',
    icon: 'Sparkles',
    featured: true,
    recommendedWorkflow: 'Gunakan prompt wizard EduSmart untuk meng-generate struktur modul atau soal kuis lengkap.'
  },
  {
    id: 'canva',
    name: 'Canva Magic Media',
    category: 'presentation',
    categoryLabel: 'Desain & Media Pembelajaran',
    description: 'Platform visual dengan AI Magic Presentation, Magic Write, dan Magic Image untuk mencetak worksheet dan presentasi kelas.',
    bestFor: 'Slide presentasi, lembar kerja siswa, banner kelas',
    url: 'https://canva.com',
    pricing: 'Freemium',
    icon: 'Presentation',
    featured: true,
    recommendedWorkflow: 'Salin prompt visual dari EduSmart Slide Generator ke Magic Media Canva untuk mendapatkan slide konsisten.'
  },
  {
    id: 'suno',
    name: 'Suno AI',
    category: 'audio',
    categoryLabel: 'Musik & Lagu Edukasi',
    description: 'AI pembuat lagu lengkap dengan melodi, vokal anak yang ceria, dan aransemen dari prompt lirik edukasi.',
    bestFor: 'Lagu hafalan rumus, lagu pengantar tidur anak, yel-yel kelas',
    url: 'https://suno.com',
    pricing: 'Freemium',
    icon: 'Music',
    featured: true,
    recommendedWorkflow: 'Gunakan EduSmart Lagu Generator untuk membuat lirik berima + style prompt Suno (e.g. Acoustic nursery rhyme).'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'image',
    categoryLabel: 'Generasi Ilustrasi Berkualitas Tinggi',
    description: 'AI image generator terdepan untuk ilustrasi buku cerita anak bergaya 3D Pixar, watercolor, atau kawaii anime chibi.',
    bestFor: 'Cover buku dongeng, kartu flashcard, maskot edukasi',
    url: 'https://midjourney.com',
    pricing: 'Berbayar',
    icon: 'Palette',
    featured: true,
    recommendedWorkflow: 'Tempelkan prompt dari Storybook Studio EduSmart dengan parameter --ar 16:9 --v 6.1.'
  },
  {
    id: 'quizizz',
    name: 'Quizizz AI',
    category: 'quiz',
    categoryLabel: 'Kuis & Game Interaktif Siswa',
    description: 'Otomatisasi pembuatan kuis dari teks bacaan, dokumen PDF, atau video YouTube edukasi dengan mode game seru.',
    bestFor: 'Evaluasi harian, gamifikasi kelas, asesmen diagnostik',
    url: 'https://quizizz.com',
    pricing: 'Freemium',
    icon: 'HelpCircle',
    recommendedWorkflow: 'Export soal dari EduSmart Game Generator langsung ke Quizizz via CSV atau teks terstruktur.'
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    category: 'presentation',
    categoryLabel: 'Slide & Dokumen Interaktif AI',
    description: 'Membuat presentasi, dokumen, dan webpage interaktif dalam hitungan detik hanya dengan mengetikkan topik.',
    bestFor: 'Presentasi materi cepat, modul interaktif guru',
    url: 'https://gamma.app',
    pricing: 'Freemium',
    icon: 'Layers',
    recommendedWorkflow: 'Ketikkan outline 5-materi dari EduSmart Media Pembelajaran ke Gamma.'
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Alpha',
    category: 'video',
    categoryLabel: 'Video & Animasi AI',
    description: 'Mengubah prompt teks atau gambar ilustrasi menjadi video animasi gerak halus untuk bumper dan animasi pembelajaran.',
    bestFor: 'Bumper video pembelajaran, animasi karakter maskot',
    url: 'https://runwayml.com',
    pricing: 'Freemium',
    icon: 'Video',
    recommendedWorkflow: 'Generate ilustrasi maskot di EduSmart lalu animasikan gerakan lambaian tangan di Runway Gen-3.'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'audio',
    categoryLabel: 'Voiceover & Suara Karakter',
    description: 'Generator suara AI paling alami dengan berbagai pilihan karakter anak, guru ramah, narator dongeng, dan bahasa Indonesia.',
    bestFor: 'Sulih suara video pembelajaran, narasi buku audio',
    url: 'https://elevenlabs.io',
    pricing: 'Freemium',
    icon: 'Mic',
    recommendedWorkflow: 'Ambil teks cerita per halaman dari Storybook Studio lalu ubah jadi suara narator ekspresif.'
  }
];

export const INITIAL_MATERIALS: EducationalMaterial[] = [
  {
    id: 'mat-1',
    title: 'Worksheet Berhitung Apel & Mengenal Angka 1-10',
    category: 'worksheet',
    categoryLabel: 'Worksheet',
    ageGroup: '4–6 tahun (PAUD/TK)',
    subject: 'Matematika Dasar',
    description: 'Lembar kerja aktivitas counting dan matching objek apel merah dengan garis putus-putus. Format A4 printable 300 DPI.',
    thumbnail: '🍎',
    downloadCount: 1420,
    tags: ['Counting', 'PAUD', 'A4 Printable', 'Math'],
    promptReady: `A4 Portrait, target 2480x3508 px, setara 300 DPI. Page-within-a-page layout with central white activity area. Header: Nama: _______ Kelas: _______. Title: "Menghitung Buah Apel Ceria". 6 kotak soal counting objek apel cerah dengan kotak jawaban angka di sebelah kanan. Style: Cute 2D clean line art, minimal decoration, print-ready, high readability.`
  },
  {
    id: 'mat-2',
    title: 'LKPD Penyelidikan Gaya Magnet & Sifat Kutub',
    category: 'lkpd',
    categoryLabel: 'LKPD',
    ageGroup: '9–10 tahun (Kelas 4 SD)',
    subject: 'IPAS (Kurikulum Merdeka)',
    description: 'Lembar Kerja Peserta Didik berbasis inkuiri sains: eksplorasi tarik-menarik dan tolak-menolak dua magnet batang.',
    thumbnail: '🧲',
    downloadCount: 890,
    tags: ['IPAS', 'Kurikulum Merdeka', 'Eksperimen', 'Kelas 4'],
    promptReady: `Struktur LKPD Kurikulum Merdeka: Capaian Pembelajaran IPAS Kelas 4, Pertanyaan Pemantik "Mengapa magnet bisa menempel?", Tabel Hasil Percobaan 5 Benda Logam dan Non-Logam, dan Kolom Kesimpulan Mandiri.`
  },
  {
    id: 'mat-3',
    title: 'Media Pembelajaran Ekosistem Hutan & Laut (20 Slide)',
    category: 'media',
    categoryLabel: 'Media Pembelajaran',
    ageGroup: '7–9 tahun (SD)',
    subject: 'Sains Lingkungan',
    description: 'Presentasi lengkap 20 slide dari Cover, Navigasi, 5 Materi, Video Bumper, hingga 5 Kuis Evaluasi dengan maskot Ranger Cilik.',
    thumbnail: '🌲',
    downloadCount: 2310,
    tags: ['Presentasi', '20 Slide', 'Ekosistem', 'Kuis Interaktif'],
    promptReady: `Ukuran: Landscape 16:9. Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace. Header: "Petualangan di Ekosistem!". Visual: Flat Cartoon 2D vector art. Maskot penjelajah safari cilik hijau tersenyum ramah.`
  },
  {
    id: 'mat-4',
    title: 'Game Kuis Matematika Bersama Maskot Burung Hantu Owi',
    category: 'game',
    categoryLabel: 'Game Edukasi',
    ageGroup: '4–6 tahun (PAUD)',
    subject: 'Matematika & Logika',
    description: '6 Level permainan kuis interaktif (menghitung apel, tebak balok angka, mencari bentuk lingkaran, dan pola warna balok).',
    thumbnail: '🦉',
    downloadCount: 3120,
    tags: ['Game Kuis', '3D Pixar Style', 'Owi Mascot', 'Interaktif'],
    promptReady: `RINGKASAN KONSEP GAME EDUKASI: Topik: Matematika (Berhitung, Mengenal Angka & Bentuk). Format: Pilihan Ganda 6 Soal. Layout: Landscape 1920x1080. Visual: 3D Pixar Style. Maskot: Owi burung hantu berkacamata bundar.`
  },
  {
    id: 'mat-5',
    title: 'Buku Dongeng: Teman Baru Rara di Sekolah',
    category: 'ebook',
    categoryLabel: 'Buku & E-Book',
    ageGroup: '5–6 tahun (TK/SD)',
    subject: 'Sosial & Emosi',
    description: 'Buku cerita bergambar 12 halaman tentang mengatasi rasa malu di hari pertama sekolah lewat berbagi balok mainan dan boneka kelinci.',
    thumbnail: '📚',
    downloadCount: 1980,
    tags: ['Storybook', 'Kawaii Chibi', '12 Halaman', 'Karakter Rara'],
    promptReady: `Style: Kawaii Anime Chibi. Layout: Landscape A4 300 dpi. Characters: Rara (gadis 5 tahun, poni rata, seragam TK pastel pink, memeluk boneka kelinci). Bima (anak laki-laki ramah membawa balok mainan).`
  },
  {
    id: 'mat-6',
    title: 'Flashcard 16 Alat Transportasi Darat, Laut & Udara',
    category: 'flashcard',
    categoryLabel: 'Flashcard',
    ageGroup: '4–5 tahun (PAUD)',
    subject: 'Bahasa Indonesia & Pengetahuan Umum',
    description: '2 Lembar A4 Landscape (8 kartu per lembar). Ilustrasi kendaraan lengkap dengan nama jelas Bahasa Indonesia.',
    thumbnail: '✈️',
    downloadCount: 2750,
    tags: ['Flashcard', 'Kelipatan 8', 'Transportasi', 'Printable A4'],
    promptReady: `A4 landscape format, a sheet of 8 educational flashcards arranged in a neat grid of 4 columns and 2 rows. Theme: Transportation for 4-5 year old kids. Clean 2D Cartoon vector style. Mobil, Motor, Sepeda, Bis, Kereta, Pesawat, Kapal, Helikopter.`
  },
  {
    id: 'mat-7',
    title: 'Komik Edukasi: Pahlawan Hemat Energi di Rumah',
    category: 'komik',
    categoryLabel: 'Komik Edukasi',
    ageGroup: '7–12 tahun (SD)',
    subject: 'Pendidikan Karakter & IPAS',
    description: 'Komik strip 4-panel yang mengajarkan kebiasaan mematikan lampu dan mencabut charger saat tidak dipakai.',
    thumbnail: '⚡',
    downloadCount: 1120,
    tags: ['Komik Strip', 'Hemat Energi', '4 Panel', 'Karakter Edukatif'],
    promptReady: `4-panel comic strip, A4 format. Cute cartoon illustration. Panel 1: Adik lupa mematikan lampu kamar. Panel 2: Kakak datang mengingatkan dengan ramah. Panel 3: Menjelaskan dampak pemborosan energi. Panel 4: Keduanya tos bersama menjadi Pahlawan Hemat Energi.`
  }
];

export const PROMPT_LIBRARY_ITEMS: PromptItem[] = [
  {
    id: 'p-worksheet-coding',
    title: 'Worksheet Coding Arah (Grid Panah)',
    category: 'worksheet',
    targetAi: ['Midjourney', 'DALL-E 3', 'Gemini'],
    description: 'Menghasilkan lembar kerja coding logika arah panah yang presisi dengan prinsip 1 halaman = 1 aktivitas.',
    promptText: `A4 Portrait, printable educational worksheet for kids aged {age}. Theme: Coding Arah ({theme}). Header: Nama: _______ Kelas: _______. Single activity: Coding Arah only. One central 5x5 grid with START icon at top-left and FINISH goal at bottom-right. Below the grid, show an arrow sequence code: [↑] [→] [→] [↓] [→]. Instruction: "Ikuti kode panah untuk membantu karakter mencapai tujuan!". Clean cute 2D vector style, pure white activity area, bold crisp outlines, zero clutter, no watermark, 300 DPI print-ready.`,
    variables: [
      { name: 'age', label: 'Target Usia', defaultValue: '5-7 tahun' },
      { name: 'theme', label: 'Karakter / Tema', defaultValue: 'Kelinci mencari wortel' }
    ],
    tags: ['Worksheet', 'Coding Arah', 'Computational Thinking', 'A4']
  },
  {
    id: 'p-game-mascot',
    title: 'Karakter Maskot Game Edukasi 3D Pixar Style',
    category: 'game',
    targetAi: ['Midjourney', 'Gemini', 'Canva Magic'],
    description: 'Merancang maskot game edukasi yang ramah, hangat, dan ekspresif dengan pencahayaan 3D Pixar.',
    promptText: `Character concept sheet of a friendly educational mascot: {mascot_desc}. 3D Pixar animation render style, expressive cute facial expression, soft warm rim lighting, volumetric render, cheerful pastel colors, wearing small round reading glasses, holding an educational pencil. Isolated on clean solid background, commercial 8k quality, centered composition.`,
    variables: [
      { name: 'mascot_desc', label: 'Deskripsi Maskot', defaultValue: 'Owi, seekor burung hantu kecil berbulu pastel lembut' }
    ],
    tags: ['Game Mascot', '3D Pixar', 'Karakter', 'Kid-friendly']
  },
  {
    id: 'p-slide-media',
    title: 'Slide Presentasi Edukasi Kelas Rendah (16:9)',
    category: 'presentation',
    targetAi: ['Canva Magic', 'Midjourney', 'Gamma App'],
    description: 'Template prompt slide media pembelajaran dengan safe margins, layout seimbang, dan ruang teks lega.',
    promptText: `Landscape 16:9 educational presentation slide. Topic: {topic} for kids aged {age}. Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at canvas edge. Title in clean bold playful typography: "{slide_title}". Clear visual hierarchy with {style} illustration on the right and generous open area for lesson text on the left. Highly readable, no handwrite text ornament, presentation-ready 8K, 300 DPI.`,
    variables: [
      { name: 'topic', label: 'Topik Materi', defaultValue: 'Siklus Daur Air di Bumi' },
      { name: 'age', label: 'Usia Siswa', defaultValue: '7-9 tahun' },
      { name: 'slide_title', label: 'Judul Slide', defaultValue: 'Dari Mana Asal Hujan?' },
      { name: 'style', label: 'Gaya Visual', defaultValue: 'Flat Cartoon 2D vector' }
    ],
    tags: ['Slide', 'Media Pembelajaran', '16:9', 'Classroom']
  },
  {
    id: 'p-song-suno',
    title: 'Prompt Lagu Edukasi Suno AI (Lirik Berima & Style Prompt)',
    category: 'song',
    targetAi: ['Suno AI', 'Udio'],
    description: 'Prompt lengkap untuk membuat lagu edukasi ramah anak dengan struktur verse, chorus gembira berima, dan genre tag.',
    promptText: `[Genre: Upbeat children educational pop, acoustic guitar, cheerful handclaps, bright playful male and female vocals, nursery rhyme tempo 115 bpm]

[Verse 1]
Pagi hari kita sambut matahari
Buka buku, ayo kita mulai lagi
Ada angka satu sampai sepuluh
Ayo berhitung tak usah mengeluh!

[Chorus]
Satu dua tiga empat lima,
Kita belajar bersama-sama!
Enam tujuh delapan sembilan sepuluh,
Pintar matematika kita berlabuh!

[Outro]
Hore! Kita juara hitung hari ini!`,
    variables: [],
    tags: ['Suno AI', 'Lagu Edukasi', 'Musik Anak', 'Matematika']
  },
  {
    id: 'p-flashcard-transport',
    title: 'Sheet Flashcard Edukasi A4 Grid 4x2 (8 Kartu)',
    category: 'flashcard',
    targetAi: ['Midjourney', 'DALL-E 3', 'Canva'],
    description: 'Prompt sheet flashcard A4 landscape kelipatan 8 dengan garis potong rapi dan teks bahasa Indonesia.',
    promptText: `A4 landscape format, a sheet of 8 educational flashcards arranged in a neat grid of 4 columns and 2 rows with subtle cutting guide lines. Theme: {theme} for kids aged {age}. Each card features a cute clean {style} illustration with its label clearly written in Bahasa Indonesia below: Card 1: {item1}, Card 2: {item2}, Card 3: {item3}, Card 4: {item4}, Card 5: {item5}, Card 6: {item6}, Card 7: {item7}, Card 8: {item8}. Print-ready 300 DPI, commercial quality, no watermarks.`,
    variables: [
      { name: 'theme', label: 'Tema Kartu', defaultValue: 'Alat Transportasi' },
      { name: 'age', label: 'Usia', defaultValue: '4-5 tahun' },
      { name: 'style', label: 'Gaya Ilustrasi', defaultValue: '2D flat cartoon' },
      { name: 'item1', label: 'Item 1', defaultValue: 'Mobil' },
      { name: 'item2', label: 'Item 2', defaultValue: 'Sepeda Motor' },
      { name: 'item3', label: 'Item 3', defaultValue: 'Sepeda' },
      { name: 'item4', label: 'Item 4', defaultValue: 'Bis' },
      { name: 'item5', label: 'Item 5', defaultValue: 'Kereta Api' },
      { name: 'item6', label: 'Item 6', defaultValue: 'Pesawat Udara' },
      { name: 'item7', label: 'Item 7', defaultValue: 'Kapal Laut' },
      { name: 'item8', label: 'Item 8', defaultValue: 'Helikopter' }
    ],
    tags: ['Flashcard', 'A4 Grid', 'Printable', 'Bahasa Indonesia']
  }
];
