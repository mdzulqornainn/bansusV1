"use client";

import { theme } from "@/lib/theme";

const PadPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center text-center px-6 py-12 relative z-10 space-y-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23bfdbfe%22 opacity=%220.12%22/></svg>')] pointer-events-none" />

      {/* Gradient circles */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" /> */}

      <header className="relative z-10 m-10">
        <h1
          className={`sm:text-5xl text-3xl font-extrabold mb-4 tracking-tight ${theme.text_title}`}
        >
          📚 Pelatihan Asisten Dosen 2025 📚
        </h1>
        <p
          className={`sm:text-2xl text-xl italic ${theme.text_default} mb-8 max-w-4xl mx-auto`}
        >
          &quot;Membangun Profesionalisme dan Kompetensi Asisten Dosen dalam
          mendukung Kualitas Pembelajaran yang Aktif dan Kolaboratif&quot;
        </p>
      </header>

      {/* Info section */}
      <section className="flex flex-wrap justify-center gap-4 relative z-10">
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📅 Rabu, 13 Agustus 2025
        </span>

        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          ⏰ 08:30 WIB - Selesai
        </span>

        <a
          href="https://maps.app.goo.gl/8ewDKWKvJxmrWdvdA"
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.table_highlight} ${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📍 Ruang GIK L1 C
        </a>

        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          👔 Dress Code: Kemeja bebas, rapi, sopan
        </span>
      </section>

      {/* Wajib hadir */}
      <div className={`${theme.status_warning}`}>
        ⚠ <strong>WAJIB</strong> hadir bagi seluruh Asisten Dosen Semester
        Ganjil 2025/2026 yang belum pernah menjadi asisten sebelumnya.
      </div>

      {/* Materi pelatihan */}
      <section className="w-full max-w-5xl relative z-10">
        <h3
          className={`font-bold text-3xl mb-8 ${theme.text_title} drop-shadow`}
        >
          📂 Materi Pelatihan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Materi 1 - Preview PDF */}
          <a
            href="https://www.aryadzar.my.id/blog/tutorial-vclass-untuk-asisten-8335523070470254305"
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} hover:shadow-lg transition`}
          >
            <div className="text-5xl mb-4">📄</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Tutorial Vclass
            </h4>
            {/* --- DESKRIPSI DIPERBAIKI --- */}
            <p className={`${theme.text_default}`}>
              Panduan lengkap penggunaan Vclass untuk menunjang kegiatan
              asistensi.
            </p>
          </a>

          {/* Materi 2 - PDF */}
          <a
            href="/files/materi-pelasdos-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} hover:shadow-lg transition`}
          >
            <div className="text-5xl mb-4">📕</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Ngasdos itu Sulit gak ya?
            </h4>
            <p className={`${theme.text_default}`}>
              Materi utama mengenai tugas, tanggung jawab, dan tips menjadi
              asisten dosen.
            </p>
          </a>

          {/* Materi 3 - PDF */}
          <a
            href="/files/materi-bansus.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} hover:shadow-lg transition`}
          >
            <div className="text-5xl mb-4">📊</div>
            <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
              Peraturan Lab dan Konversi
            </h4>
            <p className={`${theme.text_default}`}>
              Informasi penting seputar peraturan lab dan skema konversi nilai
              asistensi.
            </p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`text-lg ${theme.text_default} pb-10 relative z-10`}>
        <p>Terima kasih atas perhatian dan partisipasinya.</p>
      </footer>
    </main>
  );
};

export default PadPage;
