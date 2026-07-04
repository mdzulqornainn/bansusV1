"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { deleteAsdosApplication } from "@/data/calon-asdos";
import { theme } from "@/lib/theme";
import { TGetAsdosApplications } from "@/lib/types";
import { Info, Pen, RefreshCw, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface PendaftarAdminPageProps {
  dataAsdosApplications: TGetAsdosApplications;
}

const PendaftarAdminPage = ({
  dataAsdosApplications,
}: PendaftarAdminPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [daftarPelamar, setDaftarPelamar] = useState(
    dataAsdosApplications?.map((asdos) => ({
      npm: asdos.npm,
      name: asdos.user.name,
      whatsapp: asdos.whatsapp,
      domisili: asdos.domisili,
      wawancara: asdos.wawancara,
      alasanOnline: asdos.alasanOnline,
      status: asdos.status,
      matkul: asdos.courseApplicantion,
    })) || []
  );

  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    npm: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [wawancaraFilter, setWawancaraFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    let filtered = daftarPelamar;

    if (searchTerm) {
      filtered = filtered.filter(
        (pelamar) =>
          pelamar.npm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (pelamar.name ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          pelamar.whatsapp.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pelamar.domisili.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pelamar.matkul.some((matkul) =>
            matkul.course.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((pelamar) => pelamar.status === statusFilter);
    }

    if (wawancaraFilter !== "all") {
      filtered = filtered.filter(
        (pelamar) => pelamar.wawancara === wawancaraFilter
      );
    }

    return filtered;
  }, [daftarPelamar, searchTerm, statusFilter, wawancaraFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setWawancaraFilter("all");
  };

  const uniqueStatuses = [...new Set(daftarPelamar.map((p) => p.status))];
  const uniqueWawancara = [...new Set(daftarPelamar.map((p) => p.wawancara))];

  const handleDeletePelamar = async (npm: string) => {
    setLoading(true);
    await deleteAsdosApplication(npm)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setDaftarPelamar(
            daftarPelamar.filter((pelamar) => pelamar.npm !== npm)
          );
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
          <h1 className={`text-2xl font-bold ${theme.text_title} mb-2`}>Data Pelamar</h1>
          <p className={`${theme.text_default_light}`}>
            Menampilkan {filteredData.length} dari {daftarPelamar.length} data
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`${theme.icon_search}`} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan NPM, nama, whatsapp, domisili, atau mata kuliah..."
              className={`${theme.highlight_search}`}
            />
          </div>

          <div className={`${theme.text_default} flex flex-wrap gap-4 `}>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium  mb-2">
                Filter Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                <option value="all">Semua Status</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status as string}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium  mb-2">
                Filter Wawancara
              </label>
              <select
                value={wawancaraFilter}
                onChange={(e) => setWawancaraFilter(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                <option value="all">Semua Wawancara</option>
                {uniqueWawancara.map((wawancara) => (
                  <option key={wawancara} value={wawancara}>
                    {wawancara}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className={`${theme.button_reset}`}
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </div>

          {(searchTerm || statusFilter !== "all" || wawancaraFilter !== "all") && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className={` ${theme.background_result_filter}`}>
                  Search: &quot;{searchTerm}&quot;
                </span>
              )}
              {statusFilter !== "all" && (
                // <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                <span
                  className={`px-3 mt-1 py-1 text-xs font-semibold rounded-full ${statusFilter === "accepted"
                    ? `${theme.status_accepted}`
                    : statusFilter === "rejected"
                      ? `${theme.status_rejected}`
                      : `${theme.status_processing}`
                    }`}
                >
                  Status: {statusFilter}
                </span>
              )}
              {wawancaraFilter !== "all" && (
                <span className={`px-3 mt-1 py-1 text-xs font-semibold rounded-full ${theme.status_accepted}`}>
                  Wawancara: {wawancaraFilter}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table className={`${theme.text_default} w-full table-auto text-sm`}>
            <thead className={`${theme.table_header} text-white text-left`}>
              <tr>
                <th className="px-6 py-4 min-w-[160px]">NPM & Nama</th>
                <th className="px-6 py-4 min-w-[140px]">Whatsapp</th>
                <th className="px-6 py-4 min-w-[140px]">Domisili</th>
                <th className="px-6 py-4 min-w-[120px]">Wawancara</th>
                <th className="px-6 py-4 min-w-[160px]">Alasan</th>
                <th className="px-6 py-4 min-w-[120px]">Status</th>
                <th className="px-6 py-4 min-w-[220px]">Matkul</th>
                <th className="px-6 py-4 min-w-[120px] text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((asdos) => (
                  <tr
                    key={asdos.npm}
                    className={`border-b ${theme.border_table_default} ${theme.table_highlight}`}
                  >
                    <td className={`px-6 py-4 font-medium text-left`}>
                      <div>{asdos.npm}</div>
                      <div className={`text-sm ${theme.text_default_light}`}>{asdos.name}</div>
                    </td>
                    <td className="px-6 py-4 text-left">{asdos.whatsapp}</td>
                    <td className="px-6 py-4 text-left">{asdos.domisili}</td>
                    <td className="px-6 py-4 text-left">{asdos.wawancara}</td>
                    <td className="px-6 py-4 text-left">
                      {asdos.alasanOnline || "Tidak Ada Alasan"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${asdos.status === "accepted"
                          ? `${theme.status_accepted}`
                          : asdos.status === "rejected"
                            ? `${theme.status_rejected}`
                            : `${theme.status_processing}`
                          }`}
                      >
                        {asdos.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <ul className="space-y-1 list-disc list-inside text-sm">
                        {asdos.matkul.map((matkul) => (
                          <li key={matkul.id}>
                            {matkul.course.name} - {matkul.course.semester.prodi.name} - Semester {matkul.course.semester.semesterNumber}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center  gap-6">
                        <Link href={`/admin/pendaftar/detail/${asdos.npm}`}>
                          <ButtonIcon
                            title="Detail"
                            className="hover:text-yellow-400"
                            icon={<Info size={18} />}
                          />
                        </Link>
                        <Link href={`/admin/pendaftar/edit/${asdos.npm}`}>
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
                  <td colSpan={8} className={`px-6 py-4 text-center ${theme.text_default_light}`}>
                    {daftarPelamar.length === 0
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
        handleConfirm={() => handleDeletePelamar(selectedField.npm)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Kill Pelamar Ini"
        message={`Apakah Anda yakin ingin mengkill ${selectedField.name}?`}
      />
    </div>
  );
};

export default PendaftarAdminPage;
