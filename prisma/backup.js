// export-users.js
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

async function exportUsers() {
  try {
    // Ambil semua user dengan semua relasi
    const users = await prisma.user.findMany({
      include: {
        imageProfile: true,
        asdos: {
          include: {
            suratPernyataan: true,
            classAsdos: {
              include: {
                class: {
                  include: {
                    course: {
                      include: {
                        semester: {
                          include: {
                            prodi: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        dosen: true,
        asdosApplicant: {
          include: {
            suratPernyataan: true,
            jadwalWawancara: true,
            courseApplicantion: {
              include: {
                course: {
                  include: {
                    semester: {
                      include: {
                        prodi: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Buat workbook Excel baru
    const workbook = new ExcelJS.Workbook();

    // Sheet 1: Data User Lengkap
    const userSheet = workbook.addWorksheet("Users");
    userSheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 35 },
      { header: "Password", key: "password", width: 35 },
      { header: "Role", key: "role", width: 15 },
      { header: "Email Verified", key: "emailVerified", width: 20 },
      { header: "Has Image Profile", key: "hasImageProfile", width: 20 },
      { header: "Image Profile Name", key: "imageProfileName", width: 25 },
      { header: "Created At", key: "createdAt", width: 20 },
      { header: "Updated At", key: "updatedAt", width: 20 },
    ];

    // Tambahkan data user
    users.forEach((user) => {
      userSheet.addRow({
        id: user.id,
        name: user.name,
        email: user.email,
        email: user.password,
        role: user.role,
        emailVerified: user.emailVerified
          ? user.emailVerified.toLocaleDateString()
          : "Not Verified",
        hasImageProfile: user.imageProfile ? "Yes" : "No",
        imageProfileName: user.imageProfile?.gambar || "N/A",
        createdAt: user.createdAt.toLocaleDateString(),
        updatedAt: user.updatedAt.toLocaleDateString(),
      });
    });

    // Sheet 2: Data Asdos
    const asdosSheet = workbook.addWorksheet("Asdos");
    asdosSheet.columns = [
      { header: "NPM", key: "npm", width: 20 },
      { header: "User ID", key: "userId", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 35 },
      { header: "Nomor", key: "nomor", width: 15 },
      { header: "WhatsApp", key: "whatsapp", width: 20 },
      { header: "Domisili", key: "domisili", width: 25 },
      { header: "Alasan", key: "alasan", width: 40 },
      { header: "Surat Pernyataan", key: "suratPernyataan", width: 30 },
      { header: "Jumlah Kelas", key: "jumlahKelas", width: 15 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    const asdosData = users.filter((user) => user.asdos);
    asdosData.forEach((user) => {
      asdosSheet.addRow({
        npm: user.asdos.npm,
        userId: user.id,
        name: user.name,
        email: user.email,
        nomor: user.asdos.nomor,
        whatsapp: user.asdos.whatsapp,
        domisili: user.asdos.domisili,
        alasan: user.asdos.alasan,
        suratPernyataan: user.asdos.suratPernyataan.linkView,
        jumlahKelas: user.asdos.classAsdos.length,
        createdAt: user.asdos.createdAt.toLocaleDateString(),
      });
    });

    // Sheet 3: Data Dosen
    const dosenSheet = workbook.addWorksheet("Dosen");
    dosenSheet.columns = [
      { header: "NIP", key: "nip", width: 20 },
      { header: "User ID", key: "userId", width: 30 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 35 },
      { header: "Mata Kuliah", key: "matkul", width: 30 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    const dosenData = users.filter((user) => user.dosen);
    dosenData.forEach((user) => {
      dosenSheet.addRow({
        nip: user.dosen.nip,
        userId: user.id,
        name: user.name,
        email: user.email,
        matkul: user.dosen.matkul || "N/A",
        createdAt: user.dosen.createdAt.toLocaleDateString(),
      });
    });

    // Sheet 4: Data Aplikasi Asdos
    const applicationSheet = workbook.addWorksheet("Asdos Applications");
    applicationSheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "NPM", key: "npm", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 35 },
      { header: "WhatsApp", key: "whatsapp", width: 20 },
      { header: "Domisili", key: "domisili", width: 25 },
      { header: "Wawancara", key: "wawancara", width: 15 },
      { header: "Alasan Online", key: "alasanOnline", width: 30 },
      { header: "Alasan", key: "alasan", width: 40 },
      { header: "Status", key: "status", width: 15 },
      { header: "Bersedia Dua Matkul", key: "bersediaDuaMatkul", width: 20 },
      { header: "Pengalaman Asdos", key: "pengalamanAsdos", width: 20 },
      {
        header: "Bersedia Ditempatkan Lain",
        key: "bersediaDitempatkanLain",
        width: 25,
      },
      { header: "Surat Pernyataan", key: "suratPernyataan", width: 30 },
      { header: "Jadwal Wawancara", key: "jadwalWawancara", width: 40 },
      {
        header: "Mata Kuliah Pertama Yang Dilamar",
        key: "matkulDilamar1",
        width: 50,
      },
      {
        header: "Mata Kuliah Kedua Yang Dilamar",
        key: "matkulDilamar2",
        width: 50,
      },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    const applicationData = users.filter((user) => user.asdosApplicant);
    applicationData.forEach((user) => {
      const jadwalInfo = user.asdosApplicant.jadwalWawancara
        ? `${user.asdosApplicant.jadwalWawancara.hari}, ${user.asdosApplicant.jadwalWawancara.tanggal} ${user.asdosApplicant.jadwalWawancara.jam} - ${user.asdosApplicant.jadwalWawancara.lokasi}`
        : "Belum Diatur";

      const matkulList = user.asdosApplicant.courseApplicantion.map(
        (ca) =>
          `${ca.course.code} - ${ca.course.name} (${ca.course.semester.prodi.name})`
      );

      applicationSheet.addRow({
        id: user.asdosApplicant.id,
        npm: user.asdosApplicant.npm,
        name: user.name,
        email: user.email,
        whatsapp: user.asdosApplicant.whatsapp,
        domisili: user.asdosApplicant.domisili,
        wawancara: user.asdosApplicant.wawancara,
        alasanOnline: user.asdosApplicant.alasanOnline || "N/A",
        alasan: user.asdosApplicant.alasan,
        status: user.asdosApplicant.status,
        bersediaDuaMatkul: user.asdosApplicant.bersediaDuaMatkul
          ? "Ya"
          : "Tidak",
        pengalamanAsdos: user.asdosApplicant.pengalamanAsdos ? "Ya" : "Tidak",
        bersediaDitempatkanLain: user.asdosApplicant.bersediaDitempatkanLain
          ? "Ya"
          : "Tidak",
        suratPernyataan: user.asdosApplicant.suratPernyataan.namaFile,
        jadwalWawancara: jadwalInfo,
        matkulDilamar1: matkulList[0],
        matkulDilamar2: matkulList[1],
        createdAt: user.asdosApplicant.createdAt.toLocaleDateString(),
      });
    });

    // Sheet 5: Data Kelas Asdos
    const classAsdosSheet = workbook.addWorksheet("Class Assignments");
    classAsdosSheet.columns = [
      { header: "Asdos NPM", key: "asdosNpm", width: 20 },
      { header: "Asdos Name", key: "asdosName", width: 25 },
      { header: "Class Name", key: "className", width: 20 },
      { header: "Course Code", key: "courseCode", width: 15 },
      { header: "Course Name", key: "courseName", width: 30 },
      { header: "SKS", key: "sks", width: 10 },
      { header: "Semester", key: "semester", width: 15 },
      { header: "Prodi", key: "prodi", width: 25 },
      { header: "Created At", key: "createdAt", width: 20 },
    ];

    const asdosWithClasses = users.filter(
      (user) => user.asdos && user.asdos.classAsdos.length > 0
    );
    asdosWithClasses.forEach((user) => {
      user.asdos.classAsdos.forEach((classAsdos) => {
        classAsdosSheet.addRow({
          asdosNpm: user.asdos.npm,
          asdosName: user.name,
          className: classAsdos.class.name,
          courseCode: classAsdos.class.course?.code || "N/A",
          courseName: classAsdos.class.course?.name || "N/A",
          sks: classAsdos.class.course?.sks || "N/A",
          semester: classAsdos.class.course?.semester.semesterNumber || "N/A",
          prodi: classAsdos.class.course?.semester.prodi.name || "N/A",
          createdAt: classAsdos.createdAt.toLocaleDateString(),
        });
      });
    });

    // Sheet 6: Summary Statistics
    const summarySheet = workbook.addWorksheet("Summary");
    summarySheet.columns = [
      { header: "Metric", key: "metric", width: 30 },
      { header: "Count", key: "count", width: 15 },
    ];

    const stats = [
      { metric: "Total Users", count: users.length },
      {
        metric: "Admin Users",
        count: users.filter((u) => u.role === "ADMIN").length,
      },
      {
        metric: "Asdos Users",
        count: users.filter((u) => u.role === "ASDOS").length,
      },
      {
        metric: "Calon Asdos Users",
        count: users.filter((u) => u.role === "CALON_ASDOS").length,
      },
      {
        metric: "Dosen Users",
        count: users.filter((u) => u.role === "DOSEN").length,
      },
      {
        metric: "Guest Users",
        count: users.filter((u) => u.role === "GUEST").length,
      },
      { metric: "Active Asdos", count: users.filter((u) => u.asdos).length },
      { metric: "Active Dosen", count: users.filter((u) => u.dosen).length },
      {
        metric: "Pending Applications",
        count: users.filter((u) => u.asdosApplicant?.status === "processing")
          .length,
      },
      {
        metric: "Users with Profile Image",
        count: users.filter((u) => u.imageProfile).length,
      },
      {
        metric: "Verified Email Users",
        count: users.filter((u) => u.emailVerified).length,
      },
    ];

    stats.forEach((stat) => {
      summarySheet.addRow(stat);
    });

    // Format header untuk semua sheet
    [
      userSheet,
      asdosSheet,
      dosenSheet,
      applicationSheet,
      classAsdosSheet,
      summarySheet,
    ].forEach((sheet) => {
      sheet.getRow(1).font = { bold: true };
      sheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE0E0E0" },
      };
    });

    // Simpan ke file dengan timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);
    const filename = `./backup/backup_${timestamp}.xlsx`;

    await workbook.xlsx.writeFile(filename);

    console.log(`✅ Data user berhasil di-export ke ${filename}`);
    console.log(`📊 Total users: ${users.length}`);
    console.log(
      `📋 Sheets created: Users, Asdos, Dosen, Asdos Applications, Class Assignments, Summary`
    );
  } catch (error) {
    console.error("❌ Error during export:", error);
  } finally {
    await prisma.$disconnect();
    process.exit();
  }
}

exportUsers();
