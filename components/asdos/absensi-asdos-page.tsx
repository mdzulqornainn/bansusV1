"use client";
import ModalConfirm from "@/components/ui/modal-confirm";
import { submitAbsensi } from "@/data/absensi";
import { theme } from "@/lib/theme";
import { TGetActiveAbsensi, TGetAsdosByUserId } from "@/lib/types";
import Link from "next/link";
import { useRef, useState } from "react";

interface AbsensiAsdosPageProps {
  dataAsdos: TGetAsdosByUserId;
  dataAbsensi: TGetActiveAbsensi;
}

const AbsensiAsdosPage = ({
  dataAsdos,
  dataAbsensi,
}: AbsensiAsdosPageProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPertemuan, setSelectedPertemuan] = useState<number | null>(
    null
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const [selectedKelasId, setSelectedKelasId] = useState<string>(
    dataAsdos?.classAsdos?.[0]?.id || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generatePertemuanData = (existingAbsensi: any[]) => {
    const pertemuanData = [];
    for (let i = 1; i <= 16; i++) {
      const existing = existingAbsensi.find((abs) => abs.pertemuanKe === i);
      if (existing) {
        pertemuanData.push({
          pertemuan: existing.pertemuanKe,
          waktu: existing.waktuKehadiran
            ? formatDateTimeLocal(existing.waktuKehadiran)
            : "",
          materi: existing.materi || "",
          ruangan: existing.ruangan || "",
          bukti: existing.buktiKehadiran?.linkView || null,
          status: "sudah",
        });
      } else {
        const isActive = dataAbsensi?.pertemuanActive?.includes(i) || false;
        pertemuanData.push({
          pertemuan: i,
          waktu: "",
          materi: "",
          ruangan: "",
          bukti: null,
          status: isActive ? "aktif" : "nonaktif",
        });
      }
    }
    return pertemuanData;
  };

  const formatDateTimeLocal = (dateString: string) => {
    const d = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Transform data from database to match expected format
  const daftarKelas =
    dataAsdos?.classAsdos?.map((classAsdos) => ({
      id: classAsdos.id,
      prodi: classAsdos?.class?.course?.semester?.prodi?.name || "-",
      matkul: classAsdos?.class?.course?.name || "-",
      semesterNumber: classAsdos?.class?.course?.semester?.semesterNumber || 0,
      kelas: classAsdos.class.name,
      absensi: generatePertemuanData(classAsdos.absensi || []),
    })) || [];

  const selectedKelas = daftarKelas.find((k) => k.id === selectedKelasId);

  // Validation functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFormData = (formData: any) => {
    const errors: string[] = [];

    if (!formData.waktuKehadiran) {
      errors.push("Waktu kehadiran wajib diisi");
    }

    if (!formData.materi.trim()) {
      errors.push("Materi pembelajaran wajib diisi");
    }

    if (!formData.ruangan) {
      errors.push("Ruangan wajib dipilih");
    }

    // Validate file if exists
    if (formData.buktiKehadiran) {
      const file = formData.buktiKehadiran;
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (file.size > maxSize) {
        errors.push("Ukuran file bukti kehadiran maksimal 5MB");
      }

      if (!allowedTypes.includes(file.type)) {
        errors.push("Format file harus JPG, atau PNG");
      }
    }

    return errors;
  };

  // Fungsi untuk mengambil data dari form dengan error handling
  const getFormData = (pertemuan: number) => {
    try {
      const waktuInput = document.querySelector(
        `#waktu-${pertemuan}`
      ) as HTMLInputElement;
      const materiInput = document.querySelector(
        `#materi-${pertemuan}`
      ) as HTMLInputElement;
      const ruanganSelect = document.querySelector(
        `#ruangan-${pertemuan}`
      ) as HTMLSelectElement;
      const buktiInput = document.querySelector(
        `#bukti-${pertemuan}`
      ) as HTMLInputElement;

      // Check if all required elements exist
      if (!waktuInput || !materiInput || !ruanganSelect) {
        throw new Error("Form elements tidak ditemukan");
      }

      return {
        pertemuan: pertemuan,
        kelasId: selectedKelasId,
        waktuKehadiran: waktuInput.value?.trim() || "",
        materi: materiInput.value?.trim() || "",
        ruangan: ruanganSelect.value?.trim() || "",
        buktiKehadiran: buktiInput?.files?.[0] || null,
      };
    } catch (error) {
      console.error("Error getting form data:", error);
      throw new Error("Gagal mengambil data dari form");
    }
  };

  // Clear messages after timeout
  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  const handleOpenModal = (pertemuan: number) => {
    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate that the meeting is active
    if (!dataAbsensi?.pertemuanActive?.includes(pertemuan)) {
      setErrorMessage("Pertemuan ini tidak dapat diisi");
      clearMessages();
      return;
    }

    // Pre-validate form data before opening modal
    try {
      const formData = getFormData(pertemuan);
      const validationErrors = validateFormData(formData);

      if (validationErrors.length > 0) {
        setErrorMessage(validationErrors[0]); // Show first error
        clearMessages();
        return;
      }

      setSelectedPertemuan(pertemuan);
      setShowModal(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Terjadi kesalahan"
      );
      clearMessages();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPertemuan(null);
    setErrorMessage("");
  };

  const handleConfirmModal = async () => {
    if (!selectedPertemuan) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Get form data
      const formData = getFormData(selectedPertemuan);

      // Validate form data again
      const validationErrors = validateFormData(formData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      // Validate required props
      if (!dataAsdos?.npm) {
        throw new Error("NPM tidak ditemukan");
      }

      if (!dataAsdos?.user?.name) {
        throw new Error("Nama user tidak ditemukan");
      }

      // Parse and validate date
      const waktuKehadiran = new Date(formData.waktuKehadiran);
      if (isNaN(waktuKehadiran.getTime())) {
        throw new Error("Format waktu kehadiran tidak valid");
      }

      // Check if date is not in the future
      const now = new Date();
      if (waktuKehadiran > now) {
        setErrorMessage("Waktu kehadiran tidak boleh di masa depan");
        setShowModal(false);
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
        throw new Error("Waktu kehadiran tidak boleh di masa depan");
      }

      // Submit data
      await submitAbsensi(
        dataAsdos.user.id,
        dataAsdos.npm,
        selectedKelasId,
        formData.pertemuan,
        waktuKehadiran,
        dataAsdos.user.name,
        formData.materi,
        formData.ruangan,
        selectedKelas?.matkul || "",
        formData.buktiKehadiran
      )
        .then((result) => {
          if (result.error) {
            setErrorMessage(result.error);
            throw new Error(result.error);
          } else if (result.success) {
            setSuccessMessage(result.success);
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
          throw new Error(error.message);
        })
        .finally(() => {
          setShowModal(false);
          messageRef.current?.scrollIntoView({ behavior: "smooth" });
        });

      setSuccessMessage(
        `Absensi pertemuan ${selectedPertemuan} berhasil disimpan!`
      );
      handleCloseModal();

      // Optionally refresh data or update state here
      // window.location.reload(); // or use a more elegant state update
    } catch (error) {
      console.error("Error submitting absensi:", error);

      let errorMsg = "Terjadi kesalahan saat menyimpan data";

      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === "string") {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
      clearMessages();
    }
  };

  // Handle case where no data is available
  if (!dataAsdos || !selectedKelas) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className={`${theme.card_max_4} ${theme.card_default}`}>
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.text_title} mb-6`}
          >
            Absensi Anda
          </h1>
          <div className={`${theme.text_default} text-center py-8`}>
            Tidak ada data kelas yang tersedia.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:ml-48">
      <div className={theme.card_max_4_fit}>
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.text_title} mb-2`}
          >
            Absensi Anda
          </h1>
          <p className={`${theme.text_default} text-sm sm:text-base`}>
            Kelola kehadiran dan dokumentasi perkuliahan Anda
          </p>
        </div>

        {/* Tab Navigation for Multiple Classes */}
        {daftarKelas.length > 1 && (
          <div className={`${theme.card_default} mb-6`}>
            <h3
              className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
            >
              Pilih Mata Kuliah
            </h3>
            <div className="flex flex-wrap gap-2">
              {daftarKelas.map((kelas) => (
                <button
                  key={kelas.id}
                  onClick={() => {
                    setSelectedKelasId(kelas.id);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedKelasId === kelas.id
                      ? theme.button_selection
                      : `${theme.button_default_small_reversed} border border-white/20`
                  }`}
                >
                  <div className="font-semibold">{kelas.matkul}</div>
                  <div className="text-xs opacity-75">
                    Kelas {kelas.kelas} • Semester {kelas.semesterNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Class Information Card */}
        <div className={`${theme.card_default}`}>
          <h3
            className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
          >
            Informasi Mata Kuliah
          </h3>

          {/* Mobile View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm md:hidden">
            <div className="space-y-3">
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Program Studi
                </span>
                <span className={`${theme.text_default} leading-relaxed`}>
                  {selectedKelas.prodi}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Mata Kuliah
                </span>
                <span className={`${theme.text_default} leading-relaxed`}>
                  {selectedKelas.matkul}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Semester
                </span>
                <span className={theme.text_default}>
                  {selectedKelas.semesterNumber}
                </span>
              </div>
              <div>
                <span
                  className={`${theme.text_title} font-semibold block mb-1`}
                >
                  Kelas
                </span>
                <span className={theme.text_default}>
                  {selectedKelas.kelas}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className={theme.text_title}>
                  <th className="py-3 px-4 font-semibold">Program Studi</th>
                  <th className="py-3 px-4 font-semibold">Mata Kuliah</th>
                  <th className="py-3 px-4 font-semibold">Semester</th>
                  <th className="py-3 px-4 font-semibold">Kelas</th>
                </tr>
              </thead>
              <tbody>
                <tr className={theme.table_highlight}>
                  <td
                    className={`py-3 px-4 ${theme.text_default} leading-relaxed`}
                  >
                    {selectedKelas.prodi}
                  </td>
                  <td
                    className={`py-3 px-4 ${theme.text_default} leading-relaxed`}
                  >
                    {selectedKelas.matkul}
                  </td>
                  <td className={`py-3 px-4 ${theme.text_default}`}>
                    {selectedKelas.semesterNumber}
                  </td>
                  <td className={`py-3 px-4 ${theme.text_default}`}>
                    {selectedKelas.kelas}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Progress */}
        <div className={`${theme.card_default}`}>
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`${theme.text_default_blue} font-semibold text-sm sm:text-base`}
            >
              Progress Pertemuan
            </h3>
            <div className={`${theme.text_default} text-xs sm:text-sm`}>
              {selectedKelas.absensi.filter((a) => a.status === "sudah").length}
              /16 Pertemuan
            </div>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-8 lg:grid-cols-16 gap-1.5 mb-4">
            {selectedKelas.absensi.map((data, i) => (
              <div
                key={i + 1}
                className={`aspect-square w-7 sm:w-8 md:w-9 flex items-center justify-center rounded-md text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                  data.status === "sudah"
                    ? "bg-green-500 text-white"
                    : dataAbsensi?.pertemuanActive?.includes(i + 1)
                      ? `animate-pulse ${theme.button_default_small}`
                      : `bg-white/10 ${theme.text_default_light}`
                }`}
                title={`Pertemuan ${data.pertemuan} - ${
                  data.status === "sudah"
                    ? "Selesai"
                    : data.status === "aktif"
                      ? "Dapat diisi"
                      : "Belum aktif"
                }`}
              >
                {data.pertemuan}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className={theme.text_default}>Selesai</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded"></div>
              <span className={theme.text_default}>Dapat Diisi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/10 rounded"></div>
              <span className={theme.text_default}>Belum Aktif</span>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className={`${theme.card_default}`}>
          <h3
            className={`${theme.text_default_blue} font-semibold mb-4 text-sm sm:text-base`}
          >
            Daftar Absensi
          </h3>
          {/* Error/Success Messages */}
          {errorMessage && (
            <div
              ref={messageRef}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <p className="text-red-400 text-sm font-medium">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-green-400 text-sm font-medium">
                  {successMessage}
                </p>
              </div>
            </div>
          )}
          <div className="overflow-x-auto rounded-lg">
            <table
              className={`min-w-full ${theme.border_outside} text-xs sm:text-sm`}
            >
              <thead>
                <tr className={`${theme.table_header} text-white`}>
                  <th className="p-3 border border-white/20 font-semibold">
                    Pertemuan
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Waktu Kehadiran*
                  </th>
                  <th className="p-3 border min-w-32 border-white/20 font-semibold">
                    Materi*
                  </th>
                  <th className="p-3 border min-w-44 border-white/20 font-semibold">
                    Ruangan*
                  </th>
                  <th className="p-3 border min-w-64 border-white/20 font-semibold">
                    Bukti Kehadiran
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Status
                  </th>
                  <th className="p-3 border border-white/20 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedKelas.absensi.map((data) => {
                  const isReadOnly = !dataAbsensi?.pertemuanActive?.includes(
                    data.pertemuan
                  );
                  const rowBgClass =
                    data.status === "terlewat"
                      ? "bg-red-500/10"
                      : data.status === "sudah"
                        ? "bg-green-500/10"
                        : data.status === "aktif"
                          ? "border border-sky-400 shadow-lg ring-2 ring-sky-500/50 animate-[ringPulse_3s_ease-in-out_infinite]"
                          : ""; // ringPulse ada di global css

                  return (
                    <tr
                      key={data.pertemuan}
                      className={`${theme.text_default} border-t border-white/10 ${theme.table_highlight} ${rowBgClass}`}
                    >
                      <td className="p-3 text-center border border-white/20 font-medium">
                        Pertemuan {data.pertemuan}
                      </td>
                      <td className="p-3 border border-white/20">
                        <input
                          id={`waktu-${data.pertemuan}`}
                          type="datetime-local"
                          defaultValue={data.waktu}
                          disabled={
                            isReadOnly || isLoading || data.status === "sudah"
                          }
                          required
                          className={`bg-white/10 border border-white/20 ${theme.text_default} px-3 py-2 rounded-lg w-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:bg-white/20 focus:border-blue-400`}
                        />
                      </td>
                      <td className="p-3 border border-white/20">
                        <input
                          id={`materi-${data.pertemuan}`}
                          type="text"
                          defaultValue={data.materi}
                          placeholder="Materi"
                          disabled={
                            isReadOnly || isLoading || data.status === "sudah"
                          }
                          required
                          maxLength={200}
                          className={`bg-white/10 border border-white/20 ${theme.text_default} px-3 py-2 rounded-lg w-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:bg-white/20 focus:border-blue-400`}
                        />
                      </td>
                      <td className="p-3 border border-white/20">
                        <select
                          id={`ruangan-${data.pertemuan}`}
                          defaultValue={data.ruangan || ""}
                          disabled={
                            isReadOnly || isLoading || data.status === "sudah"
                          }
                          required
                          className={`bg-white/10 border border-white/20 ${theme.text_default} px-3 py-2 rounded-lg w-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:bg-white/20 focus:border-blue-400`}
                        >
                          <option value="" disabled>
                            --Pilih Ruangan--
                          </option>
                          <option value="LAB_R1_R2">LAB R1 & R2</option>
                          <option value="LAB_R3_R4">LAB R3 & R4</option>
                          <option value="LAB_RPL">LAB RPL</option>
                          <option value="MIPA_T_L1_A">MIPA T L1 A</option>
                          <option value="MIPA_T_L1_B">MIPA T L1 B</option>
                          <option value="GIK_L1_A">GIK Lt. 1 A</option>
                          <option value="GIK_L1_B">GIK Lt. 1 B</option>
                          <option value="GIK_L1_C">GIK Lt. 1 C</option>
                          <option value="GIK_L2">GIK Lt. 2</option>
                          <option value="ONLINE_MEET_ZOOM">
                            Online (Zoom)
                          </option>
                        </select>
                      </td>
                      <td className="p-3 border border-white/20">
                        {data.status === "sudah" && data.bukti ? (
                          <Link
                            href={data.bukti}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${theme.text_default_blue} flex justify-center underline hover:text-blue-400 transition-colors duration-300`}
                          >
                            Lihat Bukti
                          </Link>
                        ) : data.status === "aktif" ? (
                          <div>
                            <input
                              id={`bukti-${data.pertemuan}`}
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              className={`bg-white/10 border border-white/20 ${theme.text_default} px-3 py-2 rounded-lg w-full text-xs transition-all duration-300 focus:bg-white/20 focus:border-blue-400`}
                            />
                            <p
                              className={`text-xs text-center ${theme.text_default_light} mt-1`}
                            >
                              Max 5MB, JPG/PNG
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs italic flex justify-center">
                            {data.status === "nonaktif" ? "Belum aktif" : "-"}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center border border-white/20">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            data.status === "sudah"
                              ? theme.status_accepted
                              : data.status === "terlewat"
                                ? theme.status_rejected
                                : data.status === "aktif"
                                  ? theme.status_processing
                                  : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {data.status === "sudah"
                            ? "Selesai"
                            : data.status === "terlewat"
                              ? "Terlewat"
                              : data.status === "aktif"
                                ? "Aktif"
                                : "Belum Aktif"}
                        </span>
                      </td>
                      <td className="p-3 text-center border border-white/20">
                        <button
                          disabled={
                            isReadOnly || isLoading || data.status === "sudah"
                          }
                          onClick={() => handleOpenModal(data.pertemuan)}
                          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                            isReadOnly || isLoading || data.status === "sudah"
                              ? "bg-white/5 text-gray-500 cursor-not-allowed"
                              : `${theme.button_save} hover:bg-blue-400/20 border-blue-400`
                          }`}
                        >
                          {isLoading && selectedPertemuan === data.pertemuan
                            ? "Menyimpan..."
                            : data.status === "sudah"
                              ? "Tersimpan"
                              : "Simpan"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div
          className={`${theme.card_default} bg-blue-500/10 border-blue-400/30`}
        >
          <h4
            className={`${theme.text_default_blue} font-semibold mb-2 text-sm`}
          >
            Catatan Penting:
          </h4>
          <ul
            className={`${theme.text_default} text-xs sm:text-sm space-y-1 list-disc list-inside`}
          >
            <li>
              Absensi hanya dapat diisi ketika admin memberikan izin untuk
              mengisi pada pertemuan tersebut
            </li>
            <li>Setelah data disimpan, Anda tidak dapat mengubahnya lagi</li>
            <li>Pastikan semua data sudah benar sebelum menyimpan</li>
            <li>Bukti kehadiran berupa foto (JPG/PNG) maksimal 5MB</li>
          </ul>
        </div>
      </div>

      <ModalConfirm
        isOpen={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
        title="Konfirmasi Simpan Data"
        message={`Anda yakin ingin menyimpan data absensi pertemuan ${selectedPertemuan}? Data yang sudah disimpan tidak dapat diubah lagi.`}
        loading={isLoading}
      />
    </div>
  );
};

export default AbsensiAsdosPage;
