"use client";

import { logout } from "@/actions/logout";
import ModalConfirm from "@/components/ui/modal-confirm";
import { theme } from "@/lib/theme";
import { TCurrentUser } from "@/lib/types";
import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  LogOutIcon,
  Menu,
  User,
  UserCog,
  UserIcon,
  Users,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  user: TCurrentUser;
}
const Sidebar = ({ user }: SidebarProps) => {
  const [modalLogoutOpen, setModalLogoutOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    await signOut({ callbackUrl: "/login" }).finally(() => {
      setIsLoading(false);
    });
  };

  const activePage = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (user?.role === "ASDOS") {
    const menuItems = [
      { icon: Home, label: "Dashboard", link: "/dashboard" },
      { icon: Calendar, label: "Absensi", link: "/asdos/absensi" },
    ];
    return (
      <>
        {modalLogoutOpen && (
          <ModalConfirm
            loading={isLoading}
            isOpen={modalLogoutOpen}
            title="Logout"
            message="Apakah Anda yakin ingin keluar?"
            handleClose={() => setModalLogoutOpen(false)}
            handleConfirm={() => handleLogout()}
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div
            className={`flex flex-col h-full bg-gradient-to-b from-blue-500/10 to-cyan-500/5 backdrop-blur-xl border-r ${theme.border_default} shadow-2xl`}
          >
            {/* Logo Section */}
            <div
              className={`flex items-center justify-between p-6 border-b ${theme.border_default}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${theme.logo_background} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <BookOpen className="w-6 h-6 text-white font-bold" />
                </div>
                <div>
                  <h2
                    className="bansus-glow text-lg font-extrabold tracking-wide"
                    data-text="Badan Khusus"
                  >
                    {" "}
                    Badan Khusus
                  </h2>
                  <p className={`text-xs ${theme.text_title}`}>Asisten Dosen</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden ${theme.text_title} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activePage === item.link
                    ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                    : `${theme.text_default_light} hover:bg-blue-500/10 hover:${theme.text_default_blue} hover:${theme.border_default} border border-transparent`
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-colors ${activePage === item.link
                      ? `${theme.text_title}`
                      : `${theme.text_default} group-hover:${theme.text_default_blue}`
                      }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className={`p-4 border-t ${theme.border_default}`}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border ${theme.border_default}`}
              >
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${theme.text_title}`}
                  >
                    Asisten Dosen
                  </p>
                  <p className={`text-xs ${theme.text_default_light} sm:${theme.text_default}`}>
                    {user.email.length > 26
                      ? user.email.slice(0, 26) + "..."
                      : user.email}
                  </p>
                </div>
                <button
                  onClick={() => setModalLogoutOpen(true)}
                  className={`${theme.text_title} cursor-pointer hover:${theme.text_default_blue} transition-colors`}
                >
                  <LogOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Top Bar */}
        <div
          className={`sticky top-0 z-30 lg:ml-64 ${theme.background_top_bar} backdrop-blur-xl border-b ${theme.border_default}`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden ${theme.text_default} hover:${theme.text_default_blue}transition-colors cursor-pointer`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 ${theme.logo_background} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-sm">
                  <User />
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${theme.text_title}`}
                >
                  {user.name}
                </span>
                <span className={`text-xs ${theme.text_default}`}>
                  {user.role.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (user?.role === "CALON_ASDOS") {
    const menuItems = [
      { icon: Home, label: "Dashboard", link: "/dashboard" },
      { icon: BookOpen, label: "Pengumuman", link: "/calon-asdos/pengumuman" },
    ];
    return (
      <>
        {modalLogoutOpen && (
          <ModalConfirm
            loading={isLoading}
            isOpen={modalLogoutOpen}
            title="Logout"
            message="Apakah Anda yakin ingin keluar?"
            handleClose={() => setModalLogoutOpen(false)}
            handleConfirm={() => handleLogout()}
          />
        )}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <div className={`flex flex-col h-full bg-gradient-to-b from-blue-500/10 to-cyan-500/5 backdrop-blur-xl border-r ${theme.border_default} shadow-2xl`}>

            <div className={`flex items-center justify-between p-6 border-b ${theme.border_default}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${theme.logo_background} rounded-xl flex items-center justify-center shadow-lg`}>
                  <BookOpen className="w-6 h-6 text-white font-bold" />
                </div>
                <div>
                  <h2 className="bansus-glow text-lg font-extrabold tracking-wide" data-text="Badan Khusus">
                    Badan Khusus
                  </h2>
                  <p className={`text-xs ${theme.text_title}`}>
                    Calon Asisten Dosen
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden ${theme.text_title} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activePage === item.link
                    ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                    : `${theme.text_default_light} hover:bg-blue-500/10 hover:${theme.text_default_blue} hover:${theme.border_default} border border-transparent`
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-colors ${activePage === item.link
                      ? `${theme.text_title}`
                      : `${theme.text_default} group-hover:${theme.text_default_blue}`
                      }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className={`p-4 border-t ${theme.border_default}`}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border ${theme.border_default}`}>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${theme.text_title}`}>
                    Calon Asisten Dosen
                  </p>
                  <p className={`text-xs ${theme.text_default_light} sm:${theme.text_default}`}>
                    {user.email.length > 26 ? user.email.slice(0, 26) + "..." : user.email}
                  </p>
                </div>
                <button
                  onClick={() => setModalLogoutOpen(true)}
                  className={`${theme.text_title} cursor-pointer hover:${theme.text_default_blue} transition-colors`}
                >
                  <LogOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {sidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className={`sticky top-0 z-30 lg:ml-64 ${theme.background_top_bar} backdrop-blur-xl border-b ${theme.border_default}`}>
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden ${theme.text_default} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 ${theme.logo_background} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">
                  <User />
                </span>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${theme.text_title}`}>
                  {user.name}
                </span>
                <span className={`text-xs ${theme.text_default}`}>
                  {user.role.toLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (user?.role === "ADMIN") {
    const menuItems = [
      { icon: Home, label: "Dashboard", link: "/dashboard" },
      { icon: BookOpen, label: "Mata Kuliah", link: "/admin/matakuliah" },
      {
        icon: Users,
        label: "Asisten Dosen",
        link: "/admin/asdos",
        subLinks: [
          { label: "Data Asisten", link: "/admin/asdos" },
          { label: "Kelas", link: "/admin/asdos/kelas" },
          { label: "Absensi", link: "/admin/asdos/absensi" },
        ],
      },
      { icon: UserCog, label: "Dosen", link: "/admin/dosen" },
      { icon: UserIcon, label: "Users", link: "/admin/users" },
      { icon: FileText, label: "Pendaftar", link: "/admin/pendaftar" },
    ];
    return (
      <>
        {modalLogoutOpen && (
          <ModalConfirm
            loading={isLoading}
            isOpen={modalLogoutOpen}
            title="Logout"
            message="Apakah Anda yakin ingin keluar?"
            handleClose={() => setModalLogoutOpen(false)}
            handleConfirm={() => handleLogout()}
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div
            className={`flex flex-col h-full bg-gradient-to-b from-blue-500/10 to-cyan-500/5 backdrop-blur-xl border-r ${theme.border_default} shadow-2xl`}
          >
            {/* Logo Section */}
            <div
              className={`flex items-center justify-between p-6 border-b ${theme.border_default}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${theme.logo_background} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <BookOpen className="w-6 h-6 text-white font-bold" />
                </div>
                <div>
                  <h2
                    className="bansus-glow text-lg font-extrabold tracking-wide"
                    data-text="Badan Khusus"
                  >
                    Badan Khusus
                  </h2>
                  <p className={`text-xs ${theme.text_title}`}>Admin</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden ${theme.text_title} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hidden">
              {menuItems.map((item, index) => {
                if (item.label === "Asisten Dosen") {
                  const isActiveSub = activePage.startsWith("/admin/asdos");

                  return (
                    <div key={index} className="group relative">
                      {/* Menu Utama: Tetap Bisa Diklik */}
                      <Link
                        href={item.link}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-2 py-1 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 group cursor-pointer ${isActiveSub
                          ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                          : `${theme.text_default_light} hover:bg-blue-500/10 hover:${theme.text_default_blue} hover:${theme.border_default} border border-transparent`
                          }`}
                      >
                        <item.icon
                          className={`w-5 h-5 mr-3 transition-colors ${isActiveSub
                            ? `${theme.text_title}`
                            : `${theme.text_default} group-hover:${theme.text_default_blue}`
                            }`}
                        />
                        <span className="font-medium">Asisten Dosen</span>
                      </Link>

                      {/* Submenu (di bawah), auto open di mobile, hover di desktop */}
                      <div
                        className={`
                                  ml-6 mt-1 pl-3 space-y-1 border-l ${theme.border_default}
                                  overflow-hidden transition-all duration-300 ease-in-out
                                  lg:max-h-0 lg:opacity-0 group-hover:lg:max-h-screen group-hover:lg:opacity-100
                                  ${sidebarOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
                                `}
                      >
                        <Link
                          href="/admin/asdos"
                          onClick={() => setSidebarOpen(false)}
                          className={`block text-sm px-2 py-1 rounded transition-colors ${activePage === "/admin/asdos"
                            ? `${theme.text_default_blue} font-semibold`
                            : `${theme.text_default_light} hover:${theme.text_default_blue}`
                            }`}
                        >
                          Data Asisten
                        </Link>
                        <Link
                          href="/admin/asdos/kelas"
                          onClick={() => setSidebarOpen(false)}
                          className={`block text-sm px-2 py-1 rounded transition-colors ${activePage === "/admin/asdos/kelas"
                            ? `${theme.text_default_blue} font-semibold`
                            : `${theme.text_default_light} hover:${theme.text_default_blue}`
                            }`}
                        >
                          Kelas
                        </Link>
                        <Link
                          href="/admin/asdos/absensi"
                          onClick={() => setSidebarOpen(false)}
                          className={`block text-sm px-2 py-1 rounded transition-colors ${activePage === "/admin/asdos/absensi"
                            ? `${theme.text_default_blue} font-semibold`
                            : `${theme.text_default_light} hover:${theme.text_default_blue}`
                            }`}
                        >
                          Absensi
                        </Link>
                      </div>
                    </div>
                  );
                }

                // Default items
                return (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-2 py-1 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 group ${activePage === item.link
                      ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                      : `${theme.text_default_light} hover:bg-blue-500/10 hover:${theme.text_default_blue} hover:${theme.border_default} border border-transparent`
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 mr-3 transition-colors ${activePage === item.link
                        ? `${theme.text_title}`
                        : `${theme.text_default} group-hover:${theme.text_default_blue}`
                        }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className={`p-4 border-t ${theme.border_default}`}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border ${theme.border_default}`}
              >
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${theme.text_title}`}
                  >
                    Admin Bansus
                  </p>
                  <p className={`text-xs ${theme.text_default_light} sm:${theme.text_default}`}>
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => setModalLogoutOpen(true)}
                  className={`${theme.text_title} cursor-pointer hover:${theme.text_default_blue} transition-colors`}
                >
                  <LogOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Top Bar */}
        <div
          className={`sticky top-0 z-30 lg:ml-64 ${theme.background_top_bar} backdrop-blur-xl border-b ${theme.border_default}`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden ${theme.text_default} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 ${theme.logo_background} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-sm">
                  <User />
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${theme.text_title}`}
                >
                  {user.name}
                </span>
                <span className={`text-xs ${theme.text_default}`}>
                  {user.role.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (user?.role === "LABORAN") {
    const menuItems = [
      {
        icon: Home,
        label: "Dashboard",
        link: "/dashboard"
      },
      {
        icon: BookOpen,
        label: "Kelola Jadwal",
        link: "/laboran/kelola-jadwal",
      },
      {
        icon: BookOpen,
        label: "Kelola Repositori",
        link: "/laboran/kelola-repositori",
      },
    ];
    return (
      <>
        {modalLogoutOpen && (
          <ModalConfirm
            loading={isLoading}
            isOpen={modalLogoutOpen}
            title="Logout"
            message="Apakah Anda yakin ingin keluar?"
            handleClose={() => setModalLogoutOpen(false)}
            handleConfirm={() => handleLogout()}
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className={`flex flex-col h-full bg-gradient-to-b from-blue-500/10 to-cyan-500/5 backdrop-blur-xl border-r ${theme.border_default} shadow-2xl`}>
            {/* Logo Section */}
            <div className={`flex items-center justify-between p-6 border-b ${theme.border_default}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${theme.logo_background} rounded-xl flex items-center justify-center shadow-lg`}>
                  <BookOpen className="w-6 h-6 text-white font-bold" />
                </div>
                <div>
                  <h2
                    className="bansus-glow text-lg font-extrabold tracking-wide"
                    data-text="Badan Khusus"
                  >
                    {" "}
                    Badan Khusus
                  </h2>
                  <p className={`text-xs ${theme.text_title}`}>Laboran</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden ${theme.text_title} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activePage === item.link
                    ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                    : `${theme.text_default} hover:bg-blue-500/10 hover:${theme.text_title} hover:${theme.border_default} border border-transparent`
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-colors ${activePage === item.link
                      ? `${theme.text_default_blue}`
                      : `${theme.text_default} group-hover:${theme.text_default_blue}`
                      }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className={`p-4 border-t ${theme.border_default}`}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border ${theme.border_default}`}>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${theme.text_default_blue}`}>
                    Laboran
                  </p>
                  <p className={`text-xs ${theme.text_default_light} sm:${theme.text_default}`}>
                    {user.email.length > 26
                      ? user.email.slice(0, 26) + "..."
                      : user.email}
                  </p>
                </div>
                <button
                  onClick={() => setModalLogoutOpen(true)}
                  className={`${theme.text_title} cursor-pointer hover:${theme.text_default_blue} transition-colors`}
                >
                  <LogOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Top Bar */}
        <div
          className={`sticky top-0 z-30 lg:ml-64 ${theme.background_top_bar} backdrop-blur-xl border-b ${theme.border_default}`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden ${theme.text_default} hover:${theme.text_title}transition-colors cursor-pointer`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 ${theme.logo_background} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">
                  <User />
                </span>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${theme.text_title}`}>
                  {user.name}
                </span>
                <span className={`text-xs ${theme.text_default}`}>
                  {user.role.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else if (user?.role === "DOSEN") {
    const menuItems = [
      {
        icon: Home,
        label: "Dashboard",
        link: "/dashboard"
      },
      {
        icon: BookOpen,
        label: "Data Repositori",
        link: "/dosen/data-repositori",
      },
    ];
    return (
      <>
        {modalLogoutOpen && (
          <ModalConfirm
            loading={isLoading}
            isOpen={modalLogoutOpen}
            title="Logout"
            message="Apakah Anda yakin ingin keluar?"
            handleClose={() => setModalLogoutOpen(false)}
            handleConfirm={() => handleLogout()}
          />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className={`flex flex-col h-full bg-gradient-to-b from-blue-500/10 to-cyan-500/5 backdrop-blur-xl border-r ${theme.border_default} shadow-2xl`}>
            {/* Logo Section */}
            <div className={`flex items-center justify-between p-6 border-b ${theme.border_default}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${theme.logo_background} rounded-xl flex items-center justify-center shadow-lg`}>
                  <BookOpen className="w-6 h-6 text-white font-bold" />
                </div>
                <div>
                  <h2
                    className="bansus-glow text-lg font-extrabold tracking-wide"
                    data-text="Badan Khusus"
                  >
                    {" "}
                    Badan Khusus
                  </h2>
                  <p className={`text-xs ${theme.text_title}`}>Laboran</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden ${theme.text_title} hover:${theme.text_default_blue} transition-colors cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${activePage === item.link
                    ? `bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border ${theme.border_default} ${theme.text_title} shadow-lg`
                    : `${theme.text_default} hover:bg-blue-500/10 hover:${theme.text_title} hover:${theme.border_default} border border-transparent`
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 transition-colors ${activePage === item.link
                      ? `${theme.text_default_blue}`
                      : `${theme.text_default} group-hover:${theme.text_default_blue}`
                      }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className={`p-4 border-t ${theme.border_default}`}>
              <div className={`flex items-center space-x-3 p-3 rounded-xl bg-blue-500/5 border ${theme.border_default}`}>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${theme.text_default_blue}`}>
                    Laboran
                  </p>
                  <p className={`text-xs ${theme.text_default_light} sm:${theme.text_default}`}>
                    {user.email.length > 26
                      ? user.email.slice(0, 26) + "..."
                      : user.email}
                  </p>
                </div>
                <button
                  onClick={() => setModalLogoutOpen(true)}
                  className={`${theme.text_title} cursor-pointer hover:${theme.text_default_blue} transition-colors`}
                >
                  <LogOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Top Bar */}
        <div
          className={`sticky top-0 z-30 lg:ml-64 ${theme.background_top_bar} backdrop-blur-xl border-b ${theme.border_default}`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden ${theme.text_default} hover:${theme.text_title}transition-colors cursor-pointer`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 ${theme.logo_background} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">
                  <User />
                </span>
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${theme.text_title}`}>
                  {user.name}
                </span>
                <span className={`text-xs ${theme.text_default}`}>
                  {user.role.toLocaleLowerCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Sidebar;
