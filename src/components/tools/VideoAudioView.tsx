import React, { useState } from 'react';
import { 
  Music, 
  Clapperboard, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  Video,
  ListOrdered
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

interface VideoAudioViewProps {
  initialSubTab?: 'storyboard' | 'konsep' | 'lagu' | 'voiceover';
}

export const VideoAudioView: React.FC<VideoAudioViewProps> = ({ initialSubTab = 'storyboard' }) => {
  const [subTab, setSubTab] = useState<'storyboard' | 'konsep' | 'lagu' | 'voiceover'>(initialSubTab);

  // Song parameters
  const [songTopic, setSongTopic] = useState('Belajar Berhitung 1 Sampai 10');
  const [songGenre, setSongGenre] = useState('Upbeat children educational pop, acoustic guitar, cheerful handclaps');
  const [songTargetAge, setSongTargetAge] = useState('PAUD / TK (4–6 Tahun)');

  // Storyboard parameters
  const [videoTopic, setVideoTopic] = useState('Siklus Terjadinya Hujan (Daur Air)');
  const [videoFormat, setVideoFormat] = useState<'16:9 Landscape' | '9:16 Shorts/Reels'>('16:9 Landscape');

  const [modalOpen, setModalOpen] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Audio preview playing mock
  const [isPlaying, setIsPlaying] = useState(false);

  const sampleStoryboardShots = [
    {
      shot: 1,
      title: 'Shot 1: Pembuka Ceria',
      type: 'Wide Shot (16:9)',
      visual: 'Matahari tersenyum bersinar hangat di atas danau biru yang jernih, air danau berkilau lembut.',
      audioNarration: '"Halo Sahabat Pintar! Pernahkah kalian bertanya, dari manakah air hujan berasal?"',
      onScreenText: 'Rahasia Daur Air di Bumi'
    },
    {
      shot: 2,
      title: 'Shot 2: Penguapan (Evaporasi)',
      type: 'Medium Close-up',
      visual: 'Partikel uap air animasi 3D lembut terbang melayang naik ke atas langit membentuk kabut putih ceria.',
      audioNarration: '"Ketika air danau terkena hangatnya sinar matahari, air tersebut berubah menjadi uap yang tak terlihat!"',
      onScreenText: 'Langkah 1: Evaporasi'
    },
    {
      shot: 3,
      title: 'Shot 3: Kondensasi (Membentuk Awan)',
      type: 'Eye-Level Medium Shot',
      visual: 'Uap-uap air berkumpul di langit tinggi yang dingin, bersatu menjadi gumpalan awan putih yang semakin tebal dan gemuk.',
      audioNarration: '"Di atas langit yang dingin, uap air berkumpul menjadi awan gemuk yang siap menampung air."',
      onScreenText: 'Langkah 2: Kondensasi'
    },
    {
      shot: 4,
      title: 'Shot 4: Presipitasi (Hujan Turun!)',
      type: 'Dynamic Camera Pan',
      visual: 'Tetesan air hujan jatuh segar ke bumi, tanaman hijau menyerap air dan anak-anak tersenyum memakai payung warna-warni.',
      audioNarration: '"Awan sudah terlalu berat, maka jatuhlah tetes-tetes hujan yang menyegarkan bumi!"',
      onScreenText: 'Langkah 3: Hujan Turun!'
    }
  ];

  const handleGenerateSongPrompt = () => {
    const fullPrompt = `PROMPT LAGU EDUKASI SUNO / UDIO AI
==================================================
Topik Materi : ${songTopic}
Target Usia  : ${songTargetAge}

[STYLE PROMPT / TAGS]
${songGenre}, tempo 115 bpm, bright cheerful children male and female vocal, joyful nursery rhyme, uplifting, acoustic ukulele and xylophone.

[LIRIK BERIMA EDUKASI]
[Intro - Melodi riang xilofon dan petikan gitar]

[Verse 1]
Pagi cerah kita buka jendela
Sinar mentari datang menyapa
Ayo kawan siapkan bukumu
Kita berhitung bersama gurumu!

[Pre-Chorus]
Satu dua tiga... siapkan jarimu!
Empat lima enam... lihat senyummu!

[Chorus - Upbeat & Ceria]
Satu dua tiga empat lima,
Kita belajar bersama-sama!
Enam tujuh delapan sembilan sepuluh,
Pintar berhitung tak lagi mengeluh!
Hore! Hore! Kita semua juara!

[Verse 2]
Ada satu apel manis di meja
Dua kupu-kupu terbang gembira
Tiga burung bernyanyi merdu
Matematika seru selalu!

[Outro]
Satu sampai sepuluh kita hafal sudah!
Belajar cerdas di EduSmart Lab!
[End]`;

    setPromptText(fullPrompt);
    setModalTitle('Prompt Lagu Edukasi Suno AI (Lirik & Style)');
    setModalOpen(true);
  };

  const handleGenerateStoryboardPrompt = () => {
    let output = `STORYBOARD & VIDEO SCRIPT PROMPT
==================================================
Judul Video : ${videoTopic}
Format      : ${videoFormat}
Target      : Video Animasi Edukasi Kelas / Shorts

DAFTAR SHOT & PROMPT GAMBAR PER ADENGAN:
--------------------------------------------------`;

    sampleStoryboardShots.forEach((s) => {
      output += `
Shot #${s.shot}: ${s.title}
- Framing / Camera : ${s.type}
- Visual Scene     : ${s.visual}
- Narasi Suara     : ${s.audioNarration}
- On-Screen Text   : "${s.onScreenText}"
- Image Prompt     : ${s.type}, ${s.visual}, 3D Pixar Animation style, bright clean studio lighting, 8k resolution, safe margin for subtitles.
`;
    });

    setPromptText(output);
    setModalTitle('Prompt Storyboard Video Pembelajaran');
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
            <Video className="w-3.5 h-3.5" />
            <span>EduSmart Video & Audio Lab · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Video & Audio Edukasi Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rancang konsep video pembelajaran, shot storyboard, lirik lagu edukasi Suno AI, dan skrip voiceover.
          </p>
        </div>

        {/* Subtab Switcher */}
        <div className="flex flex-wrap gap-1 p-1 bg-sky-50 rounded-2xl border border-sky-100">
          {[
            { id: 'storyboard', label: 'Storyboard Video', icon: Clapperboard },
            { id: 'lagu', label: 'Lagu Edukasi (Suno)', icon: Music },
            { id: 'voiceover', label: 'Voiceover & SFX', icon: Mic }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  subTab === tab.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STORYBOARD TAB */}
      {subTab === 'storyboard' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full space-y-2">
              <label className="block text-xs font-bold text-slate-800">Topik Video Edukasi:</label>
              <input
                type="text"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-400"
              />
            </div>
            <div className="w-full sm:w-auto space-y-2">
              <label className="block text-xs font-bold text-slate-800">Format Rasio:</label>
              <select
                value={videoFormat}
                onChange={(e) => setVideoFormat(e.target.value as any)}
                className="w-full sm:w-44 px-3 py-2 text-xs rounded-xl border border-slate-300"
              >
                <option value="16:9 Landscape">16:9 Landscape (YouTube/TV)</option>
                <option value="9:16 Shorts/Reels">9:16 Vertikal (Shorts/TikTok)</option>
              </select>
            </div>
            <button
              onClick={handleGenerateStoryboardPrompt}
              className="w-full sm:w-auto mt-4 sm:mt-6 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0"
            >
              Generate Prompt Storyboard
            </button>
          </div>

          {/* Shot Sequence Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleStoryboardShots.map((s) => (
              <div key={s.shot} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-xs text-sky-800">{s.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {s.type}
                  </span>
                </div>

                <div className="p-3 bg-sky-50/50 rounded-2xl border border-sky-100 text-xs text-slate-700 space-y-1">
                  <strong>Visual:</strong> {s.visual}
                </div>

                <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 text-xs text-slate-700 space-y-1">
                  <strong>Voiceover / Audio:</strong> {s.audioNarration}
                </div>

                <div className="text-[11px] font-semibold text-slate-500">
                  Teks Layar: <span className="text-slate-800 font-bold">"{s.onScreenText}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LAGU EDUKASI TAB (SUNO AI) */}
      {subTab === 'lagu' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <Music className="w-4 h-4" />
              <span>Suno AI Song Creator</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Topik Lagu:</label>
                <input
                  type="text"
                  value={songTopic}
                  onChange={(e) => setSongTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Genre & Mood Musik:</label>
                <input
                  type="text"
                  value={songGenre}
                  onChange={(e) => setSongGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateSongPrompt}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              ✨ Buat Lirik Berima & Prompt Suno AI
            </button>
          </div>

          {/* Interactive Lyrics Card Mockup */}
          <div className="bg-gradient-to-br from-rose-50/60 to-amber-50/40 p-6 rounded-3xl border border-rose-100 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200/60 pb-3">
              <div>
                <h4 className="font-bold text-sm text-slate-900 font-heading">
                  Lagu: {songTopic}
                </h4>
                <p className="text-[11px] text-slate-500">Irama Ceria Anak · Siap di-generate di Suno AI</p>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Jeda Audio' : 'Putar Melodi'}</span>
              </button>
            </div>

            <div className="font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100/80">
              {`[Chorus]
Satu dua tiga empat lima,
Kita belajar bersama-sama!
Enam tujuh delapan sembilan sepuluh,
Pintar berhitung tak lagi mengeluh!
Hore! Hore! Kita semua juara!`}
            </div>
          </div>
        </div>
      )}

      {/* VOICEOVER TAB */}
      {subTab === 'voiceover' && (
        <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
            <Mic className="w-4 h-4" />
            <span>Voiceover & SFX Prompter</span>
          </div>
          <p className="text-xs text-slate-500">
            Kombinasikan teks narasi dengan AI voice generator seperti ElevenLabs untuk menghasilkan suara narator anak atau guru yang ramah.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
            <div className="font-bold text-slate-800">Rekomendasi Profil Karakter Suara:</div>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
              <li><strong>Ibu Guru Ramah:</strong> Nada hangat, intonasi tenang, tempo sedang dengan artikulasi jelas.</li>
              <li><strong>Karakter Anak Ceria:</strong> Nada riang, intonasi antusias, ekspresi melompat gembira.</li>
              <li><strong>Narator Petualangan:</strong> Nada mendongeng, sedikit misterius namun hangat.</li>
            </ul>
          </div>
        </div>
      )}

      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        subtitle="Prompt siap pakai yang dapat digunakan pada AI pilihanmu"
        promptContent={promptText}
      />
    </div>
  );
};
