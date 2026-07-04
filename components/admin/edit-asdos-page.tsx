"use client";

import { theme } from "@/lib/theme";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";

type TGetAsdoss = {
  npm: string;
  userId: string;
  fileId: string;
  whatsapp: string;
  domisili: string;
  alasan: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  file: {
    id: string;
    linkView: string;
    namaFile: string;
  };
  classAsdos: {
    id: string;
    class: {
      name: string;
      course: {
        name: string;
        semester: {
          semesterNumber: string;
          prodi: {
            name: string;
          };
        };
      };
    };
  }[];
};

const dummyAsdos: TGetAsdoss = {
  npm: "1217050111",
  userId: "user-001",
  fileId: "file-001",
  whatsapp: "081234567890",
  domisili: "Bandar Lampung",
  alasan:
    "Saya ingin mendapatkan pengalaman mengajar dan memperkuat kemampuan akademik saya.",
  createdAt: new Date("2025-01-01T08:00:00"),
  updatedAt: new Date("2025-07-01T12:00:00"),
  user: {
    id: "user-001",
    name: "DUMMY ACCOUNT",
    email: "dumbass@students.unila.ac.id",
  },
  file: {
    id: "file-001",
    linkView:
      "https://drive.google.com/file/d/1hPlbKEuqJCIeRSrJFbhvuAYnhBESa4zi/view?usp=drive_link",
    namaFile: "1912345678_alice.pdf",
  },
  classAsdos: [],
};

export default function DetailAsdosPage() {
  const asdos = dummyAsdos;

  return (
    <div className="min-h-screen p-6 lg:ml-48">
      <Link
        href="/admin/asdos"
        className={`${theme.icon_link}`}
      >
        <ArrowLeft className={`${theme.icon_arrow_left}`} />
        <span>Kembali ke Daftar</span>
      </Link>

      <div className={`${theme.card_max_4}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Data disimpan:", asdos);
          }}
          className={`${theme.card_default}`}
        >
          <h1 className={`text-3xl font-bold ${theme.text_title}`}>
            Edit Data Asisten Dosen
          </h1>

          <p className={`text-sm  ${theme.text_default} mt-1`}>
            {asdos?.userId}
          </p>

          <div className="mt-4 mb-2">
            <hr className={`border-t ${theme.border_table_default} rounded-full`} />
          </div>

          <div className="pt-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  NPM
                </label>
                <input
                  type="text"
                  defaultValue={asdos.npm}
                  className={`${theme.highlight_filter}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Nama
                </label>
                <input
                  type="text"
                  defaultValue={asdos.user.name}
                  className={`${theme.highlight_filter}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={asdos.user.email}
                  className={`${theme.highlight_filter}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  WhatsApp
                </label>
                <input
                  type="text"
                  defaultValue={asdos.whatsapp}
                  className={`${theme.highlight_filter}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Domisili
                </label>
                <input
                  type="text"
                  defaultValue={asdos.domisili}
                  className={`${theme.highlight_filter}`}
                />
              </div>
              <div className="md:col-span-2">
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Alasan
                </label>
                <textarea
                  defaultValue={asdos.alasan}
                  className={`${theme.highlight_filter} min-h-[80px]`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Tanggal Daftar
                </label>
                <input
                  type="text"
                  disabled
                  value={asdos.createdAt.toLocaleString("id-ID")}
                  className={`${theme.highlight_filter} opacity-60`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Terakhir Update
                </label>
                <input
                  type="text"
                  disabled
                  value={asdos.updatedAt.toLocaleString("id-ID")}
                  className={`${theme.highlight_filter} opacity-60`}
                />
              </div>
              <div className="md:col-span-2">
                <label className={`text-sm font-medium ${theme.text_title}`}>
                  Surat Pernyataan
                </label>
                <Link
                  href={asdos.file.linkView}
                  className={`hover:underline block text-sm mt-1 ${theme.text_default}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {asdos.file.namaFile}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <Link
              href="/admin/asdos"
              className={`${theme.button_cancel}`}
            >
              <X className="h-4 w-4" /> Batal
            </Link>
            <button
              type="submit"
              className={`${theme.button_save}`}
            >
              <Save className="h-4 w-4" /> Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
