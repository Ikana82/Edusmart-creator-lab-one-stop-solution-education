import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  Users, 
  Award,
  Layers
} from 'lucide-react';
import { PromptModal } from '../common/PromptModal';

export const LkpdGeneratorView: React.FC = () => {
  const [topic, setTopic] = useState('Penyelidikan Gaya Magnet & Sifat Kutub');
  const [grade, setGrade] = useState('Kelas 4 SD (Fase B)');
  const [subject, setSubject] = useState('IPAS (Ilmu Pengetahuan Alam & Sosial)');
  const [pancasilaProfile, setPancasilaProfile] = useState<string[]>([
    'Bernalar Kritis',
    'Gotong Royong',
    'Kreatif'
  ]);
  const [learningObjective, setLearningObjective] = useState(
    'Peserta didik dapat mengidentifikasi benda magnetis dan non-magnetis serta membuktikan sifat kutub magnet melalui percobaan langsung.'
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePrompt = () => {
    const output = `FORMAT RESMI LKPD KURIKULUM MERDEKA
==================================================
Mata Pelajaran    : ${subject}
Fase / Jenjang    : ${grade}
Topik             : ${topic}
Profil Pancasila  : ${pancasilaProfile.join(', ')}
Tujuan Belajar    : ${learningObjective}

==================================================
BAGIAN 1: PERTANYAAN PEMANTIK
"Pernahkah kalian melihat hiasan kulkas menempel erat tanpa lem? Mengapa ada benda yang tertarik magnet dan ada yang tidak?"

BAGIAN 2: ALAT DAN BAHAN EKSPLORASI
1. Dua buah magnet batang (berlabel kutub U dan S).
2. Klip kertas logam, penghapus pensil, uang koin, kertas, dan sendok plastik.
3. Lembar tabel pengamatan inkuiri.

BAGIAN 3: LANGKAH KERJA PENYELIDIKAN
1. Dekatkan ujung magnet ke masing-masing benda. Catat mana yang menempel dan tidak menempel.
2. Dekatkan kutub magnet sejenis (U dengan U). Rasakan apa yang terjadi!
3. Dekatkan kutub magnet berlawanan (U dengan S). Rasakan apa yang terjadi!

BAGIAN 4: TABEL HASIL PENGAMATAN
| No | Nama Benda | Menempel / Tidak | Kesimpulan Benda |
| 1  | Klip Kertas| Menempel         | Magnetis         |
| 2  | Penghapus  | Tidak Menempel   | Non-Magnetis     |
| 3  | Koin Logam | Menempel         | Magnetis         |
| 4  | Kertas     | Tidak Menempel   | Non-Magnetis     |

BAGIAN 5: KESIMPULAN MANDIRI KELOMPOK
- Benda yang dapat ditarik magnet disebut: ______________
- Kutub yang senama akan saling: ______________________
- Kutub yang berlawanan akan saling: __________________

BAGIAN 6: RUBRIK ASESMEN PROSES (1-4)
- Partisipasi aktif dalam kelompok
- Ketepatan mencatat data hasil penyelidikan
- Keberanian mempresentasikan kesimpulan di depan kelas.`;

    setPromptText(output);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-amber-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>EduSmart LKPD Generator · Ikanuraisma</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 font-heading">
            LKPD Kurikulum Merdeka Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Susun Lembar Kerja Peserta Didik berbasis inkuiri sains dengan Capaian Pembelajaran dan Rubrik Asesmen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={handleGeneratePrompt}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ekspor Modul Ajar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-amber-100 shadow-xs space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Topik Pembelajaran:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Mata Pelajaran:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Jenjang / Fase:</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tujuan Pembelajaran:</label>
            <textarea
              value={learningObjective}
              onChange={(e) => setLearningObjective(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1.5">
              Dimensi Profil Pelajar Pancasila:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                'Bernalar Kritis',
                'Gotong Royong',
                'Kreatif',
                'Mandiri',
                'Berkebinekaan Global'
              ].map((dim) => {
                const checked = pancasilaProfile.includes(dim);
                return (
                  <label key={dim} className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setPancasilaProfile([...pancasilaProfile, dim]);
                        else setPancasilaProfile(pancasilaProfile.filter(p => p !== dim));
                      }}
                      className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
                    />
                    <span>{dim}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Document Preview (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 text-slate-900">
          {/* Header Lembaga / Sekolah */}
          <div className="text-center border-b-2 border-slate-800 pb-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
              LEMBAR KERJA PESERTA DIDIK (LKPD)
            </h4>
            <h3 className="text-base font-extrabold text-amber-900 font-heading">
              {topic}
            </h3>
            <p className="text-[11px] text-slate-500">
              {subject} · {grade} · Kurikulum Merdeka
            </p>
          </div>

          {/* Identitas Siswa */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs">
            <div><strong>Nama Anggota Kelompok:</strong> 1. ............ 2. ............</div>
            <div><strong>Kelas / Semester:</strong> .................... / Ganjil</div>
          </div>

          {/* Section Inkuiri */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-2">
              A. Pertanyaan Pemantik Penyelidikan
            </h5>
            <p className="text-slate-700 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              "Pernahkah kamu melihat hiasan kulkas menempel kuat tanpa bantuan selotip atau lem? Mengapa ada benda yang tertarik magnet dan benda yang tidak terpengaruh sama sekali?"
            </p>
          </div>

          {/* Tabel Pengamatan */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-2">
              B. Tabel Eksplorasi Sains
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-left">
                <thead className="bg-slate-100 font-bold">
                  <tr>
                    <th className="border border-slate-300 p-1.5">No</th>
                    <th className="border border-slate-300 p-1.5">Benda Uji</th>
                    <th className="border border-slate-300 p-1.5">Reaksi Magnet</th>
                    <th className="border border-slate-300 p-1.5">Sifat Benda</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-1.5">1</td>
                    <td className="border border-slate-300 p-1.5">Klip Kertas Logam</td>
                    <td className="border border-slate-300 p-1.5">Menempel kuat</td>
                    <td className="border border-slate-300 p-1.5">Magnetis</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5">2</td>
                    <td className="border border-slate-300 p-1.5">Penghapus Pensil</td>
                    <td className="border border-slate-300 p-1.5">Tidak bereaksi</td>
                    <td className="border border-slate-300 p-1.5">Non-Magnetis</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5">3</td>
                    <td className="border border-slate-300 p-1.5">Sendok Plastik</td>
                    <td className="border border-slate-300 p-1.5">Tidak bereaksi</td>
                    <td className="border border-slate-300 p-1.5">Non-Magnetis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Kesimpulan */}
          <div className="space-y-1.5 text-xs">
            <h5 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-2">
              C. Kesimpulan Bersama
            </h5>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-slate-600">
              <p>1. Benda yang dapat ditarik kuat oleh magnet adalah benda yang terbuat dari bahan: ________________</p>
              <p>2. Kutub magnet yang senama jika didekatkan akan saling: ________________</p>
            </div>
          </div>
        </div>
      </div>

      <PromptModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Format Teks Modul LKPD Siap Pakai"
        subtitle="Dapat langsung disalin dan digunakan pada dokumen atau platform pilihanmu"
        promptContent={promptText}
      />
    </div>
  );
};
