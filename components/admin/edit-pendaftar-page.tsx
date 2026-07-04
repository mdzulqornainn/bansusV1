"use client";

import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { updateAsdosApplication } from "@/data/calon-asdos";
import { FormDataUpdatePendaftar } from "@/lib/interfaces";
import { theme } from "@/lib/theme";
import { TGetAsdosApplication } from "@/lib/types";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditPendaftarPageProps {
  dataAsdosApplication: TGetAsdosApplication;
}

const Info = ({
  title = "",
  value = "",
  bold = false,
}: {
  title?: string;
  value?: string;
  bold?: boolean;
}) => (
  <div>
    <dt className={`text-sm font-medium ${theme.text_title}`}>{title}</dt>
    <dd
      className={`mt-1 text-sm ${bold ? `font-bold ${theme.text_default}` : ` ${theme.text_default}`}`}
    >
      {value}
    </dd>
  </div>
);

const StatusBadge = ({ status = "processing" }: { status?: string }) => {
  const base =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block capitalize";
  const statusStyle = {
    accepted: `${theme.status_accepted}`,
    rejected: `${theme.status_rejected}`,
    processing: `${theme.status_processing}`,
  };

  return (
    <span
      className={`${base} ${statusStyle[status as keyof typeof statusStyle]}`}
    >
      {status}
    </span>
  );
};

const EditPendaftarPage = ({
  dataAsdosApplication,
}: EditPendaftarPageProps) => {
  const [form, setForm] = useState<FormDataUpdatePendaftar>({
    whatsapp: dataAsdosApplication?.whatsapp ?? "",
    domisili: dataAsdosApplication?.domisili ?? "",
    status: dataAsdosApplication?.status ?? "processing",
    wawancara: dataAsdosApplication?.wawancara ?? "offline",
    alasanOnline: dataAsdosApplication?.alasanOnline ?? "",
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSave = async (data: FormDataUpdatePendaftar) => {
    setLoading(true);
    await updateAsdosApplication(dataAsdosApplication?.npm ?? "", data)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          router.push("/admin/pendaftar");
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

  const handleCancel = () => {
    setModalOpen(false);
  };

  if (!dataAsdosApplication) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className={`${theme.card_max_4}`}>
          <div className={`${theme.card_default}`}>
            <div className={`border-b ${theme.border_outside}`}>
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Edit Pendaftar
              </h1>
              <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>Data tidak ditemukan</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        <Link
          href="/admin/pendaftar"
          className={`${theme.icon_link}`}
        >
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar Pendaftar</span>
        </Link>

        <div className={`${theme.card_max_4}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className={`${theme.card_default}`}
          >

            <div className="justify-between flex">
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Edit Data Pendaftar
              </h1>
              <h1>
                <StatusBadge status={form.status} />
              </h1>
            </div>

            <p className={`text-sm  ${theme.text_default} mt-1`}>
              {dataAsdosApplication?.npm} - {dataAsdosApplication?.user?.name}
            </p>

            <div className="mt-4 mb-2">
              <hr className={`border-t ${theme.border_table_default} rounded-full`} />
            </div>

            <div className="pt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div>
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    required
                    className={`${theme.highlight_filter}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Domisili
                  </label>
                  <input
                    type="text"
                    className={`${theme.highlight_filter}`}
                    value={form.domisili}
                    onChange={(e) => setForm({ ...form, domisili: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Status Lamaran
                  </label>
                  <select
                    className={`${theme.highlight_filter}`}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="accepted">accepted</option>
                    <option value="processing">processing</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`text-sm font-medium ${theme.text_title}`}>
                    Jenis Wawancara
                  </label>
                  <select
                    className={`${theme.highlight_filter}`}
                    value={form.wawancara}
                    onChange={(e) =>
                      setForm({ ...form, wawancara: e.target.value })
                    }
                  >
                    <option value="offline">offline</option>
                    <option value="online">online</option>
                  </select>
                </div>

                {form.wawancara === "online" && (
                  <div className="sm:col-span-2 space-y-1">
                    <label className={`text-sm font-medium ${theme.text_title}`}>
                      Alasan Wawancara Online
                    </label>
                    <textarea
                      className={`${theme.highlight_filter}`}
                      value={form.alasanOnline}
                      onChange={(e) =>
                        setForm({ ...form, alasanOnline: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                )}

                <div className="sm:col-span-2 border-t border-white my-4" />

                <div className="sm:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Alasan Menjadi Asdos */}
                    <div>
                      <dt className={`${theme.text_title} font-medium text-sm mb-2`}>
                        Alasan Menjadi Asisten Dosen
                      </dt>
                      <dd className={`text-sm ${theme.text_default} whitespace-pre-line italic`}>
                        {dataAsdosApplication?.alasan || "-"}
                      </dd>
                    </div>

                    {/* Pilihan Mata Kuliah */}
                    <div>
                      <dt className={`${theme.text_title} font-medium text-sm mb-2`}>
                        Pilihan Mata Kuliah
                      </dt>
                      <dd className={`text-sm ${theme.text_default} space-y-1 list-disc list-inside`}>
                        <li>
                          {dataAsdosApplication?.courseApplicantion[0].course.name}
                        </li>
                        <li>
                          {dataAsdosApplication?.courseApplicantion[1].course.name}
                        </li>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 mb-10">
                <hr className={`border-t ${theme.border_table_default} rounded-full`} />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info
                  title="Bersedia untuk menjadi Asdos di 2 mata kuliah?"
                  value={dataAsdosApplication?.bersediaDuaMatkul ? "Ya" : "Tidak"}
                  bold
                />
                <Info
                  title="Punya pengalaman asdos?"
                  value={dataAsdosApplication?.pengalamanAsdos ? "Ya" : "Tidak"}
                  bold
                />
                <Info
                  title="Bersedia ditempatkan pada mata kuliah selain yang dipilih?"
                  value={
                    dataAsdosApplication?.bersediaDitempatkanLain
                      ? "Ya"
                      : "Tidak"
                  }
                  bold
                />

                {/* Surat Pernyataan jadi satu item grid */}
                <div>
                  <dt className={`${theme.text_title} font-medium text-sm`}>
                    Surat Pernyataan
                  </dt>
                  <dd className="mt-1 text-sm">
                    <Link
                      href={dataAsdosApplication?.suratPernyataan.linkView ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${theme.text_default} hover:underline`}
                    >
                      Lihat Dokumen
                    </Link>
                  </dd>
                </div>
              </div>


              <div className="mt-12 mb-10 ">
                <hr className={`border-t ${theme.border_table_default} rounded-full`} />
              </div>

              <div className="sm:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <dt className={`${theme.text_title} font-medium text-sm`}>
                    Tanggal Mendaftar
                  </dt>
                  <dd className={`mt-1 text-sm ${theme.text_default}`}>
                    {new Date(
                      dataAsdosApplication?.createdAt ?? new Date()
                    ).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className={`${theme.text_title} font-medium text-sm`}>
                    Terakhir Diperbarui
                  </dt>
                  <dd className={`mt-1 text-sm ${theme.text_default}`}>
                    {new Date(
                      dataAsdosApplication?.updatedAt ?? dataAsdosApplication?.createdAt ?? new Date()
                    ).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </dd>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex gap-3">
                    <Link
                      href={`#`}
                      className={`${theme.button_cancel}`}
                    >
                      <X className="h-4 w-4" /> Batal
                    </Link>
                    <button
                      type="submit"
                      className={`cursor-pointer inline-flex items-center gap-1 rounded-lg border ${theme.table_highlight} ${theme.text_default_blue} px-4 py-2 text-sm font-semibold `}
                    >
                      <Save className="h-4 w-4" /> Simpan
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <FormMessage
                  message={error}
                  type="error"
                  className="col-span-2"
                />
              )}
            </div>
          </form>
        </div>

      </div >
      <ModalConfirm
        handleClose={handleCancel}
        handleConfirm={() => handleSave(form)}
        message="Apakah anda yakin ingin menyimpan perubahan?"
        title="Simpan Perubahan"
        isOpen={modalOpen}
        loading={loading}
      />
    </>
  );
};

export default EditPendaftarPage;
