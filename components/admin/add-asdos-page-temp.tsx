"use client";

import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { theme } from "@/lib/theme";
import { TGetAsdosApplications, TGetProdis } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddAsdosPageProps {
  dataProdis: TGetProdis;
  dataAsdosApplications: TGetAsdosApplications;
}

const AddAsdosPage = ({
  dataProdis,
  dataAsdosApplications,
}: AddAsdosPageProps) => {
  const [formData, setFormData] = useState({
    npm: "",
    prodiId: "",
    semesterId: "",
    courseId: "",
    classId: "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSaveAsdos = async (data: typeof formData) => {
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          !data.npm ||
          !data.prodiId ||
          !data.semesterId ||
          !data.courseId ||
          !data.classId
        ) {
          reject(new Error("Semua field wajib diisi"));
        } else {
          resolve(data);
        }
      }, 1000);
    })
      .then((res) => {
        console.log(res);
        router.push("/admin/asdos");
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
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const styleClassName =
    "w-full px-4 py-2 border border-white/60 rounded-lg bg-yellow-400/40 focus:bg-yellow-500/80 focus:placeholder-white focus:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Reset dependent fields when parent changes
      if (name === "prodiId") {
        newData.semesterId = "";
        newData.courseId = "";
        newData.classId = "";
      } else if (name === "semesterId") {
        newData.courseId = "";
        newData.classId = "";
      } else if (name === "courseId") {
        newData.classId = "";
      }

      return newData;
    });
  };

  const isFormValid = () => {
    return (
      formData.npm &&
      formData.prodiId &&
      formData.semesterId &&
      formData.courseId &&
      formData.classId
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <Link
          href="/admin/matakuliah"
          className="group mb-6 inline-flex items-center gap-2 text-sm text-yellow-300 transition-colors duration-300 hover:text-yellow-100 lg:ml-16"
        >
          <ArrowLeft className="h-4 w-4 lg:ml-2 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Kembali ke Daftar Asisten Dosen</span>
        </Link>
        <div className="lg:ml-18">
          <div className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 backdrop-blur-xl border-yellow-400/20 shadow-xl rounded-3xl p-10 border">
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-8">
              Tambah Asisten Dosen
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isFormValid()) {
                  setModalOpen(true);
                } else {
                  setError("Mohon lengkapi semua field yang wajib diisi");
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* NPM Section */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${theme.text_title} mb-1`}
                >
                  NPM <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="npm"
                    value={formData.npm}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`${styleClassName} flex-1`}
                  >
                    <option value="">Pilih Asisten Dosen</option>
                    {dataAsdosApplications?.map((asdos) => (
                      <option key={asdos.id} value={asdos.npm || asdos.id}>
                        {asdos.user.name} - {asdos.npm || asdos.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Program Studi Section */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${theme.text_title} mb-1`}
                >
                  Program Studi <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="prodiId"
                    value={formData.prodiId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className={`${styleClassName} flex-1`}
                  >
                    <option value="">Pilih Prodi</option>
                    {dataProdis?.map((prodi) => (
                      <option key={prodi.id} value={prodi.id}>
                        {prodi.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Semester Section */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${theme.text_title} mb-1`}
                >
                  Semester <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="semesterId"
                    value={formData.semesterId}
                    onChange={handleChange}
                    required
                    disabled={loading || !formData.prodiId}
                    className={`${styleClassName} flex-1`}
                  >
                    <option value="">
                      {!formData.prodiId
                        ? "Pilih Prodi terlebih dahulu"
                        : "Pilih Semester"}
                    </option>
                    {dataProdis
                      ?.find((prodi) => prodi.id === formData.prodiId)
                      ?.semester.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                          Semester {semester.semesterNumber}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Course Section */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${theme.text_title} mb-1`}
                >
                  Mata Kuliah <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                    disabled={loading || !formData.semesterId}
                    className={`${styleClassName} flex-1`}
                  >
                    <option value="">
                      {!formData.semesterId
                        ? "Pilih Semester terlebih dahulu"
                        : "Pilih Mata Kuliah"}
                    </option>
                    {dataProdis
                      ?.find((prodi) => prodi.id === formData.prodiId)
                      ?.semester?.find(
                        (semester) => semester.id === formData.semesterId
                      )
                      ?.courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Class Section */}
              <div className="md:col-span-2">
                <label
                  className={`block text-sm font-medium ${theme.text_title} mb-1`}
                >
                  Kelas <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    required
                    disabled={loading || !formData.courseId}
                    className={`${styleClassName} flex-1`}
                  >
                    <option value="">
                      {!formData.courseId
                        ? "Pilih Mata Kuliah terlebih dahulu"
                        : "Pilih Kelas"}
                    </option>
                    {dataProdis
                      ?.find((prodi) => prodi.id === formData.prodiId)
                      ?.semester?.find(
                        (semester) => semester.id === formData.semesterId
                      )
                      ?.courses?.find(
                        (course) => course.id === formData.courseId
                      )
                      ?.class?.map((kelas) => (
                        <option key={kelas.id} value={kelas.id}>
                          {kelas.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {error && (
                <FormMessage
                  message={error}
                  type="error"
                  className="col-span-2"
                />
              )}

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className="w-full md:max-w-64 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "Menyimpan..." : "Simpan Asisten Dosen"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalConfirm
        handleClose={handleCancel}
        handleConfirm={() => {
          handleSaveAsdos(formData);
        }}
        message="Apakah anda yakin ingin menyimpan perubahan?"
        title="Simpan Perubahan"
        isOpen={modalOpen}
        loading={loading}
      />
    </>
  );
};

export default AddAsdosPage;
