"use client";

import { theme } from "@/lib/theme";
import { TGetUserById } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DetailUsersPageProps {
  user: TGetUserById;
}
const Info = ({
  title,
  value,
  bold = false,
}: {
  title: string;
  value: string;
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

const DetailUsersPage = ({ user }: DetailUsersPageProps) => {
  return (
    <div className="min-h-screen p-6 lg:ml-48">
      {/* Tombol kembali */}
      <Link
        href="/admin/users"
        className={`${theme.icon_link}`}
      >
        <ArrowLeft className={`${theme.icon_arrow_left}`} />
        <span>Kembali ke Daftar User</span>
      </Link>

      <div className={`${theme.card_max_4}`}>
        <div className={`${theme.card_default}`}>
          {/* Header */}
          <h1 className={`text-3xl font-bold ${theme.text_title}`}>
            Detail User
          </h1>
          <p className={`text-sm ${theme.text_default} mt-1`}>
            {user?.email}
          </p>

          <div className="mt-4 mb-2">
            <hr className={`border-t ${theme.border_table_default} rounded-full`} />
          </div>

          {/* Body */}
          <div className="pt-8">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              {/* --- Data User --- */}
              <Info title="ID User" value={user?.id || ""} />
              <Info title="Nama" value={user?.name || ""} />
              <Info title="Email" value={user?.email || ""} />
              <Info title="Role" value={user?.role || ""} bold />
              <Info
                title="Dibuat Pada"
                value={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "-"
                }
              />
              <Info
                title="Diperbarui Pada"
                value={
                  user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : "-"
                }
              />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUsersPage;
