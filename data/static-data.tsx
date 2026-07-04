import {
  Award,
  BookOpen,
  Calculator,
  Code,
  Database,
  FileText,
  Globe,
  GoalIcon,
  GraduationCap,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

export const timelineOprec = {
  start: "03 Juli 2026",
  end: "08 Juli 2026",
};

export const informationHero = [
  {
    value: "80+",
    description: "Posisi Tersedia",
  },
  {
    value: "35+",
    description: "Mata Kuliah",
  },
  {
    value: "16",
    description: "Pertemuan/Semester",
  },
];

export const timeline = [
  {
    date: "03 Juli 2026 - 08 Juli 2026",
    title: "Pendaftaran Online",
    description: "Pengisian formulir dan upload berkas",
    status: "upcoming" as const,
  },
  // {
  //   date: "09 Juli 2026 - 14 Juli 2026",
  //   title: "Pendaftaran Online Extend",
  //   description: "Pengisian formulir dan upload berkas",
  //   status: "upcoming" as const,
  // },
  {
    date: "15 Juli 2026",
    title: "Seleksi Administrasi",
    description: "Verifikasi berkas dan persyaratan",
    status: "upcoming" as const,
  },
  {
    date: "20 Juli 2026 - 25 Juli 2026",
    title: "Tes & Wawancara",
    description: "Tes kemampuan dan studi kasus",
    status: "upcoming" as const,
  },
  {
    date: "01 Agustus 2026",
    title: "Pengumuman Hasil",
    description: "Publikasi hasil seleksi",
    status: "upcoming" as const,
  },
  {
    date: "12 Agustus 2026",
    title: "Pelatihan Asisten Dosen",
    description: "Pengenalan tugas dan sistem",
    status: "upcoming" as const,
  },
] as const;

export const requirements = [
  {
    text: "Mahasiswa Aktif Jurusan Ilmu Komputer Universitas Lampung minimal angkatan 2025.",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    text: "Telah lulus mata kuliah yang akan diasisteni",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    text: "Bersedia mengikuti ketentuan yang ditetapkan.",
    icon: <Star className="w-5 h-5" />,
  },
  {
    text: "Mampu berkomunikasi dengan baik.",
    icon: <GoalIcon className="w-5 h-5" />,
  },
  {
    text: "Bertanggung jawab dan berkomitmen tinggi.",
    icon: <Target className="w-5 h-5" />,
  },
];

export const subjects = [
  {
    category: "S1 - Ilmu Komputer",
    icon: <Code className="w-6 h-6" />,
    courses: [
      { name: "Pemrograman Dasar", code: "TIF101", slots: 4 },
      { name: "Struktur Data", code: "TIF201", slots: 3 },
      { name: "Pemrograman Web", code: "TIF301", slots: 5 },
      { name: "Basis Data", code: "TIF302", slots: 4 },
      { name: "Pemrograman Mobile", code: "TIF401", slots: 3 },
    ],
  },
  {
    category: "S1 - Sistem Informasi",
    icon: <Database className="w-6 h-6" />,
    courses: [
      { name: "Analisis Sistem", code: "SIF201", slots: 3 },
      { name: "Manajemen Proyek TI", code: "SIF301", slots: 2 },
      { name: "E-Business", code: "SIF302", slots: 3 },
      { name: "Audit Sistem Informasi", code: "SIF401", slots: 2 },
    ],
  },
  {
    category: "D3 - Management Informatika",
    icon: <Calculator className="w-6 h-6" />,
    courses: [
      { name: "Kalkulus I", code: "MAT101", slots: 6 },
      { name: "Kalkulus II", code: "MAT102", slots: 5 },
      { name: "Aljabar Linear", code: "MAT201", slots: 4 },
      { name: "Statistika", code: "MAT301", slots: 4 },
    ],
  },
];

export const benefits = [
  {
    title: "Honor Kompetitif",
    description: "Mendapatkan honor yang kompetitif",
    icon: <Award className="w-6 h-6" />,
  },
  {
    title: "Pengalaman Mengajar",
    description: "Soft skill yang berharga untuk karir",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Sertifikat",
    description: "Dapatkan sertifikat dan penghargaan",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Networking",
    description: "Koneksi dengan dosen dan mahasiswa",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Konversi SKS",
    description: "Mengkonversi matakuliah tugas khusus",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    title: "Skill Development",
    description: "Peningkatan kemampuan teknis",
    icon: <Target className="w-6 h-6" />,
  },
];

export const documents = [
  "Transkrip nilai terbaru",
  "Surat rekomendasi dari dosen",
  "CV dan portofolio",
  "Fotokopi KTM",
  "Pas foto 3x4 (2 lembar)",
  "Surat pernyataan kesediaan",
];
