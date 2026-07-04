"use client";

import { theme } from "@/lib/theme";
import { TgetRepositoriDatasByDosenNip } from "@/lib/types";
import Link from "next/link";
import ButtonIcon from "../ui/button-icon";

import { deleteRepositoriData } from "@/data/repositori";
import {
  ExternalLink,
  FileText,
  Github,
  Image as ImageIcon,
  Info,
  Music,
  Pen,
  Plus,
  RefreshCw,
  Search,
  Table as TableIcon,
  Trash2,
  Video,
} from "lucide-react";
import { JSX, useState } from "react";
import ModalConfirm from "../ui/modal-confirm";
import { FormMessage } from "../ui/form/message";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

interface DataRepositoriAdminPageProps {
  dataRepositori: TgetRepositoriDatasByDosenNip;
}

/* -------------------------------------------------------------------------- */
/*                               Helper Config                                */
/* -------------------------------------------------------------------------- */

const ICON_SIZE = "w-3 h-3 mr-1";

const TYPE_ICON_MAP: Record<string, JSX.Element> = {
  gambar: <ImageIcon className={ICON_SIZE} />,
  video: <Video className={ICON_SIZE} />,
  suara: <Music className={ICON_SIZE} />,
  table: <TableIcon className={ICON_SIZE} />,
};

const TYPE_BADGE_MAP: Record<string, string> = {
  gambar: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  table: "bg-green-500/20 text-green-300 border-green-500/30",
  suara: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

/* -------------------------------------------------------------------------- */
/*                                Main Component                               */
/* -------------------------------------------------------------------------- */

const DataRepositoriAdminPage = ({
  dataRepositori,
}: DataRepositoriAdminPageProps) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [daftarRepositori, setDaftarRepositori] = useState(
    dataRepositori || []
  );
  const getTypeIcon = (type: string) =>
    TYPE_ICON_MAP[type.toLowerCase()] ?? <FileText className={ICON_SIZE} />;

  const getTypeBadgeColor = (type: string) =>
    TYPE_BADGE_MAP[type.toLowerCase()] ??
    "bg-blue-500/20 text-blue-300 border-blue-500/30";
  const handleDeleteRepositori = async (id: string) => {
    setLoading(true);
    await deleteRepositoriData(id)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setMessage(res.success);
          setDaftarRepositori(
            daftarRepositori.filter((item) => item.id !== id)
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

  const [selectedField, setSelectedField] = useState({
    id: "",
    namaDataset: "",
    namaPemilik: "",
    jenisDataset: "",
    linkPublikasi: "",
    linkRepositori: "",
    deskripsiDataset: "",
  });
  return (
    <div className="min-h-screen p-6 lg:ml-64">
      {/* ============================ Header ============================ */}
      <header className="mb-8">
        <h1 className={`text-3xl font-bold ${theme.text_title}`}>
          Dashboard Repositori Saya
        </h1>
        <p className={`${theme.text_default_light} mt-1`}>
          Kelola dataset yang telah Anda kontribusikan.
        </p>
      </header>

      {/* ============================ Filter ============================ */}
      <section className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.icon_search}`}
          />
          <input
            type="text"
            placeholder="Cari dataset..."
            className={theme.highlight_search}
          />
        </div>

        {/* Filter & Action */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className={`block text-sm ${theme.text_default} mb-2`}>
              Jenis Dataset
            </label>
            <select className={theme.highlight_filter}>
              <option value="all">Semua Jenis Dataset</option>
            </select>
          </div>

          <div className="flex gap-2.5">
            <button className={theme.button_add}>
              <RefreshCw size={16} />
              Reset
            </button>
            <Link
              href="/dosen/data-repositori/add"
              className={theme.button_reset}
            >
              <Plus size={16} />
              Tambah
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ Table ============================ */}
      <section
        className={`rounded-xl border ${theme.table_highlight} ${theme.card_shadow}`}
      >
        <div className="p-5 border-b border-gray-800 flex justify-between">
          <h3 className={`font-semibold ${theme.text_title}`}>
            Daftar Dataset Anda
          </h3>
        </div>

        <div className="overflow-x-auto">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table className="w-full text-sm">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Nama Dataset</th>
                <th className="px-6 py-4">Deskripsi</th>
                <th className="px-6 py-4 text-center">Tautan</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {dataRepositori?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/30">
                  {/* Nama */}
                  <td className="px-6 py-4">
                    <p className={`font-medium ${theme.text_default}`}>
                      {item.namaDataset}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-xs rounded border ${getTypeBadgeColor(
                          item.jenisDataset
                        )}`}
                      >
                        {getTypeIcon(item.jenisDataset)}
                        {item.jenisDataset}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {item.namaPemilik}
                      </span>
                    </div>
                  </td>

                  {/* Deskripsi */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className={`${theme.text_default_light} line-clamp-2`}>
                      {item.deskripsiDataset}
                    </p>
                  </td>

                  {/* Link */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      {item.linkRepositori ? (
                        <a href={item.linkRepositori} target="_blank">
                          <Github className="w-5 h-5 hover:text-white" />
                        </a>
                      ) : (
                        <Github className="w-5 h-5 text-gray-700" />
                      )}

                      {item.linkPublikasi ? (
                        <a href={item.linkPublikasi} target="_blank">
                          <ExternalLink className="w-5 h-5 hover:text-blue-400" />
                        </a>
                      ) : (
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      )}
                    </div>
                  </td>

                  {/* Aksi */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-6">
                      <Link href={`/dosen/data-repositori/detail/${item.id}`}>
                        <ButtonIcon title="Detail" icon={<Info size={18} />} />
                      </Link>
                      <Link href={`/dosen/data-repositori/edit/${item.id}`}>
                        <ButtonIcon title="Edit" icon={<Pen size={18} />} />
                      </Link>
                      <ButtonIcon
                        title="Hapus"
                        className="hover:text-red-500"
                        onClick={() => {
                          setModalDeleteOpen(true);
                          setSelectedField(item as any); // eslint-disable-line @typescript-eslint/no-explicit-any
                        }}
                        icon={<Trash2 size={18} />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Menampilkan {dataRepositori?.length || 0} dataset
          </p>
        </div>
      </section>
      <ModalConfirm
        handleClose={() => setModalDeleteOpen(false)}
        handleConfirm={() => handleDeleteRepositori(selectedField.id)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Hapus matakuliah ini?"
        message={`Apakah Anda yakin ingin menghapus ${selectedField.namaDataset}?`}
      />
    </div>
  );
};

export default DataRepositoriAdminPage;
