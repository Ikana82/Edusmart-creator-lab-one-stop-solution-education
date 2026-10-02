import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  MessageSquare, 
  Palette,
  Download
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const KomikGeneratorView: React.FC = () => {
  const [topic, setTopic] = useState('Pahlawan Hemat Energi di Rumah');
  const [characterMain, setCharacterMain] = useState('Kiki (anak laki-laki usia 8 tahun yang cerdik memakai kaos kuning) & Rina (kakak perempuannya)');
  const [visualStyle, setVisualStyle] = useState('Cute Flat Cartoon');
  const [panelCount, setPanelCount] = useState<number>(4);

  const [modalOpen, setModalOpen] = useState(false);
  const [promptText, setPromptText] = useState('');

  const samplePanels = [
    {
      panel: 1,
      title: 'Panel 1: Pengantar Masalah',
      scene: 'Kiki keluar dari kamarnya yang terang benderang padahal sudah siang hari, kipas angin dan lampu menyala kosong.',
      dialogue: 'Kiki: "Asyik, waktunya nonton TV di ruang tengah!"',
      prompt: 'Panel 1: Boy walking out of room leaving lights and fan running on a bright sunny morning, expressive cute 2d cartoon.'
    },
    {
      panel: 2,
      title: 'Panel 2: Teguran Hangat',
      scene: 'Kakak Rina datang sambil menunjuk ke arah saklar lampu dengan senyum bersahabat.',
      dialogue: 'Rina: "Kiki, tunggu dulu! Kamarmu masih menyala semua, lho."',
      prompt: 'Panel 2: Older sister smiling gently pointing towards the glowing open doorway and light switch.'
    },
    {
      panel: 3,
      title: 'Panel 3: Edukasi Konsep',
      scene: 'Kiki dan Rina mematikan saklar bersama. Di atas kepala muncul gelembung visual bumi tersenyum hijau.',
      dialogue: 'Rina: "Mematikan listrik saat tidak dipakai membantu bumi kita tetap sejuk dan hemat energi!"',
      prompt: 'Panel 3: Both kids turning off switch together, a smiling green planet earth thought bubble above.'
    },
    {
      panel: 4,
      title: 'Panel 4: Resolusi & Tos Bersama',
      scene: 'Kiki dan Rina melakukan tos (high-five) gembira menjadi Pahlawan Cilik Hemat Energi.',
      dialogue: 'Kiki: "Siap Kak! Mulai sekarang Kiki jadi Pahlawan Hemat Energi!"',
      prompt: 'Panel 4: Cheerful high-five celebration, colorful energy saver star badge in background.'
    }
  ];

  const handleGeneratePrompt = () => {
    let output = `EDUSMART 4-PANEL EDUCATIONAL COMIC STRIP PROMPT
==================================================
Topik           : ${topic}
Tokoh Konsisten : ${characterMain}
Gaya Visual     : ${visualStyle}
Format          : 4-Panel Comic Strip (A4 Landscape / Grid 2x2)

PROMPT GENERATOR PER PANEL:
--------------------------------------------------
Panel 1:
Scene: ${samplePanels[0].scene}
Balon Ucapan: ${samplePanels[0].dialogue}
Visual Prompt: ${samplePanels[0].prompt}, style: ${visualStyle}, clean gutters, high readability speech bubbles.

Panel 2:
Scene: ${samplePanels[1].scene}
Balon Ucapan: ${samplePanels[1].dialogue}
Visual Prompt: ${samplePanels[1].prompt}, same character consistency, clean line art.

Panel 3:
Scene: ${samplePanels[2].scene}
Balon Ucapan: ${samplePanels[2].dialogue}
Visual Prompt: ${samplePanels[2].prompt}, clear emotional expressions.

Panel 4:
Scene: ${samplePanels[3].scene}
Balon Ucapan: ${samplePanels[3].dialogue}
Visual Prompt: ${samplePanels[3].prompt}, triumphant happy ending, print-ready 300 DPI.`;

    setPromptText(output);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>EduSmart Comic Studio · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            Komik Edukasi 4-Panel Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rancang strip komik pembelajaran dengan karakter konsisten, alur cerita inkuiri, dan dialog ramah anak.
          </p>
        </div>

        <button
          onClick={handleGeneratePrompt}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Prompt Komik</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-amber-100 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Topik Komik:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tokoh & Konsistensi:</label>
            <textarea
              value={characterMain}
              onChange={(e) => setCharacterMain(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Style Gambar:</label>
            <select
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            >
              <option value="Cute Flat Cartoon">Cute Flat Cartoon</option>
              <option value="Manga Chibi Style">Manga Chibi Style</option>
              <option value="Watercolor Storybook">Watercolor Storybook</option>
              <option value="3D Pixar Animation">3D Pixar Animation</option>
            </select>
          </div>
        </div>

        {/* Right 4-Panel Grid Mockup (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-100 p-6 rounded-3xl border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {samplePanels.map((p) => (
              <div key={p.panel} className="bg-white rounded-2xl border border-slate-300 p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5 font-bold text-slate-700">
                  <span>{p.title}</span>
                  <span className="font-mono text-amber-600">Panel #{p.panel}</span>
                </div>

                <div className="h-28 bg-amber-50/50 rounded-xl border border-dashed border-amber-200 flex flex-col items-center justify-center text-center p-3 text-xs text-slate-500">
                  <span className="text-2xl mb-1">{p.panel === 1 ? '💡' : p.panel === 2 ? '👧' : p.panel === 3 ? '🌍' : '🙌'}</span>
                  <span className="line-clamp-2">{p.scene}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium">
                  💬 {p.dialogue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Prompt Komik Strip 4-Panel Edukasi"
        subtitle="Prompt per panel lengkap dengan deskripsi adegan dan teks balon"
        promptContent={promptText}
      />
    </div>
  );
};
