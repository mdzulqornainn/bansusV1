export const formatIndoDate = (date: Date | string | null | undefined): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};



export function isOprecOpen(dbData: any): boolean {
  if (!dbData || !dbData.status) return false;

  const now = new Date();
  const start = new Date(dbData.recStart);
  const end = new Date(dbData.recEnd);
  
  const exStart = dbData.recExStart ? new Date(dbData.recExStart) : null;
  const exEnd = dbData.recExEnd ? new Date(dbData.recExEnd) : null;

  const isMainPeriodActive = now >= start && now <= end;
  const isExtensionPeriodActive = exStart && exEnd ? (now >= exStart && now <= exEnd) : false;

  return isMainPeriodActive || isExtensionPeriodActive;
}


export function mapDBToHeroInfo(dbData: any) {
  if (!dbData) return { startLabel: "-", endLabel: "-" };

  return {
    startLabel: formatIndoDate(dbData.recStart),
    endLabel: formatIndoDate(dbData.recExEnd || dbData.recEnd),
  };
}

export function mapDBToTimeline(dbData: any) {
  if (!dbData) return [];

  return [
    {
      title: "Pendaftaran Utama",
      date: `${formatIndoDate(dbData.recStart)} - ${formatIndoDate(dbData.recEnd)}`,
      description: "Periode pengisian formulir dan unggah berkas administrasi utama.",
      status: "scheduled" as any,
    },
    ...(dbData.recExStart ? [{
      title: "Masa Perpanjangan (Extend)",
      date: `${formatIndoDate(dbData.recExStart)} - ${formatIndoDate(dbData.recExEnd)}`,
      description: "Waktu tambahan bagi pendaftar yang belum sempat melengkapi berkas.",
      status: "scheduled" as any,
    }] : []),
    {
      title: "Seleksi Administrasi",
      date: formatIndoDate(dbData.seleksiAdmin),
      description: "Proses verifikasi berkas dan dokumen kelayakan oleh tim laboratorium.",
      status: "scheduled" as any,
    },
    {
      title: "Jadwal Wawancara",
      date: `${formatIndoDate(dbData.wawancaraStart)} - ${formatIndoDate(dbData.wawancaraEnd)}`,
      description: "Uji kompetensi teknis dan kesiapan komitmen tatap muka / online.",
      status: "scheduled" as any,
    },
    {
      title: "Tanggal Pengumuman",
      date: formatIndoDate(dbData.pengumuman),
      description: "Perilisan daftar nama mahasiswa yang lolos menjadi asisten dosen.",
      status: "scheduled" as any,
    },
    {
      title: "Periode Orientasi",
      date: `${formatIndoDate(dbData.orientasiStart)} - ${formatIndoDate(dbData.orientasiEnd)}`,
      description: "Pembekalan teknis prapembelajaran dan pembagian kelas laboratorium.",
      status: "scheduled" as any,
    },
  ];
}