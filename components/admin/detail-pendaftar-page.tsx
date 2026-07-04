"use client";

import { addAsdos } from "@/data/asdos";
import { updateAsdosApplicationToGuest } from "@/data/user";
import { theme } from "@/lib/theme";
import { TGetAsdosApplication } from "@/lib/types";
import { ArrowLeft, Download, ExternalLink, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormMessage } from "../ui/form/message";
import ModalConfirm from "../ui/modal-confirm";

interface DetailPendaftarPageProps {
  dataAsdosApplication: TGetAsdosApplication;
}

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
      className={`mt-1 text-sm ${bold ? `font-bold ${theme.text_default}` : `${theme.text_default}`}`}
    >
      {value}
    </dd>
  </div>
);

const DetailPendaftarPage = ({
  dataAsdosApplication,
}: DetailPendaftarPageProps) => {
  const formDataAccept = {
    npm: dataAsdosApplication?.npm || "",
    userId: dataAsdosApplication?.userId || "",
    fileId: dataAsdosApplication?.fileId || "",
    whatsapp: dataAsdosApplication?.whatsapp || "",
    domisili: dataAsdosApplication?.domisili || "",
    alasan: dataAsdosApplication?.alasan || "",
  };
  const formDataReject = {
    npm: dataAsdosApplication?.npm || "",
    userId: dataAsdosApplication?.userId || "",
  };
  const [modalOpenAccept, setModalOpenAccept] = useState<boolean>(false);
  const [modalOpenReject, setModalOpenReject] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleAcceptAsdos = async (data: typeof formDataAccept) => {
    setLoading(true);
    await addAsdos(data)
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
        setModalOpenAccept(false);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  const handleRejectAsdos = async (data: typeof formDataReject) => {
    setLoading(true);
    await updateAsdosApplicationToGuest(data.userId, data.npm)
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
        setModalOpenAccept(false);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  const handleCancelAccept = () => {
    setModalOpenAccept(false);
  };
  const handleCancelReject = () => {
    setModalOpenReject(false);
  };

  if (!dataAsdosApplication) {
    return (
      <div className="min-h-screen p-6 lg:ml-48">
        <div className="max-w-4xl mx-auto">
          <div className={`${theme.card_default}`}>
            <div className={`border-b ${theme.border_outside}`}>
              <h1 className={`text-3xl font-bold ${theme.text_title}`}>
                Detail Pendaftar
              </h1>
              <p className={`text-sm ${theme.text_default_blue} mb-6 mt-3`}>
                Data tidak ditemukan
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6 lg:ml-48">
        <Link href="/admin/pendaftar" className={`${theme.icon_link}`}>
          <ArrowLeft className={`${theme.icon_arrow_left}`} />
          <span>Kembali ke Daftar</span>
        </Link>

        <div className={`${theme.card_max_4}`}>
          <div className={`${theme.card_default}`}>
            {/* Detail Card */}
            <h1 className={`text-3xl font-bold ${theme.text_title}`}>
              Detail Pendaftar
            </h1>
            <p className={`text-sm ${theme.text_default} mt-1`}>
              {dataAsdosApplication?.npm} - {dataAsdosApplication?.user?.name}
            </p>

            <div className="mt-4 mb-2">
              <hr
                className={`border-t ${theme.border_table_default} rounded-full`}
              />
            </div>

            {/* Body Card */}
            <div className="pt-8">
              <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <Info
                  title="Nomor WhatsApp"
                  value={dataAsdosApplication?.whatsapp}
                />
                <Info title="Domisili" value={dataAsdosApplication?.domisili} />
                <div>
                  <dt className={`${theme.text_title} font-medium text-sm`}>
                    Status Lamaran
                  </dt>
                  <dd className="mt-1 text-sm">
                    <StatusBadge
                      status={dataAsdosApplication?.status ?? "processing"}
                    />
                  </dd>
                </div>
                <Info
                  title="Jenis Wawancara"
                  value={dataAsdosApplication?.wawancara}
                />

                {dataAsdosApplication?.wawancara === "online" && (
                  <div className="sm:col-span-2">
                    <dt className={`${theme.text_title} font-medium text-sm`}>
                      Alasan Wawancara Online
                    </dt>
                    <dd className={`mt-1 text-sm ${theme.text_default} italic`}>
                      {dataAsdosApplication?.alasanOnline}
                    </dd>
                  </div>
                )}

                <div className="sm:col-span-2 my-6 border-t border-white" />

                <div className="sm:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt
                        className={`${theme.text_title} font-medium text-sm mb-2`}
                      >
                        Alasan Menjadi Asisten Dosen
                      </dt>
                      <dd
                        className={` text-sm ${theme.text_default} whitespace-pre-line italic`}
                      >
                        {dataAsdosApplication?.alasan || "-"}
                      </dd>
                    </div>

                    <div>
                      <dt
                        className={`${theme.text_title} font-medium text-sm mb-2`}
                      >
                        Pilihan Mata Kuliah
                      </dt>
                      <dd className={`text-sm ${theme.text_default} space-y-1`}>
                        <ul className="list-disc list-inside">
                          <li>
                            {dataAsdosApplication?.courseApplicantion[0]?.course
                              .name || "-"}
                          </li>
                          <li>
                            {dataAsdosApplication?.courseApplicantion[1]?.course
                              .name || "-"}
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 my-6 border-t border-white" />

                <Info
                  title="Bersedia untuk menjadi Asdos di 2 mata kuliah?"
                  value={
                    dataAsdosApplication?.bersediaDuaMatkul ? "Ya" : "Tidak"
                  }
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

                <div>
                  <dt className={`${theme.text_title} font-medium text-sm`}>
                    Surat Pernyataan
                  </dt>
                  <dd className="mt-1 text-sm">
                    <Link
                      href={
                        dataAsdosApplication?.suratPernyataan.linkView ?? ""
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center ${theme.text_default} hover:underline`}
                    >
                      Lihat Dokumen <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                    <span className={`mx-1 ${theme.text_default_light}`}>atau</span>
                    <Link
                      href={
                        dataAsdosApplication?.suratPernyataan.linkDownload ?? ""
                      }
                      rel="noopener noreferrer"
                      download
                      className={`inline-flex items-center ${theme.text_default} hover:underline`}
                    >
                      Download <Download className="w-4 h-4 ml-1" />
                    </Link>
                  </dd>
                </div>

                <div className="sm:col-span-2 my-6 border-t border-white" />
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
                        dataAsdosApplication?.updatedAt ??
                          dataAsdosApplication?.createdAt ??
                          new Date()
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
                </div>

                <div className="sm:col-span-2 my-6 border-t border-white" />

                <div className="sm:col-span-2">
                  <div className="flex flex-col items-end">
                    <p className={`text-xs ${theme.text_default} mb-2`}>
                      Klik <strong>{"Tolak"}</strong> jika pendaftar tidak
                      memenuhi syarat.
                    </p>
                    {error && (
                      <FormMessage
                        message={error}
                        type="error"
                        className="mb-4"
                      />
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setModalOpenReject(true)}
                        className={`${theme.button_cancel}`}
                      >
                        <X className="h-4 w-4" /> Tolak
                      </button>
                      <button
                        onClick={() => setModalOpenAccept(true)}
                        className={`${theme.button_save}`}
                      >
                        <Save className="h-4 w-4" /> Terima
                      </button>
                    </div>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        isOpen={modalOpenAccept}
        loading={loading}
        handleClose={handleCancelAccept}
        handleConfirm={() => handleAcceptAsdos(formDataAccept)}
        message="Anda yakin ingin menerima pendaftar ini?"
        title="Terima Pendaftar"
      />
      <ModalConfirm
        isOpen={modalOpenReject}
        loading={loading}
        handleClose={handleCancelReject}
        handleConfirm={() => handleRejectAsdos(formDataReject)}
        message="Anda yakin ingin menolak pendaftar ini?"
        title="Tolak Pendaftar"
      />
    </>
  );
};

export default DetailPendaftarPage;
