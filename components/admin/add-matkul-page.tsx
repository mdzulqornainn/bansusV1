"use client";

import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { addCourse, addProdi, addSemster } from "@/data/courses";
import { FormDataAddMatkul } from "@/lib/interfaces";
import { theme } from "@/lib/theme";
import { TGetProdis, TGetSemesters } from "@/lib/types";
import { ArrowLeft, Plus, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AddMatkulPageProps {
  dataProdis: TGetProdis;
  dataSemesters: TGetSemesters;
}

const AddMatkulPage = ({ dataProdis, dataSemesters }: AddMatkulPageProps) => {
  const [isAddWhat, setIsAddWhat] = useState<"course" | "prodi" | "semester">(
    "course"
  );
  const [formData, setFormData] = useState<FormDataAddMatkul>({
    code: "",
    name: "",
    sks: 0,
    semesterId: "",
    kuota: 0,
    prodiId: "",
    status: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorProdi, setErrorProdi] = useState<string>("");
  const [errorSemester, setErrorSemester] = useState<string>("");
  const [filteredSemesters, setFilteredSemesters] = useState<TGetSemesters>([]);
  const [showAddProdi, setShowAddProdi] = useState(false);
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [newProdiName, setNewProdiName] = useState<string>("");
  const [newSemesterNumber, setNewSemesterNumber] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (formData.prodiId) {
      const filtered =
        dataSemesters?.filter(
          (semester) => semester.prodiId === formData.prodiId
        ) || [];
      setFilteredSemesters(filtered);

      // Reset semesterId if current selection is not valid for the new prodi
      if (
        formData.semesterId &&
        !filtered.some((s) => s.id === formData.semesterId)
      ) {
        setFormData((prev) => ({ ...prev, semesterId: "" }));
      }
    } else {
      setFilteredSemesters([]);
      setFormData((prev) => ({ ...prev, semesterId: "" }));
    }
  }, [formData.prodiId, dataSemesters, formData.semesterId]);

  const handleSaveCourse = async (data: FormDataAddMatkul) => {
    setLoading(true);
    await addCourse(data)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          router.push("/admin/matakuliah");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        setModalOpen(false);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
    setLoading(false);
    setModalOpen(false);
  };
  const handleSaveProdi = async (name: string) => {
    setLoading(true);
    await addProdi(name)
      .then((res) => {
        if (res.error) {
          setErrorProdi(res.error);
        } else if (res.success) {
          setShowAddProdi(false);
          setNewProdiName("");
          router.refresh();
        }
      })
      .catch((err) => {
        setErrorProdi(err.message);
      })
      .finally(() => {
        setLoading(false);
        setModalOpen(false);
        setTimeout(() => {
          setErrorProdi("");
        }, 5000);
      });
    setLoading(false);
    setModalOpen(false);
  };

  const handleSaveSemester = async (semester: number, prodiId: string) => {
    setLoading(true);
    await addSemster(semester, prodiId)
      .then((res) => {
        if (res.error) {
          setErrorSemester(res.error);
        } else if (res.success) {
          setShowAddSemester(false);
          setNewSemesterNumber(0);
          router.refresh();
        }
      })
      .catch((err) => {
        setErrorSemester(err.message);
      })
      .finally(() => {
        setLoading(false);
        setModalOpen(false);
        setTimeout(() => {
          setErrorSemester("");
        }, 5000);
      });
    setLoading(false);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const statuses = ["aktif", "nonaktif"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        {/* Back Button */}
        <Link href="/admin/matakuliah" className={`${theme.icon_link}`}>
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar Mata Kuliah</span>
        </Link>

        <div className={`${theme.card_max_4} p-6 ${theme.card_shadow}`}>
          <h2 className={`text-center text-3xl font-bold ${theme.text_title} mb-8`}>
            Tambah Mata Kuliah
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAddWhat("course");
              setModalOpen(true);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Program Studi */}
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Program Studi
              </label>
              <div className="flex gap-2">
                <select
                  name="prodiId"
                  value={formData.prodiId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className={`${theme.highlight_filter} flex-1 ${theme.text_default_light}`}
                >
                  <option value="">Pilih Prodi</option>
                  {dataProdis?.map((prodi) => (
                    <option key={prodi.id} value={prodi.id}>
                      {prodi.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddProdi(!showAddProdi)}
                  className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/30 text-white rounded-lg flex items-center gap-1 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Prodi
                </button>
              </div>

              {showAddProdi && (
                <div className={`mt-3 p-4 rounded-lg ${theme.hover_glow_light}`}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProdiName}
                      onChange={(e) => setNewProdiName(e.target.value)}
                      placeholder="Nama Program Studi"
                      className={`${theme.highlight_filter} flex-1 ${theme.text_default}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddWhat("prodi");
                        setModalOpen(true);
                      }}
                      className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-4 py-2 text-sm font-semibold `}

                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddProdi(false);
                        setNewProdiName("");
                      }}
                      className={`${theme.button_cancel}`}
                    >
                      Batal
                    </button>
                  </div>
                  {errorProdi && (
                    <FormMessage
                      message={errorProdi}
                      type="error"
                      className="mt-2 col-span-2"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Semester */}
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Semester
              </label>
              <div className="flex gap-2">
                <select
                  name="semesterId"
                  value={formData.semesterId}
                  onChange={handleChange}
                  required
                  disabled={loading || !formData.prodiId}
                  className={`${theme.highlight_filter} flex-1 ${theme.text_default_light}`}
                >
                  <option value="">
                    {!formData.prodiId
                      ? "Pilih Prodi terlebih dahulu"
                      : "Pilih Semester"}
                  </option>
                  {filteredSemesters?.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      Semester {semester.semesterNumber}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAddSemester(!showAddSemester)}
                  disabled={!formData.prodiId}
                  className="px-4 py-2 bg-gray-800/30 hover:bg-gray-700/30 text-white rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Semester
                </button>
              </div>

              {showAddSemester && formData.prodiId && (
                <div className={`mt-3 p-4 rounded-lg ${theme.hover_glow_light}`}>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newSemesterNumber}
                      onChange={(e) => setNewSemesterNumber(+e.target.value)}
                      placeholder="Nomor Semester (1-8)"
                      min="1"
                      max="8"
                      className={`${theme.highlight_filter} flex-1 ${theme.text_default}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddWhat("semester");
                        setModalOpen(true);
                      }}
                      className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-4 py-2 text-sm font-semibold `}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddSemester(false);
                        setNewSemesterNumber(0);
                      }}
                      className={`${theme.button_cancel}`}
                    >
                      Batal
                    </button>
                  </div>
                  {errorSemester && (
                    <FormMessage
                      message={errorSemester}
                      type="error"
                      className="mt-2 col-span-2"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Fields */}
            <div>
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Kode
              </label>
              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="COM123456"
                className={`${theme.highlight_filter} ${theme.text_default_light}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Nama
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Nama Mata Kuliah"
                className={`${theme.highlight_filter} ${theme.text_default}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                SKS
              </label>
              <input
                name="sks"
                type="number"
                value={formData.sks}
                onChange={handleChange}
                min="1"
                max="6"
                required
                placeholder="Jumlah SKS"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
                }
                className={`${theme.highlight_filter} ${theme.text_default_light} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Kuota
              </label>
              <input
                name="kuota"
                type="number"
                value={formData.kuota}
                onChange={handleChange}
                required
                placeholder="Jumlah Kuota Asisten Dosen"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
                }
                className={`${theme.highlight_filter} ${theme.text_default_light} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                disabled={loading}
                className={`${theme.highlight_filter} ${theme.text_default_light}`}
              >
                <option value="">Pilih Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <FormMessage message={error} type="error" className="col-span-2" />
            )}

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Save className="h-5 w-5" />
                {loading ? "Menyimpan..." : "Simpan Mata Kuliah"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 
      <button
        type="submit"
        className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-4 py-2 text-sm font-semibold `}
      >
        <Save className="h-4 w-4" /> Simpan
      </button> */}


      <ModalConfirm
        handleClose={handleCancel}
        handleConfirm={() => {
          if (isAddWhat === "course") handleSaveCourse(formData);
          else if (isAddWhat === "semester")
            handleSaveSemester(newSemesterNumber, formData.prodiId);
          else if (isAddWhat === "prodi") handleSaveProdi(newProdiName);
        }}
        message="Apakah anda yakin ingin menyimpan perubahan?"
        title="Simpan Perubahan"
        isOpen={modalOpen}
        loading={loading}
      />
    </>
  );

};

export default AddMatkulPage;
