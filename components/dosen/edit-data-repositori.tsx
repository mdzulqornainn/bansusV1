"use client";

import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { updateRepositoriData } from "@/data/repositori";
import { FormDataUpdateRepositori } from "@/lib/interfaces";
import { theme } from "@/lib/theme";
import { TGetRepositoriDataById } from "@/lib/types";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditDataRepositoriDosenPageProps {
  dataRepositori: TGetRepositoriDataById;
}

const EditDataRepositoriDosenPage = ({
  dataRepositori,
}: EditDataRepositoriDosenPageProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormDataUpdateRepositori>({
    namaDataset: dataRepositori?.namaDataset || "",
    thumbnail: dataRepositori?.thumbnail || "",
    namaPemilik: dataRepositori?.namaPemilik || "",
    jenisDataset: dataRepositori?.jenisDataset || "",
    linkPublikasi: dataRepositori?.linkPublikasi || "",
    linkRepositori: dataRepositori?.linkRepositori || "",
    deskripsiDataset: dataRepositori?.deskripsiDataset || "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const datasetTypes = ["Text", "Gambar", "Video", "Suara", "Table", "Lainnya"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateRepositoriData(dataRepositori?.id || "", formData).then(
        (res) => {
          if (res.error) {
            setError(res.error);
          } else if (res.success) {
            router.push("/dosen/data-repositori");
          }
        }
      );
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        <Link href="/dosen/data-repositori" className={theme.icon_link}>
          <ArrowLeft className={theme.icon_arrow_left} />
          <span>Kembali</span>
        </Link>

        <div className={`${theme.card_max_4} p-6 ${theme.card_shadow}`}>
          <h2
            className={`text-center text-3xl font-bold ${theme.text_title} mb-8`}
          >
            Tambah Dataset Baru
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Nama Dataset */}
            <div className="md:col-span-2">
              <label className={theme.text_title}>Nama Dataset</label>
              <input
                name="namaDataset"
                placeholder="Masukkan Nama Dataset"
                value={formData.namaDataset as string}
                onChange={handleChange}
                required
                disabled={loading}
                className={`${theme.highlight_filter} w-full`}
              />
            </div>

            {/* Nama Pemilik */}
            <div>
              <label className={theme.text_title}>Nama Pemilik</label>
              <input
                name="namaPemilik"
                value={formData.namaPemilik as string}
                onChange={handleChange}
                required
                disabled={loading}
                className={`${theme.highlight_filter} w-full`}
              />
            </div>

            {/* Jenis Dataset */}
            <div>
              <label className={theme.text_title}>Jenis Dataset</label>
              <select
                name="jenisDataset"
                value={formData.jenisDataset as string}
                onChange={handleChange}
                required
                disabled={loading}
                className={`${theme.highlight_filter} w-full`}
              >
                <option value="">Pilih Jenis</option>
                {datasetTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Link Publikasi */}
            <div>
              <label className={theme.text_title}>Link Publikasi</label>
              <input
                type="url"
                name="linkPublikasi"
                placeholder="Masukkan Link Publikasi https://..."
                value={formData.linkPublikasi as string}
                onChange={handleChange}
                disabled={loading}
                className={`${theme.highlight_filter} w-full`}
              />
            </div>

            {/* Link Repositori */}
            <div>
              <label className={theme.text_title}>Link Repositori</label>
              <input
                type="url"
                name="linkRepositori"
                placeholder="Masukkan Link Repositori https://..."
                value={formData.linkRepositori as string}
                onChange={handleChange}
                disabled={loading}
                className={`${theme.highlight_filter} w-full`}
              />
            </div>

            <div className="md:col-span-2 h-40">
              <label className={theme.text_title}>Deskripsi Dataset</label>
              <textarea
                name="deskripsiDataset"
                placeholder="Masukkan Deskripsi Dataset"
                value={formData.deskripsiDataset as string}
                onChange={handleChange}
                disabled={loading}
                className={`${theme.highlight_filter} w-full h-full`}
              />
            </div>

            {error && (
              <FormMessage
                message={error}
                type="error"
                className="md:col-span-2"
              />
            )}

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`${theme.button_add} px-6 py-3 rounded-lg`}
              >
                <Save className="inline mr-2" />
                {loading ? "Menyimpan..." : "Simpan Dataset"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ModalConfirm
        isOpen={modalOpen}
        title="Simpan Dataset"
        message="Apakah data sudah benar?"
        handleClose={() => setModalOpen(false)}
        handleConfirm={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default EditDataRepositoriDosenPage;
