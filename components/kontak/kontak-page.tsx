"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { theme } from "@/lib/theme";

const teamCards = [
    {
        img: "/lekokk.webp",
        nama: "Lekok Indah Lia",
        jabatan: "Sekretaris Badan Khusus",
        telp: "+62 853 8217 5033",
        email: "indahlialekok@gmail.com",
    },
    {
        img: "/Dea.webp",
        nama: "Dea Delvinata Riyan",
        jabatan: "Kepala Badan Khusus",
        telp: "+62 858 9687 1404",
        email: "deadelvina9@gmail.com",
    },
    {
        img: "/mauraa.webp",
        nama: "Maura Hellena",
        jabatan: "Bendahara Badan Khusus",
        telp: "+62 852 6698 5976",
        email: "maurahellena05@gmail.com",
    },
];

const contactPersons = [
    {
        img: "/rizkyyy.webp",
        nama: "Rizky Kurnia Antasari",
        jabatan: "PJ Oprec 2025 | Frontend",
        telp: "+62 857 6810 3057",
        email: "2357051011@students.unila.ac.id",
    },
    {
        img: "/wildann.webp",
        nama: "Wildan Mukmin",
        jabatan: "PJ Oprec 2025 | Backend",
        telp: "+62 895 6400 25480",
        email: "wildan.cooliah@gmail.com",
    },
];

const Card = ({ item }: { item: typeof teamCards[0] }) => (
    //bg-gradient-to-r from-yellow-600/20 to-yellow-600/20 border border-yellow-500/30
    <div className={`${theme.hover_default} border-2 ${theme.border_table_default} rounded-xl p-6 backdrop-blur-3xl transition h-full flex flex-col justify-between w-full max-w-xs`}>
        <div className="flex flex-col items-center text-center mb-4">
            <Image
                src={item.img}
                alt={item.nama}
                width={96}
                height={96}
                className="rounded-full mb-3 object-cover"
            />
            <p className={`font-bold text-lg ${theme.text_default}`}>{item.nama}</p>
            <p className={`text-sm  mb-2 ${theme.text_default_light}`}>{item.jabatan}</p>
        </div>

        <div className={`text-sm ${theme.text_default_light} space-y-2 text-left mt-auto`}>
            {item.telp && (
                <div className="flex items-center gap-2">
                    <Phone 
                        className={`w-4 h-4 ${theme.text_default} `} />
                    <span>{item.telp}</span>
                </div>
            )}
            {item.email && (
                <div className="flex items-center gap-2">
                    <Mail 
                        className={`w-4 h-4 ${theme.text_default} `} />
                    <span>{item.email}</span>
                </div>
            )}
        </div>
    </div>
);

const KontakCardSection = () => {
    return (
        <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-4xl font-bold text-center ${theme.text_title} mb-12`}>
                    Kontak & Tim Kami
                </h2>

                {/* Tim Utama */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 place-items-center">
                    {teamCards.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>

                {/* Kontak Person */}
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-6">
                    {contactPersons.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KontakCardSection;
