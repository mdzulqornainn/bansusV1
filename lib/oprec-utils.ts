export const formatIndoDate = (date: Date | string | null | undefined): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * LOGIKA UTAMA: Menentukan apakah status pendaftaran aktif (BUKA atau TUTUP)
 * Mengecek keaktifan sakelar Master Switch serta rentang waktu pendaftaran saat ini.
 */
export function isOprecOpen(dbData: any): boolean {
  // Jika master switch dimatikan manual oleh admin, pendaftaran otomatis tutup
  if (!dbData || !dbData.status) return false;

  const now = new Date();
  const start = new Date(dbData.recStart);
  const end = new Date(dbData.recEnd);
  
  // Ambil jendela waktu perpanjangan jika dikonfigurasi oleh admin
  const exStart = dbData.recExStart ? new Date(dbData.recExStart) : null;
  const exEnd = dbData.recExEnd ? new Date(dbData.recExEnd) : null;

  const isMainPeriodActive = now >= start && now <= end;
  const isExtensionPeriodActive = exStart && exEnd ? (now >= exStart && now <= exEnd) : false;

  return isMainPeriodActive || isExtensionPeriodActive;
}

/**
 * MAPPING HERO INFO: Mengembalikan label tanggal untuk komponen Badge Periode di Hero Section.
 * Jika ada perpanjangan waktu, batas penutupan otomatis bergeser mengikuti tanggal extended.
 */
export function mapDBToHeroInfo(dbData: any) {
  if (!dbData) return { startLabel: "-", endLabel: "-" };

  return {
    startLabel: formatIndoDate(dbData.recStart),
    endLabel: formatIndoDate(dbData.recExEnd || dbData.recEnd),
  };
}

/**
 * MAPPING TIMELINE: Mengubah baris data tunggal dari database menjadi array terstruktur
 * untuk disuplai langsung ke dalam komponen <TimelineSection /> secara dinamis.
 */
export function mapDBToTimeline(dbData: any) {
  if (!dbData) return [];

  return [
    {
      title: "Pendaftaran Utama",
      date: `${formatIndoDate(dbData.recStart)} - ${formatIndoDate(dbData.recEnd)}`,
    },
    // Blok perpanjangan hanya akan muncul di linimasa jika diisi oleh admin
    ...(dbData.recExStart ? [{
      title: "Masa Perpanjangan (Extend)",
      date: `${formatIndoDate(dbData.recExStart)} - ${formatIndoDate(dbData.recExEnd)}`,
    }] : []),
    {
      title: "Seleksi Administrasi",
      date: formatIndoDate(dbData.seleksiAdmin),
    },
    {
      title: "Jadwal Wawancara",
      date: `${formatIndoDate(dbData.wawancaraStart)} - ${formatIndoDate(dbData.wawancaraEnd)}`,
    },
    {
      title: "Tanggal Pengumuman",
      date: formatIndoDate(dbData.pengumuman),
    },
    {
      title: "Periode Orientasi",
      date: `${formatIndoDate(dbData.orientasiStart)} - ${formatIndoDate(dbData.orientasiEnd)}`,
    },
  ];
}