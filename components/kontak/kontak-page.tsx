"use client";

import { theme } from "@/lib/theme";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import BackgroundEffects from "@/components/ui/BackgroundEffects";

// Tipe data member
interface Member {
  img: string;
  nama: string;
  jabatan: string;
  telp: string;
  email: string;
}

// Komponen Card
const MemberCard = ({ item }: { item: Member }) => (
  <div className={`${theme.card_landing} h-full flex flex-col items-center text-center`}>
    <div className="flex flex-col items-center w-full">
      <Image
        src={item.img}
        alt={item.nama}
        width={96}
        height={96}
        className="rounded-full mb-4 object-cover border-2 border-white shadow-md"
      />
      <p className={`font-bold text-lg text-slate-800 mb-1`}>{item.nama}</p>
      <p className={`text-sm mb-6 ${theme.text_default_light}`}>{item.jabatan}</p>
    </div>

    <div className={`text-sm ${theme.text_default_light} space-y-2 w-full text-left mt-auto border-t border-slate-100 pt-4`}>
      <div className="flex items-center gap-2">
        <Phone className={`w-4 h-4 text-[#0B5EA8]`} />
        <span>{item.telp}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className={`w-4 h-4 text-[#0B5EA8]`} />
        <span className="break-all">{item.email}</span>
      </div>
    </div>
  </div>
);

// MENGGUNAKAN FLEXBOX UNTUK CENTERING
const MemberGroup = ({ title, members }: { title: string; members: Member[] }) => (
  <div className="mb-16">
    <h3 className={`text-2xl font-bold text-center ${theme.text_title} mb-10`}>{title}</h3>

    {/* Menggunakan flex-wrap dan justify-center agar item selalu di tengah */}
    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
      {members.map((member, index) => (
        <div key={index} className="w-full sm:max-w-xs">
          <MemberCard item={member} />
        </div>
      ))}
    </div>
  </div>
);

const KontakCardSection = () => {
  const teamCards = [
    { img: "/lekokk.webp", nama: "Lekok Indah Lia", jabatan: "Sekretaris Badan Khusus", telp: "+62 853 8217 5033", email: "indahlialekok@gmail.com" },
    { img: "/Dea.webp", nama: "Dea Delvinata Riyan", jabatan: "Kepala Badan Khusus", telp: "+62 858 9687 1404", email: "deadelvina9@gmail.com" },
    { img: "/mauraa.webp", nama: "Maura Hellena", jabatan: "Bendahara Badan Khusus", telp: "+62 852 6698 5976", email: "maurahellena05@gmail.com" },
  ];

  const contactPersons = [
    { img: "/rizkyyy.webp", nama: "Rizky Kurnia Antasari", jabatan: "PJ Oprec 2025 | Frontend", telp: "+62 857 6810 3057", email: "2357051011@students.unila.ac.id" },
    { img: "/wildann.webp", nama: "Wildan Mukmin", jabatan: "PJ Oprec 2025 | Backend", telp: "+62 895 6400 25480", email: "wildan.cooliah@gmail.com" },
  ];

  return (
    <section className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative isolate ${theme.root_background}`}>
      <BackgroundEffects />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-5xl font-bold text-center ${theme.text_title} mb-16`}>
          Kontak & Tim Kami
        </h2>

        <MemberGroup title="Tim Utama" members={teamCards} />
        <MemberGroup title="Kontak Person" members={contactPersons} />
      </div>
    </section>
  );
};

export default KontakCardSection;
