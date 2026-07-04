"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { deleteJadwalWawancara } from "@/data/jadwal-wawancara";
import { theme } from "@/lib/theme";
import { TGetJadwalWawancaras } from "@/lib/types";
import { Info, Pen, RefreshCw, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface JadwalAdminPageProps {
  dataJadwalWawancaras: TGetJadwalWawancaras;
}

const JadwalAdminPage = ({ dataJadwalWawancaras }: JadwalAdminPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [daftarJadwalWawancaras, setDaftarJadwalWawancaras] = useState(
    dataJadwalWawancaras?.map((jadwal) => ({
      id: jadwal.id,
      tanggal: jadwal.tanggal,
      hari: jadwal.hari,
      jam: jadwal.jam,
      lokasi: jadwal.lokasi,
    })) || []
  );

  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    id: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hariFilter, setHariFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    let filtered = daftarJadwalWawancaras;

    if (searchTerm) {
      filtered = filtered.filter(
        (jadwal) =>
          jadwal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (jadwal.tanggal ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (jadwal.hari ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (jadwal.jam ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (jadwal.lokasi ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (hariFilter !== "all") {
      filtered = filtered.filter((jadwal) => jadwal.hari === hariFilter);
    }

    return filtered;
  }, [daftarJadwalWawancaras, searchTerm, hariFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setHariFilter("all");
  };

  const uniqueHari = [...new Set(daftarJadwalWawancaras.map((p) => p.hari))];

  const handleDeleteWawancara = async (id: string) => {
    setLoading(true);
    await deleteJadwalWawancara(id)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setMessage(res.success);
          setDaftarJadwalWawancaras(
            daftarJadwalWawancaras.filter((item) => item.id !== id)
          );
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
          <h1 className="text-2xl font-bold text-white mb-2">
            Data Jadwal Wawancara
          </h1>
          <p className="text-gray-400">
            Menampilkan {filteredData.length} dari{" "}
            {daftarJadwalWawancaras.length} data
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
              placeholder="Cari berdasarkan ID, tanggal, hari, jam, lokasi ..."
              className="w-full pl-10 pr-4 py-2 border border-white/60 rounded-lg bg-yellow-400/40 focus:bg-yellow-500/80 focus:placeholder-white focus:text-whiteplaceholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter Hari
              </label>
              <select
                value={hariFilter}
                onChange={(e) => setHariFilter(e.target.value)}
                className="cursor-pointer w-full px-3 py-2 border border-white/60 rounded-lg bg-yellow-400/40 focus:bg-yellow-500/80  text-gray-400 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              >
                <option value="all">Semua Hari</option>
                {uniqueHari.map((status) => (
                  <option key={status} value={status as string}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-white/10 backdrop-blur-lg text-white cursor-pointer rounded-lg  transition-colors duration-200 flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </div>

          {(searchTerm || hariFilter !== "all") && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">
                  Search: &quot;{searchTerm}&quot;
                </span>
              )}
              {hariFilter !== "all" && (
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                  Hari: {hariFilter}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table className="w-full table-auto text-sm text-center text-gray-300">
            <thead className="bg-yellow-600 text-gray-200">
              <tr>
                <th className="px-6 py-4">Tanggal & Hari</th>
                <th className="px-6 py-4">Jam</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-yellow-700 hover:bg-yellow-700/30 transition-all duration-500 ease-in-out transform`}
                  >
                    <td className="px-6 py-4 font-medium text-white text-left">
                      <div>{user.tanggal}</div>
                      <div className="text-sm text-gray-400 text-left">
                        {user.hari}
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.jam}</td>
                    <td className="px-6 py-4">{user.lokasi}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center text-gray-300 gap-6">
                        <Link href={`/admin/jadwal/detail/${user.id}`}>
                          <ButtonIcon
                            title="Detail"
                            className="hover:text-yellow-400"
                            icon={<Info size={18} />}
                          />
                        </Link>
                        <Link href={`/admin/jadwal/edit/${user.id}`}>
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
                              id: user.id,
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
                    {daftarJadwalWawancaras.length === 0
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
        handleConfirm={() => handleDeleteWawancara(selectedField.id)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Hapus Jadwal Wawancara"
        message={`Apakah Anda yakin ingin menghapus Jadwal Wawancara?`}
      />
    </div>
  );
};

export default JadwalAdminPage;
