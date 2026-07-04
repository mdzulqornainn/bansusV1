"use client";

import { theme } from "@/lib/theme";
import { TGetRepositoriDataById } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DetailDataRepositoriDosenPageProps {
  dataRepositori: TGetRepositoriDataById;
}

const Info = ({
  title,
  value,
  bold = false,
  className = "",
}: {
  title: string;
  value: string;
  bold?: boolean;
  className?: string;
}) => (
  <div className={className}>
    <dt className={`text-sm font-medium ${theme.text_title}`}>{title}</dt>
    <dd
      className={`mt-1 text-sm ${
        bold ? `font-bold ${theme.text_default}` : theme.text_default
      }`}
    >
      {value || "-"}
    </dd>
  </div>
);

const DetailDataRepositoriDosenPage = ({
  dataRepositori,
}: DetailDataRepositoriDosenPageProps) => {
  return (
    <div className="min-h-screen p-6 lg:ml-48">
      {/* Tombol kembali */}
      <Link href="/dosen/data-repositori" className={theme.icon_link}>
        <ArrowLeft className={theme.icon_arrow_left} />
        <span>Kembali ke Daftar Repositori</span>
      </Link>

      <div className={theme.card_max_4}>
        <div className={theme.card_default}>
          {/* Header */}
          <h1 className={`text-3xl font-bold ${theme.text_title}`}>
            Detail Data Repositori
          </h1>
          <p className={`text-sm ${theme.text_default} mt-1`}>
            {dataRepositori?.namaDataset}
          </p>

          <div className="mt-4 mb-2">
            <hr className={`border-t ${theme.border_table_default}`} />
          </div>

          {/* Body */}
          <div className="pt-8">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <Info
                title="ID Repositori"
                value={dataRepositori?.id as string}
              />

              <Info
                title="Nama Dataset"
                value={dataRepositori?.namaDataset as string}
                bold
              />

              <Info
                title="Nama Pemilik"
                value={dataRepositori?.namaPemilik as string}
              />

              <Info
                title="Jenis Dataset"
                value={dataRepositori?.jenisDataset as string}
              />

              <div>
                <dt className={`text-sm font-medium ${theme.text_title}`}>
                  Link Publikasi
                </dt>
                <Link
                  href={dataRepositori?.linkPublikasi as string}
                  className={`mt-1 text-sm ${theme.text_default}`}
                >
                  Klik Disini!
                </Link>
              </div>

              <div>
                <dt className={`text-sm font-medium ${theme.text_title}`}>
                  Link Repositori
                </dt>
                <Link
                  href={dataRepositori?.linkRepositori as string}
                  className={`mt-1 text-sm ${theme.text_default}`}
                >
                  Klik Disini!
                </Link>
              </div>

              <Info
                className="col-span-2 w-full"
                title="Deskripsi Dataset"
                value={dataRepositori?.deskripsiDataset ?? "-"}
              />

              <Info
                title="Dibuat Pada"
                value={new Date(
                  dataRepositori?.createdAt as Date
                ).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />

              <Info
                title="Diperbarui Pada"
                value={new Date(
                  dataRepositori?.updatedAt as Date
                ).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDataRepositoriDosenPage;
