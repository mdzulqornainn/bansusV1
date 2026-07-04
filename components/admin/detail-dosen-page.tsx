"use client";

import ButtonIcon from "@/components/ui/button-icon";
import ModalForm from "@/components/ui/modal-form";
import { addDosenClass } from "@/data/dosen";
import { theme } from "@/lib/theme";
import { TGetDosen, TGetProdis } from "@/lib/types";
import { ArrowLeft, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Info = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <div>
    <dt className={`text-sm font-medium ${theme.text_title}`}>{title}</dt>
    <dd
      className={`mt-1 text-sm ${theme.text_default}`}
    >
      {value}
    </dd>
  </div>
);

interface DetailDosenPageProps {
  dataDosen: TGetDosen;
  dataProdis: TGetProdis;
}

export default function DetailDosenPage({
  dataDosen,
  dataProdis,
}: DetailDosenPageProps) {
  const [formData, setFormData] = useState({
    nip: dataDosen?.nip,
    prodiId: "",
    semesterId: "",
    courseId: "",
    classId: "",
  });
  const [showModalAddClass, setShowModalAddClass] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (data: typeof formData) => {
    setLoading(true);
    try {
      await addDosenClass(data.nip as string, data.classId as string)
        .then((res) => {
          if (res.success) {
            setFormData({
              nip: dataDosen?.nip,
              prodiId: "",
              semesterId: "",
              courseId: "",
              classId: "",
            });
            setShowModalAddClass(false);
            router.refresh();
          } else if (res.error) {
            setError(res.error);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
          setShowModalAddClass(false);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
      setLoading(false);
      setShowModalAddClass(false);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err}`);
    }
  };

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

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        <Link
          href="/admin/dosen"
          className={`${theme.icon_link}`}
        >
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar</span>
        </Link>

        <div className={`${theme.card_max_4}`}>
          {/* Detail Card */}
          <div className={`${theme.card_default}`}>
            <h1 className={`text-3xl font-bold ${theme.text_title} pb-3 mb-4`}>
              Detail Dosen
            </h1>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info title="NIP" value={dataDosen?.nip} />
              <Info title="Nama" value={dataDosen?.namaDosen} />
              <Info
                title="Tanggal Dibuat"
                value={
                  dataDosen?.createdAt
                    ? new Date(dataDosen.createdAt).toLocaleString("id-ID")
                    : "-"
                }
              />
              <Info
                title="Terakhir Update"
                value={dataDosen?.updatedAt
                  ? new Date(dataDosen.updatedAt).toLocaleString("id-ID")
                  : "-"
                }
              />
            </dl>
          </div>
        </div>
        {/* card 2 */}
        <div className={`${theme.card_max_4} mt-8`}>
          <div className={`${theme.card_default}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${theme.text_title}`}>
                Kelas Dosen
              </h2>
              <button
                onClick={() => setShowModalAddClass(true)}
                className={`${theme.button_add}`}
              >
                <Plus className="w-4 h-4" /> Tambah Kelas
              </button>
            </div>

            <div className="overflow-x-auto p-1">
              <table className={`min-w-full text-sm text-left ${theme.text_default} border-separate border-spacing-y-1`}>
                <thead className={`uppercase ${theme.text_title}`}>
                  <tr className="">
                    <th className={`px-4 py-3 border-b min-w-[150px] ${theme.border_table_default}`}>
                      Prodi & Semester
                    </th>
                    <th className={`px-4 py-3 border-b min-w-[140px] ${theme.border_table_default}`}>
                      Mata Kuliah
                    </th>
                    <th className={`px-4 py-3 border-b text-center min-w-[80px] ${theme.border_table_default}`}>
                      Kelas
                    </th>
                    <th className={`px-4 py-3 border-b text-center min-w-[80px] ${theme.border_table_default}`}>
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataDosen && dataDosen?.classDosen.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className={`text-center py-4 ${theme.text_default}`}
                      >
                        Belum ada kelas yang terdaftar.
                      </td>
                    </tr>
                  ) : (
                    dataDosen &&
                    dataDosen?.classDosen.map((cls) => (
                      <tr
                        key={cls.id}
                        className={`${theme.table_highlight} border ${theme.border_table_default} rounded-md`}
                      >
                        <td className={`px-4 py-2 border-b ${theme.border_table_default}`}>
                          <div className="flex flex-col">
                            <span className={`font-semibold ${theme.text_default}`}>
                              {cls.class.course?.semester.prodi.name}
                            </span>
                            <span className={`${theme.text_default_light} text-sm`}>
                              Semester{" "}
                              {cls.class.course?.semester.semesterNumber}
                            </span>
                          </div>
                        </td>
                        <td className={`px-4 py-2 border-b ${theme.border_table_default}`}>
                          {cls.class.course?.name}
                        </td>
                        <td className={`px-4 py-2 border-b ${theme.border_table_default} text-center`}>
                          {cls.class.name}
                        </td>
                        <td className={`px-4 py-2 border-b ${theme.border_table_default} text-center space-x-2`}>
                          <Link
                            href={`/admin/dosen/kelas/detail/${cls.class.id}`}
                          >
                            <ButtonIcon
                              title="Pantau"
                              className={`${theme.icon_set} hover:${theme.text_default_blue} `}
                              icon={<Eye size={18} />}
                            />
                          </Link>
                          <ButtonIcon
                            title="Hapus"
                            className="hover:text-red-500"
                            onClick={() => {
                              // setModalDeleteOpen(true);
                              // setSelectedField(matkul as any);
                            }}
                            icon={<Trash2 size={18} />}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Custom */}
        <ModalForm
          handleSubmit={() => handleSubmit(formData)}
          showModalForm={showModalAddClass}
          closeModalForm={() => setShowModalAddClass(false)}
          title="Tambah Kelas Dosen"
          isLoading={loading}
          error={error}
          isFormValid={
            formData.nip !== undefined &&
            formData.prodiId !== undefined &&
            formData.semesterId !== undefined &&
            formData.courseId !== undefined &&
            formData.classId !== undefined
          }
        >
          {/* Prodi */}
          <div>
            <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
              Program Studi <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="prodiId"
                value={formData.prodiId}
                onChange={handleChange}
                required
                disabled={loading}
                className={`${theme.highlight_filter} flex-1`}
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

          {/* Semester */}
          <div>
            <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
              Semester <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="semesterId"
                value={formData.semesterId}
                onChange={handleChange}
                required
                disabled={loading || !formData.prodiId}
                className={`${theme.highlight_filter} flex-1`}
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

          {/* Mata Kuliah */}
          <div>
            <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
              Mata Kuliah <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                required
                disabled={loading || !formData.semesterId}
                className={`${theme.highlight_filter} flex-1`}
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

          {/* Kelas */}
          <div>
            <label className={`block text-sm font-medium ${theme.text_title} mb-1`}>
              Kelas <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                required
                disabled={loading || !formData.courseId}
                className={`${theme.highlight_filter} flex-1`}
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
                  ?.courses?.find((course) => course.id === formData.courseId)
                  ?.class?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </ModalForm>

      </div>
    </>
  );
}
