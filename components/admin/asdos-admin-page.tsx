"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { deleteAsdos } from "@/data/asdos";
import { theme } from "@/lib/theme";
import { TGetAsdoss } from "@/lib/types";
import { Info, Pen, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface AsdosAdminPageProps {
  dataAsdoss: TGetAsdoss;
}

const AsdosAdminPage = ({ dataAsdoss }: AsdosAdminPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [daftarasdos, setDaftarasdos] = useState(
    dataAsdoss?.map((asdos) => ({
      npm: asdos.npm || "",
      email: asdos.user.email || "",
      name: asdos.user.name || "",
      whatsapp: asdos.whatsapp || "",
      domisili: asdos.domisili || "",
      class: asdos.classAsdos.map((classAsdos) => classAsdos.class),
      prodi: [
        ...new Set(
          asdos.classAsdos
            .map((classAsdos) => classAsdos.class.course?.semester.prodi.name)
            .filter(Boolean)
        ),
      ],
      semester: [
        ...new Set(
          asdos.classAsdos
            .map(
              (classAsdos) => classAsdos.class.course?.semester.semesterNumber
            )
            .filter(Boolean)
        ),
      ],
      course: [
        ...new Set(
          asdos.classAsdos
            .map((classAsdos) => classAsdos.class.course?.name)
            .filter(Boolean)
        ),
      ],
    })) || []
  );

  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    npm: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [prodiFilter, setProdiFilter] = useState<string>("all");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    let filtered = daftarasdos;

    if (searchTerm) {
      filtered = filtered.filter(
        (asdos) =>
          asdos.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (asdos.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (asdos.whatsapp ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (asdos.domisili ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          asdos.class.some((cls) =>
            cls.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          asdos.course.some(
            (cour) =>
              cour && cour.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          asdos.prodi.some(
            (prodi) =>
              prodi && prodi.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          asdos.semester.some(
            (sem) => sem && sem.toString().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (prodiFilter !== "all") {
      filtered = filtered.filter((asdos) => asdos.prodi.includes(prodiFilter));
    }

    if (semesterFilter !== "all") {
      filtered = filtered.filter((asdos) =>
        asdos.semester.includes(parseInt(semesterFilter))
      );
    }

    return filtered;
  }, [daftarasdos, searchTerm, prodiFilter, semesterFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setProdiFilter("all");
    setSemesterFilter("all");
  };

  // Fix: Get unique prodi and semester from all asdos
  const uniqueProdi = [...new Set(daftarasdos.flatMap((asdos) => asdos.prodi))];
  const uniqueSemester = [
    ...new Set(daftarasdos.flatMap((asdos) => asdos.semester)),
  ];

  const handleDeleteasdos = async (npm: string) => {
    setLoading(true);
    await deleteAsdos(npm)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setDaftarasdos(daftarasdos.filter((asdos) => asdos.npm !== npm));
          setMessage(res.success);
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setModalDeleteOpen(false);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  return (
    <div className="lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${theme.text_title} mb-2`}>Data asdos</h1>
          <p className={`${theme.text_default_light}`}>
            Menampilkan {filteredData.length} dari {daftarasdos.length} data
          </p>
        </div>
        <div className="mb-6 space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`${theme.icon_search}`}/>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan NPM, nama, whatsapp, domisili, atau mata kuliah..."
              className={`${theme.highlight_search}`}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${theme.text_default} mb-2`}>
                Filter Prodi
              </label>
              <select
                value={prodiFilter}
                onChange={(e) => setProdiFilter(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                <option value="all">Semua Prodi</option>
                {uniqueProdi.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${theme.text_default} mb-2`}>
                Filter Semester
              </label>
              <select
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                <option value="all">Semua Semester</option>
                {uniqueSemester.map((semester) => (
                  <option key={semester} value={semester?.toString()}>
                    Semster {semester}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2.5">
              <button
                onClick={clearFilters}
                className={`${theme.button_add}`}
              >
                <RefreshCw size={16} />
                Reset
              </button>
              <Link
                href="/admin/users/add"
                className={`${theme.button_reset}`}
              >
                <Plus size={16} />
                Tambah
              </Link>
            </div>
          </div>

          {(searchTerm ||
            prodiFilter !== "all" ||
            semesterFilter !== "all") && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className={`${theme.background_result_filter}`}>
                    Search: &quot;{searchTerm}&quot;
                  </span>
                )}
                {prodiFilter !== "all" && (
                  <span className={`${theme.background_result_filter}`}>
                    Prodi: {prodiFilter}
                  </span>
                )}
                {semesterFilter !== "all" && (
                  <span className={`${theme.background_result_filter}`}>
                    Semester: {semesterFilter}
                  </span>
                )}
              </div>
            )}
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table
            className={`w-full table-auto text-sm text-center ${theme.text_default}`}
          >
            <thead className={`${theme.table_header} text-white`}>
              <tr>
                <th className="px-6 py-4">NPM & Nama</th>
                <th className="px-6 py-4">Whatsapp</th>
                <th className="px-6 py-4">Domisili</th>
                <th className="px-6 py-4">Mata Kuliah</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((asdos) => (
                  <tr
                    key={asdos.npm}
                    className={`border-b ${theme.border_table_default} ${theme.table_highlight}`}
                  >
                    <td className={`px-6 py-4 font-medium  ${theme.text_default} text-left`}>
                      <div>{asdos.npm}</div>
                      <div className={`text-sm ${theme.text_default_light} text-left`}>
                        {asdos.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{asdos.whatsapp}</td>
                    <td className="px-6 py-4">{asdos.domisili}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {asdos.class.map((cls, index) => (
                          <span
                            key={cls.id}
                            className="text-xs px-2 py-1 rounded"
                          >
                            {index + 1}. {cls.course?.name} ({cls.name}) -{" "}
                            {cls.course?.semester.semesterNumber} -{" "}
                            {cls.course?.semester.prodi.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center justify-center ${theme.text_default} gap-6`}>
                        <Link href={`/admin/asdos/detail/${asdos.npm}`}>
                          <ButtonIcon
                            title="Detail"
                            className="hover:text-yellow-400"
                            icon={<Info size={18} />}
                          />
                        </Link>
                        <Link href={`/admin/asdos/edit/${asdos.npm}`}>
                          <ButtonIcon
                            title="Edit"
                            className="hover:text-blue-400"
                            icon={<Pen size={18} />}
                          />
                        </Link>
                        <ButtonIcon
                          title="Hapus"
                          className="hover:text-red-500"
                          onClick={() => {
                            setModalDeleteOpen(true);
                            setSelectedField({
                              npm: asdos.npm,
                              name: asdos.name || "",
                            });
                          }}
                          icon={<Trash2 size={18} />}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    {daftarasdos.length === 0
                      ? "Tidak ada data"
                      : "Tidak ada data yang sesuai dengan filter"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalConfirm
        handleClose={() => setModalDeleteOpen(false)}
        handleConfirm={() => handleDeleteasdos(selectedField.npm)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Hapus Asdos Ini"
        message={`Apakah Anda yakin ingin menghapus ${selectedField.name}?`}
      />
    </div>
  );
};

export default AsdosAdminPage;
