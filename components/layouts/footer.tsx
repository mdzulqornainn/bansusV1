import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { theme } from "@/lib/theme";

const Footer = () => {
  return (
    <footer className={`${theme.footer_background} py-11 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* ... kode background circles ... */}
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-16 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div>
                <h3
                  className="bansus-glow text-2xl font-extrabold tracking-wide"
                  data-text="Badan Khusus"
                >
                  {" "}
                  Badan Khusus
                </h3>
              </div>
            </div>
            <p className={`text-white leading-relaxed text-sm max-w-md`}>
              Transformasi digital untuk asistensi yang efisien, aman, dan
              terintegrasi dalam satu platform.
            </p>
            {/* Social Media Links - Menggunakan Font Awesome */}
            <div className="flex space-x-4 mt-4">
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/himakomunila?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition duration-300 shadow-md hover:bg-gradient-to-br hover:from-pink-500 hover:to-yellow-500"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-white" />
              </Link>

              {/* YouTube */}
              <Link
                href="https://youtube.com/@himakommedia?feature=shared"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition duration-300 shadow-md hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 text-white" />
              </Link>

              {/* X (Twitter) */}
              <Link
                href="https://x.com/himakomunila?t=1bG8DiT8s-NXp2TKGOjI_A&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition duration-300 shadow-md hover:bg-black"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5 text-white" />
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@himakomunila?_t=ZS-8wt2Q3AqynQ&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition duration-300 shadow-md hover:bg-[#010101]"
              >
                <FontAwesomeIcon icon={faTiktok} className="w-5 h-5 text-white" />
              </Link>
            </div>

          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="text-white font-bold text-lg pb-2 inline-block">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/oprec"
                  className={`flex items-center ${theme.text_default_light} hover:text-white transition-colors duration-300 group`}
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white transition-transform group-hover:translate-x-1" />
                  Open Recruitment Asdos
                </Link>
              </li>
              <li>
                <Link
                  href="/peer"
                  className={`flex items-center ${theme.text_default_light} hover:text-white transition-colors duration-300 group`}
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white transition-transform group-hover:translate-x-1" />
                  Peer Group
                </Link>
              </li>
              <li>
                <Link
                  href="/fosi"
                  className={`flex items-center ${theme.text_default_light} hover:text-white transition-colors duration-300 group`}
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white transition-transform group-hover:translate-x-1" />
                  Forum Silaturahmi
                </Link>
              </li>
              <li>
                <Link
                  href="/pad"
                  className={`flex items-center ${theme.text_default_light} hover:text-white transition-colors duration-300 group`}
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white transition-transform group-hover:translate-x-1" />
                  Pelatihan Asdos
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className={`flex items-center ${theme.text_default_light} hover:text-white transition-colors duration-300 group`}
                >
                  <ChevronRight className="w-4 h-4 mr-2 text-white transition-transform group-hover:translate-x-1" />
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div className={`text-white}`}>
            <h4 className={`text-white font-bold text-lg pb-2 inline-block`}>
              Hubungi Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start text-white">
                <MapPin className={`w-4 h-4 mr-2 text-white flex-shrink-0 mt-1`} />
                Gedung MIPA Terpadu, Lantai 3, Universitas Lampung
              </li>
              <li className="flex items-center text-base text-white">
                <Mail className={`w-4 h-4 mr-2 text-white flex-shrink-0`} />
                <Link
                  href="mailto:badankhusus2025@gmail.com"
                  className="hover:text-slate-400 text-white transition-colors duration-300"
                >
                  badankhusus2026@gmail.com
                </Link>
              </li>
              <li className="flex items-center text-base text-white">
                <Phone className={`w-4 h-4 mr-2 text-white flex-shrink-0`} />
                <Link
                  href="tel:+6282181100679"
                  className="hover:text-slate-400 text-white transition-colors duration-300"
                >
                  +62 821 8110 0679 (Raris Anggustianto)
                </Link>
              </li>

              <li className="flex items-center text-base text-white">
                <Phone className={`w-4 h-4 mr-2 text-white flex-shrink-0`} />
                <Link
                  href="tel:+6285783392040"
                  className="hover:text-slate-400 text-white transition-colors duration-300"
                >
                  +62 857 8339 2040 (Zahra Ayu Azizah)
                </Link>
              </li>

              <li className="flex items-center text-base text-white">
                <Phone className={`w-4 h-4 mr-2 text-white flex-shrink-0`} />
                <Link
                  href="tel:+6282180402931"
                  className="hover:text-slate-400 text-white transition-colors duration-300"
                >
                  +62 821 8040 2931 (Achira Desya Lucy)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-100/80 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className={`text-white mb-4 md:mb-0`}>
              © {new Date().getFullYear()} Sistem Management Badan Khusus. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link
                href="#privacy"
                className={`${theme.text_default_light} hover:text-white text-sm transition-colors duration-300`}
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className={`${theme.text_default_light} hover:text-white text-sm transition-colors duration-300`}
              >
                Terms of Service
              </Link>
              <Link
                href="#cookies"
                className={`${theme.text_default_light} hover:text-white text-sm transition-colors duration-300`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
