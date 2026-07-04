const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { randomInt } = require("crypto");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (optional - uncomment if you want to reset)
  await prisma.courseApplication.deleteMany();
  await prisma.asdosApplication.deleteMany();
  await prisma.jadwalWawancara.deleteMany();
  await prisma.class.deleteMany();
  await prisma.classAsdos.deleteMany();
  await prisma.course.deleteMany();
  await prisma.semester.deleteMany();
  await prisma.prodi.deleteMany();
  await prisma.file.deleteMany();
  await prisma.folder.deleteMany();
  await prisma.image.deleteMany();
  await prisma.asdos.deleteMany();
  await prisma.dosen.deleteMany();
  await prisma.user.deleteMany({
    where: {
      email: { not: "admin.super@gmail.com" },
    },
  });

  const prodis = [
    {
      name: "Manajemen Informatika",
      code: "MI",
      semesters: [
        {
          semester_number: 1,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520101",
              name: "Aplikasi Pengolah Kata Dan Presentasi", // Diperbarui
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520102",
              name: "Dasar-Dasar Pemrograman", // Diperbarui
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520103",
              name: "Logika",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520104",
              name: "Matematika",
            },
          ],
        },
        {
          semester_number: 3,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520201",
              name: "Komunikasi Data Dan Jaringan Komputer", // Diperbarui
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520202",
              name: "Animasi Dasar",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520203",
              name: "Penyuntingan Video",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520204",
              name: "Basis Data",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520205",
              name: "Pemrograman Berbasis Web",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520206",
              name: "Pemrograman Berorientasi Objek",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "MIN520207",
              name: "Rekayasa Kebutuhan Perangkat Lunak",
            },
          ],
        },
      ],
    },
    {
      name: "Sistem Informasi",
      code: "SI",
      semesters: [
        {
          semester_number: 1,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "SIF624102",
              name: "Dasar Pemrograman Dan Algoritma", // Diperbarui
            },
          ],
        },
        {
          semester_number: 3,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "SIF624116",
              name: "Pemrograman Berorientasi Objek",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "SIF624117",
              name: "Rekayasa Perangkat Lunak",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "SIF624118",
              name: "Sistem Basis Data",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "SIF624119",
              name: "Struktur Data",
            },
          ],
        },
      ],
    },
    {
      name: "Ilmu Komputer",
      code: "ILKOM",
      semesters: [
        {
          semester_number: 1,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620103",
              name: "Dasar-Dasar Pemrograman", // Diperbarui
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620104",
              name: "Logika",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620105",
              name: "Matematika",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620106",
              name: "Statistika Dan Probabilitas", // Diperbarui
            },
          ],
        },
        {
          semester_number: 3,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620202",
              name: "Basis Data",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620205",
              name: "Komunikasi Data Dan Jaringan Komputer", // Diperbarui
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620206",
              name: "Pemrograman Berorientasi Objek",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620210",
              name: "Multimedia",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM66666",
              name: "Rekayasa Perangkat Lunak",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM66667",
              name: "Pemrograman Interpreter",
            },
          ],
        },
        {
          semester_number: 5,
          courses: [
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620304",
              name: "Sistem Interaksi",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620305",
              name: "Sistem Pakar",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620306",
              name: "Pemrograman Web Lanjut",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620307",
              name: "Cloud Computing",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620310",
              name: "Pengenalan Pola",
            },
            {
              sks: 3,
              kuota: 2,
              status: "aktif",
              code: "COM620311",
              name: "Sistem Informasi Geografis",
            },
          ],
        },
      ],
    },
  ];

  for (const prodi of prodis) {
    await prisma.prodi.create({
      data: {
        name: prodi.name,
        semester: {
          create: prodi.semesters.map((semester) => ({
            prodiId: prodi.id,
            semesterNumber: semester.semester_number,
            courses: {
              create: semester.courses.map((course) => ({
                semesterId: semester.id,
                sks: course.sks,
                kuota: course.kuota,
                status: course.status,
                code: course.code,
                name: course.name,
              })),
            },
          })),
        },
      },
    });
  }

  const passwordHash = await bcrypt.hash("1234567890-=", 10);

  const users = [
    {
      name: "Dr. Budi Santoso",
      email: "budi.santoso@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Prof. Siti Nurhaliza",
      email: "siti.nurhaliza@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Dr. Ahmad Fauzi",
      email: "ahmad.fauzi@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Prof. Dr. Rina Kartika",
      email: "rina.kartika@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Dr. Ir. Bambang Wijaya",
      email: "bambang.wijaya@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Prof. Dr. Indira Sari",
      email: "indira.sari@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Dr. Muhammad Ridwan",
      email: "muhammad.ridwan@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Dr. Fitri Handayani",
      email: "fitri.handayani@university.ac.id",
      password: passwordHash,
      role: "DOSEN",
      emailVerified: new Date(),
    },
    {
      name: "Ahmad Rizki",
      email: "ahmad.rizki@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Ahmad Rizdsafki",
      email: "ahmad.rizkasi@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Sari Dewi",
      email: "sari.dewi@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Sari Roti",
      email: "sari.roti@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Budi Rahman",
      email: "budi.rahman@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Dewi Lestari",
      email: "dewi.lestari@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Faisal Akbar",
      email: "faisal.akbar@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Nina Safitri",
      email: "nina.safitri@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Rizky Pratama",
      email: "rizky.pratama@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Sinta Maharani",
      email: "sinta.maharani@student.university.ac.id",
      password: passwordHash,
      role: "ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Roni Pratama",
      email: "roni.pratama@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Maya Sari",
      email: "maya.sari@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Andi Setiawan",
      email: "andi.setiawan@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Lina Fitriani",
      email: "lina.fitriani@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Dedy Kurniawan",
      email: "dedy.kurniawan@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Putri Amelia",
      email: "putri.amelia@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Arif Maulana",
      email: "arif.maulana@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Eka Permatasari",
      email: "eka.permatasari@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Teguh Suryanto",
      email: "teguh.suryanto@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Siska Wulandari",
      email: "siska.wulandari@student.university.ac.id",
      password: passwordHash,
      role: "CALON_ASDOS",
      emailVerified: new Date(),
    },
    {
      name: "Guest User",
      email: "guest@university.ac.id",
      password: passwordHash,
      role: "GUEST",
      emailVerified: new Date(),
    },
    {
      name: "Ucup Subarjo",
      email: "ucupsub@university.ac.id",
      password: passwordHash,
      role: "GUEST",
      emailVerified: new Date(),
    },
    {
      name: "Dontol Ngontol",
      email: "dontoldit@university.ac.id",
      password: passwordHash,
      role: "GUEST",
      emailVerified: new Date(),
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  const dataCalonAsdos = await prisma.user.findMany({
    where: { role: "CALON_ASDOS" },
  });

  const dataAsdos = await prisma.user.findMany({
    where: { role: "ASDOS" },
  });

  const files = [
    {
      id: "file-uuid-001",
      namaFile: "surat_pernyataan_roni_pratama.pdf",
      linkView:
        "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz123456/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1AbCdEfGhIjKlMnOpQrStUvWxYz123456",
    },
    {
      id: "file-uuid-002",
      namaFile: "surat_pernyataan_maya_sari.pdf",
      linkView:
        "https://drive.google.com/file/d/1BcDeFgHiJkLmNoPqRsTuVwXyZ234567a/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1BcDeFgHiJkLmNoPqRsTuVwXyZ234567a",
    },
    {
      id: "file-uuid-003",
      namaFile: "surat_pernyataan_andi_setiawan.pdf",
      linkView:
        "https://drive.google.com/file/d/1CdEfGhIjKlMnOpQrStUvWxYzA345678b/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1CdEfGhIjKlMnOpQrStUvWxYzA345678b",
    },
    {
      id: "file-uuid-004",
      namaFile: "surat_pernyataan_lina_fitriani.pdf",
      linkView:
        "https://drive.google.com/file/d/1DeFgHiJkLmNoPqRsTuVwXyZaB456789c/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1DeFgHiJkLmNoPqRsTuVwXyZaB456789c",
    },
    {
      id: "file-uuid-005",
      namaFile: "surat_pernyataan_dedy_kurniawan.pdf",
      linkView:
        "https://drive.google.com/file/d/1EfGhIjKlMnOpQrStUvWxYzAbC567890d/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1EfGhIjKlMnOpQrStUvWxYzAbC567890d",
    },
    {
      id: "file-uuid-006",
      namaFile: "surat_pernyataan_putri_amelia.pdf",
      linkView:
        "https://drive.google.com/file/d/1FgHiJkLmNoPqRsTuVwXyZaBcD678901e/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1FgHiJkLmNoPqRsTuVwXyZaBcD678901e",
    },
    {
      id: "file-uuid-007",
      namaFile: "surat_pernyataan_arif_maulana.pdf",
      linkView:
        "https://drive.google.com/file/d/1GhIjKlMnOpQrStUvWxYzAbCdE789012f/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1GhIjKlMnOpQrStUvWxYzAbCdE789012f",
    },
    {
      id: "file-uuid-008",
      namaFile: "surat_pernyataan_eka_permatasari.pdf",
      linkView:
        "https://drive.google.com/file/d/1HiJkLmNoPqRsTuVwXyZaBcDeF890123g/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1HiJkLmNoPqRsTuVwXyZaBcDeF890123g",
    },
    {
      id: "file-uuid-009",
      namaFile: "surat_pernyataan_teguh_suryanto.pdf",
      linkView:
        "https://drive.google.com/file/d/1IjKlMnOpQrStUvWxYzAbCdEfG901234h/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1IjKlMnOpQrStUvWxYzAbCdEfG901234h",
    },
    {
      id: "file-uuid-010",
      namaFile: "surat_pernyataan_siska_wulandari.pdf",
      linkView:
        "https://drive.google.com/file/d/1JkLmNoPqRsTuVwXyZaBcDeFgH012345i/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1JkLmNoPqRsTuVwXyZaBcDeFgH012345i",
    },
    {
      id: "file-uuid-011",
      namaFile: "surat_pernyataan_roni_pratama.pdf",
      linkView:
        "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz123456/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1AbCdEfGhIjKlMnOpQrStUvWxYz123456",
    },
    {
      id: "file-uuid-012",
      namaFile: "surat_pernyataan_maya_sari.pdf",
      linkView:
        "https://drive.google.com/file/d/1BcDeFgHiJkLmNoPqRsTuVwXyZ234567a/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1BcDeFgHiJkLmNoPqRsTuVwXyZ234567a",
    },
    {
      id: "file-uuid-013",
      namaFile: "surat_pernyataan_andi_setiawan.pdf",
      linkView:
        "https://drive.google.com/file/d/1CdEfGhIjKlMnOpQrStUvWxYzA345678b/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1CdEfGhIjKlMnOpQrStUvWxYzA345678b",
    },
    {
      id: "file-uuid-014",
      namaFile: "surat_pernyataan_lina_fitriani.pdf",
      linkView:
        "https://drive.google.com/file/d/1DeFgHiJkLmNoPqRsTuVwXyZaB456789c/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1DeFgHiJkLmNoPqRsTuVwXyZaB456789c",
    },
    {
      id: "file-uuid-015",
      namaFile: "surat_pernyataan_dedy_kurniawan.pdf",
      linkView:
        "https://drive.google.com/file/d/1EfGhIjKlMnOpQrStUvWxYzAbC567890d/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1EfGhIjKlMnOpQrStUvWxYzAbC567890d",
    },
    {
      id: "file-uuid-016",
      namaFile: "surat_pernyataan_putri_amelia.pdf",
      linkView:
        "https://drive.google.com/file/d/1FgHiJkLmNoPqRsTuVwXyZaBcD678901e/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1FgHiJkLmNoPqRsTuVwXyZaBcD678901e",
    },
    {
      id: "file-uuid-017",
      namaFile: "surat_pernyataan_arif_maulana.pdf",
      linkView:
        "https://drive.google.com/file/d/1GhIjKlMnOpQrStUvWxYzAbCdE789012f/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1GhIjKlMnOpQrStUvWxYzAbCdE789012f",
    },
    {
      id: "file-uuid-018",
      namaFile: "surat_pernyataan_eka_permatasari.pdf",
      linkView:
        "https://drive.google.com/file/d/1HiJkLmNoPqRsTuVwXyZaBcDeF890123g/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1HiJkLmNoPqRsTuVwXyZaBcDeF890123g",
    },
    {
      id: "file-uuid-019",
      namaFile: "surat_pernyataan_teguh_suryanto.pdf",
      linkView:
        "https://drive.google.com/file/d/1IjKlMnOpQrStUvWxYzAbCdEfG901234h/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1IjKlMnOpQrStUvWxYzAbCdEfG901234h",
    },
    {
      id: "file-uuid-020",
      namaFile: "surat_pernyataan_siska_wulandari.pdf",
      linkView:
        "https://drive.google.com/file/d/1JkLmNoPqRsTuVwXyZaBcDeFgH012345i/view?usp=sharing",
      linkDownload:
        "https://drive.google.com/uc?export=download&id=1JkLmNoPqRsTuVwXyZaBcDeFgH012345i",
    },
  ];

  for (const file of files) {
    await prisma.file.create({ data: file });
  }

  const jadwals = [
    {
      tanggal: "07-01-2025",
      hari: "Senin",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-01-2025",
      hari: "Senin",
      jam: "10:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-02-2025",
      hari: "Selasa",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-02-2025",
      hari: "Selasa",
      jam: "10:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-03-2025",
      hari: "Rabu",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-03-2025",
      hari: "Rabu",
      jam: "10:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-04-2025",
      hari: "Kamis",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-05-2025",
      hari: "Jumat",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-06-2025",
      hari: "Sabtu",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
    {
      tanggal: "07-07-2025",
      hari: "Minggu",
      jam: "08:00 WIB",
      lokasi: "LAB LT 3 R1",
    },
  ];

  for (const jadwal of jadwals) {
    await prisma.jadwalWawancara.create({ data: jadwal });
  }

  const dataJadwals = await prisma.jadwalWawancara.findMany({});
  const dataFiles = await prisma.file.findMany();

  const asdosAplicants = [
    {
      npm: "2121001001",
      whatsapp: "081234567890",
      domisili: "Jakarta Selatan",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
      status: "processing",
      bersediaDuaMatkul: true,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2121001002",
      whatsapp: "081234567891",
      domisili: "Jakarta Utara",
      wawancara: "online",
      alasanOnline: "Sedang dalam masa KKN di luar kota",
      alasan:
        "Memiliki passion dalam bidang teknologi dan ingin membantu mahasiswa junior. Pernah menjadi tutor privat dan memiliki pengalaman mengajar.",
      status: "accepted",
      bersediaDuaMatkul: false,
      pengalamanAsdos: true,
      bersediaDitempatkanLain: false,
    },
    {
      npm: "2121001003",
      whatsapp: "081234567892",
      domisili: "Depok",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Saya sangat tertarik untuk menjadi asdos karena ingin berbagi pengetahuan dan pengalaman kepada adik-adik tingkat. Selain itu, saya juga ingin mengasah kemampuan komunikasi dan leadership.",
      status: "processing",
      bersediaDuaMatkul: true,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2020001004",
      whatsapp: "081234567893",
      domisili: "Jakarta Timur",
      wawancara: "online",
      alasanOnline:
        "Memiliki jadwal kuliah yang padat dan sulit untuk datang ke kampus pada waktu wawancara offline",
      alasan:
        "Saya ingin berkontribusi dalam proses pembelajaran di kampus. Dengan IPK 3.8, saya merasa mampu membantu adik tingkat dalam memahami materi kuliah.",
      status: "accepted",
      bersediaDuaMatkul: true,
      pengalamanAsdos: true,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2121001005",
      whatsapp: "081234567894",
      domisili: "Tangerang",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Menjadi asdos adalah salah satu cara untuk mengembangkan soft skill, khususnya dalam hal mengajar dan berkomunikasi. Saya juga ingin membantu meningkatkan kualitas pembelajaran.",
      status: "rejected",
      bersediaDuaMatkul: false,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: false,
    },
    {
      npm: "2020001006",
      whatsapp: "081234567895",
      domisili: "Jakarta Barat",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Saya memiliki pengalaman sebagai tutor dan sangat menyukai proses mengajar. Ingin berkontribusi lebih dalam lingkungan akademik kampus.",
      status: "processing",
      bersediaDuaMatkul: true,
      pengalamanAsdos: true,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2121001007",
      whatsapp: "081234567896",
      domisili: "Bekasi",
      wawancara: "online",
      alasanOnline: "Tinggal jauh dari kampus dan transportasi sulit",
      alasan:
        "Saya ingin mengasah kemampuan public speaking dan leadership melalui kegiatan mengajar. Selain itu, pengalaman ini akan sangat berharga untuk karir saya kedepan.",
      status: "accepted",
      bersediaDuaMatkul: false,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2020001008",
      whatsapp: "081234567897",
      domisili: "Jakarta Pusat",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Sebagai mahasiswa semester 6, saya merasa sudah cukup matang untuk berbagi ilmu. Saya juga aktif dalam organisasi dan memiliki kemampuan komunikasi yang baik.",
      status: "processing",
      bersediaDuaMatkul: true,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: false,
    },
    {
      npm: "2121001009",
      whatsapp: "081234567898",
      domisili: "Bogor",
      wawancara: "online",
      alasanOnline: "Sedang magang dan tidak bisa hadir offline",
      alasan:
        "Ingin menambah pengalaman dalam bidang pendidikan dan mengasah kemampuan mengajar. Saya yakin dapat memberikan kontribusi positif bagi mahasiswa junior.",
      status: "rejected",
      bersediaDuaMatkul: false,
      pengalamanAsdos: false,
      bersediaDitempatkanLain: true,
    },
    {
      npm: "2120001010",
      whatsapp: "081234567899",
      domisili: "Jakarta Selatan",
      wawancara: "offline",
      alasanOnline: null,
      alasan:
        "Saya memiliki passion untuk mengajar dan ingin membantu menciptakan lingkungan belajar yang kondusif. Dengan pengalaman organisasi yang saya miliki, saya yakin dapat menjadi asdos yang baik.",
      status: "accepted",
      bersediaDuaMatkul: true,
      pengalamanAsdos: true,
      bersediaDitempatkanLain: true,
    },
  ];
  const asdoss = [
    {
      npm: "2021001001",
      whatsapp: "081234567890",
      domisili: "Jakarta Selatan",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001002",
      whatsapp: "081234567891",
      domisili: "Jakarta Utara",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001003",
      whatsapp: "081234567892",
      domisili: "Jakarta Timur",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001004",
      whatsapp: "081234567893",
      domisili: "Jakarta Barat",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001005",
      whatsapp: "081234567894",
      domisili: "Jakarta Pusat",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001006",
      whatsapp: "081234567895",
      domisili: "Jakarta Tengah",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001007",
      whatsapp: "081234567896",
      domisili: "Jakarta Selatan",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001008",
      whatsapp: "081234567897",
      domisili: "Jakarta Utara",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001009",
      whatsapp: "081234567898",
      domisili: "Jakarta Timur",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
    {
      npm: "2021001010",
      whatsapp: "081234567899",
      domisili: "Jakarta Barat",
      alasan:
        "Ingin mengembangkan kemampuan mengajar dan berbagi ilmu dengan juniors. Saya memiliki IPK yang baik dan aktif dalam organisasi kemahasiswaan.",
    },
  ];

  for (let i = 0; i < asdosAplicants.length; i++) {
    await prisma.asdosApplication.create({
      data: {
        npm: asdosAplicants[i].npm,
        whatsapp: asdosAplicants[i].whatsapp,
        domisili: asdosAplicants[i].domisili,
        wawancara: asdosAplicants[i].wawancara,
        alasanOnline: asdosAplicants[i].alasanOnline,
        alasan: asdosAplicants[i].alasan,
        status: asdosAplicants[i].status,
        bersediaDuaMatkul: asdosAplicants[i].bersediaDuaMatkul,
        pengalamanAsdos: asdosAplicants[i].pengalamanAsdos,
        bersediaDitempatkanLain: asdosAplicants[i].bersediaDitempatkanLain,
        suratPernyataan: {
          connect: { id: dataFiles[i].id },
        },
        user: {
          connect: { id: dataCalonAsdos[i].id },
        },
        jadwalWawancara: {
          connect: { id: dataJadwals[i].id },
        },
      },
    });
  }

  for (let i = 0; i < asdoss.length; i++) {
    await prisma.asdos.create({
      data: {
        npm: asdoss[i].npm,
        whatsapp: asdoss[i].whatsapp,
        domisili: asdoss[i].domisili,
        alasan: asdoss[i].alasan,
        suratPernyataan: {
          connect: { id: dataFiles[i + 10].id },
        },
        user: {
          connect: { id: dataAsdos[i].id },
        },
      },
    });
  }

  const dataCourses = await prisma.course.findMany({});
  const dataAsdosAplicants = await prisma.asdosApplication.findMany({});
  const dataAsdoss = await prisma.asdos.findMany({});

  for (let i = 0; i < dataAsdosAplicants.length; i++) {
    await prisma.courseApplication.create({
      data: {
        asdosApplicationId: dataAsdosAplicants[i].id,
        courseId: dataCourses[i].id,
      },
    });
    await prisma.courseApplication.create({
      data: {
        asdosApplicationId: dataAsdosAplicants[i].id,
        courseId: dataCourses[i + 1].id,
      },
    });
  }

  const classs = [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
  ];

  for (const course of dataCourses) {
    for (const cls of classs) {
      await prisma.class.create({
        data: {
          name: cls.name,
          courseId: course.id,
        },
      });
    }
  }

  const dataClasses = await prisma.class.findMany({});

  // for (let i = 0; i < dataAsdoss.length; i++) {
  //   await prisma.classAsdos.create({
  //     data: {
  //       classId: dataClasses[i].id,
  //       asdosNpm: dataAsdoss[i].npm,
  //     },
  //   });
  // }

  for (const asdos of dataAsdoss) {
    for (let i = 0; i < 2; i++) {
      await prisma.classAsdos.create({
        data: {
          classId: dataClasses[randomInt(0, dataClasses.length - 1)].id,
          asdosNpm: asdos.npm,
        },
      });
    }
  }

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
