// app/peer/page.tsx
"use client";

import { theme } from "@/lib/theme";

const PeerPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center text-center px-6 py-12 relative z-10 space-y-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23bfdbfe%22 opacity=%220.12%22/></svg>')] pointer-events-none" />
      
      
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div> */}


      {/* Header */}
      <header className="relative z-10 m-10">
        <h1
          className={`sm:text-5xl text-3xl font-extrabold mb-4 tracking-tight ${theme.text_title}`}
        >
          Peer Group 2025
        </h1>
        <p
          className={`sm:text-2xl text-xl italic ${theme.text_default} mb-8 max-w-4xl mx-auto`}
        >
          &quot;Berkarya, Berkembang, dan Berkolaborasi Bersama&quot;
        </p>
      </header>

      {/* Info section */}
      <section className="flex flex-wrap justify-center gap-4 relative z-10">
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📅 20 Sep (Offline) · 27 Sep (Online) · 11 Okt (Offline)
        </span>
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          ⏰ 09.00-11.00 &amp; 13.00-15.00
        </span>
        <a
          href="https://share.google/nAiqy5baODZVNiOhJ"
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.table_highlight} ${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📍 Lab L3, RPL, MIPA T (A &amp; B), Zoom
        </a>
      </section>

      {/* Informasi Umum */}
      <section className="w-full max-w-4xl relative z-10">
        <h3
          className={`font-bold text-3xl mb-6 ${theme.text_title}`}
        >
          Informasi Umum
        </h3>
        <div
          className={`${theme.hover_glow_light} p-8 rounded-2xl ${theme.card_shadow} text-lg text-left ${theme.text_default}`}
        >
          <ul className="space-y-3">
            <li>
              💡 <strong>Durasi:</strong> 3 pertemuan, 1 minggu jeda untuk
              mengerjakan project.
            </li>
            <li>
              💻 <strong>Fasilitas:</strong> Peserta tanpa laptop akan
              diprioritaskan di lab.
            </li>
            <li>
              📩 <strong>Reminder:</strong> Peserta akan diingatkan setiap malam
              sebelum acara, beserta gambaran materi.
            </li>
            <li>
              📹 <strong>Tugas Pengganti:</strong> Berupa video untuk peserta
              yang berhalangan hadir.
            </li>
            <li>
              🏆 <strong>Apresiasi:</strong> Nilai + untuk peserta aktif di mata
              kuliah DDP.
            </li>
            <li>
              📝 <strong>Evaluasi:</strong> Survei kritik dan saran setiap
              pertemuan.
            </li>
          </ul>
        </div>
      </section>

      {/* Materi Peer Group */}
      <section id="materi" className="w-full max-w-6xl relative z-10">
        <h3
          className={`font-bold text-3xl mb-8 ${theme.text_title}`}
        >
          Materi Peer Group
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} transition`}
          >
            <div className="text-5xl mb-4">📍</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Hari Pertama
            </h4>
            <p className={`${theme.text_default}`}>
              Pengenalan VSCode, instalasi C++, dan konfigurasi GitHub.
            </p>
          </div>
          <div
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} transition`}
          >
            <div className="text-5xl mb-4">💡</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Hari Kedua
            </h4>
            <p className={`${theme.text_default}`}>
              Materi hasil survei, pendalaman Hackerrank, dan tugas mini project
              kelompok.
            </p>
          </div>
          <div
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} transition`}
          >
            <div className="text-5xl mb-4">🎤</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Hari Ketiga
            </h4>
            <p className={`${theme.text_default}`}>
              Presentasi kelompok dan evaluasi akhir.
            </p>
          </div>
        </div>
      </section>

      {/* Sertifikat */}
      <div className={`${theme.status_accepted} border-green-300 p-6 rounded-2xl ${theme.card_shadow} max-w-4xl relative z-10 border`}>
        {/*className={`${theme.status_accepted} max-w-4xl`}> */}
        🎓 Peserta yang mengikuti seluruh rangkaian acara dan mengerjakan tugas
        dengan baik akan mendapatkan sertifikat yang dapat digunakan untuk
        konversi nilai DDP sebesar 10-15%.
      </div>

      {/* Footer */}
      <footer className={`text-lg ${theme.text_default} pb-10 relative z-10`}>
        <p>Terima kasih atas perhatian dan partisipasinya.</p>
      </footer>
    </main>
  );
};

export default PeerPage;
