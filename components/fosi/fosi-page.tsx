// app/fosi/page.tsx
"use client";

import { theme } from "@/lib/theme";
import Image from "next/image";

export default function FosiPage() {
  return (
    <main className="min-h-screen flex flex-col items-center text-center px-6 py-12 relative z-10 space-y-16">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23bfdbfe%22 opacity=%220.12%22/></svg>')] pointer-events-none" />

      {/* Dekorasi */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div> */}

      {/* Judul */}
      <header className="relative z-10 m-10">
        <h1
          className={`sm:text-5xl text-3xl font-extrabold mb-4 tracking-tight ${theme.text_title}`}
        >
          ✨ FoSi 2 Asisten Dosen 2025 ✨
        </h1>
        <p
          className={`sm:text-2xl text-xl italic ${theme.text_default} mb-8 max-w-4xl mx-auto`}
        >
          &quot;Refleksi dan Kolaborasi Asisten Dosen Menuju Penguatan
          Kompetensi dan Pendidikan Unggul&quot;
        </p>
      </header>

      {/* Info Singkat */}
      <section className="flex flex-wrap justify-center gap-4">
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📆 Minggu, 19 Oktober 2025
        </span>
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          ⏰ 13:30 WIB - Selesai
        </span>
        <a
          href="https://maps.app.goo.gl/8ewDKWKvJxmrWdvdA"
          target="_blank"
          rel="noopener noreferrer"
          className={`${theme.table_highlight} ${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          📍 GIK Lantai 2
        </a>
        <span
          className={`${theme.hover_glow_light} px-6 py-3 rounded-full ${theme.text_title}`}
        >
          👔 Dresscode: Bebas Sopan
        </span>
      </section>

      {/* Catatan Penting */}
      <div className={`${theme.status_warning}`}>
        ⚠ <strong>WAJIB</strong> bagi seluruh Asisten Dosen Semester Ganjil
        2025 untuk hadir dan mengikuti kegiatan ini sebagai syarat mendapatkan
        sertifikat.
      </div>

      {/* Tujuan Kegiatan */}
      <section className="w-full max-w-5xl">
        <h3
          className={`font-bold text-3xl mb-8 ${theme.text_title}`}
        >
          🎯 Tujuan Kegiatan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "🤝",
              title: "Mempererat Hubungan",
              desc: "Meningkatkan keakraban antara Asisten Dosen dan Badan Khusus.",
            },
            {
              icon: "💡",
              title: "Refleksi",
              desc: "Melakukan evaluasi diri untuk peningkatan kualitas mengajar dan mendampingi mahasiswa.",
            },
            {
              icon: "📚",
              title: "Penguatan Kompetensi",
              desc: "Membekali asisten dengan keterampilan tambahan untuk mendukung pendidikan unggul.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${theme.table_highlight} ${theme.hover_glow_light} rounded-xl p-6 ${theme.card_shadow} transition`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className={`text-xl font-bold mb-2 ${theme.text_title}`}>
                {item.title}
              </h4>
              <p className={`${theme.text_default}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rundown Acara */}
      <section className="w-full max-w-4xl">
        <h3
          className={`font-bold text-3xl mb-8 ${theme.text_title}`}
        >
          📋 Rundown Acara
        </h3>
        <ul
          className={`text-left space-y-3 p-6 rounded-2xl ${theme.card_shadow} border ${theme.hover_glow_light} ${theme.text_default} transition`}
        >
          {[
            "13.30 - 13.45 → Registrasi Peserta",
            "13.45 - 14.00 → Pembukaan & Sambutan",
            "14.00 - 15.00 → Sesi Refleksi & Sharing",
            "15.00 - 16.00 → Games & Ice Breaking",
            "16.00 - 16.30 → Penyusunan Rencana Kolaborasi",
            "16.30 - Selesai → Penutup & Dokumentasi",
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Dokumentasi */}
      <section className="w-full max-w-6xl">
        <h3
          className={`font-bold text-3xl mb-8 ${theme.text_title}`}
        >
          📸 Dokumentasi Kegiatan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["imgfosi1.jpg", "imgfosi2.jpg", "imgfosi3.jpg", "imgfosi4.jpg"].map(
            (src, i) => (
              <div
                key={i}
                className={`${theme.hover_default} w-full h-48 relative rounded-xl overflow-hidden ${theme.card_shadow} transition`}
              >
                <Image
                  src={`/${src}`}
                  alt={`Dokumentasi ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>
        <a
          href="https://drive.google.com/drive/folders/1zXkJzC0rZQ6zijPR1zZrHhb5gHuY5lRL"
          target="_blank"
          rel="noopener noreferrer"
          className={`block mt-4 ${theme.text_title} hover:underline font-medium`}
        >
          📂 Lihat Semua Dokumentasi di Google Drive
        </a>
      </section>

      {/* Footer */}
      <footer className={`text-lg ${theme.text_default} pb-10`}>
        <p>
          Terima kasih atas perhatian dan partisipasinya. Sampai jumpa di FoSi
          2! 🙌
        </p>
      </footer>
    </main>
  );
}
