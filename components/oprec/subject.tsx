"use client";

import { theme } from "@/lib/theme";
import { TGetProdis } from "@/lib/types";
import { BookOpen, ChevronLeft, ChevronRight, Search, GraduationCap } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

interface MatkulSectionProps {
  dataProdis: TGetProdis;
  title?: string;
  subtitle?: string;
  itemsPerPage?: number;
}

export const MatkulSection = ({
  dataProdis,
  title = "Mata Kuliah Tersedia",
  subtitle = "Pilih mata kuliah sesuai dengan keahlian dan minat Anda",
  itemsPerPage = 6,
}: MatkulSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicItemsPerPage, setDynamicItemsPerPage] = useState(itemsPerPage);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setDynamicItemsPerPage(1);
      } else {
        setDynamicItemsPerPage(itemsPerPage);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]);

  // Flatten all courses from all programs and semesters for easier searching
  const allCourses = useMemo(() => {
    const courses: Array<{
      id: string;
      name: string;
      code: string;
      kuota: number;
      semesterNumber: number;
      prodiName: string;
      prodiId: string;
    }> = [];

    dataProdis?.forEach((prodi) => {
      prodi.semester.forEach((semester) => {
        semester.courses.forEach((course) => {
          if (course.status !== "aktif") return;
          courses.push({
            ...course,
            kuota: course.kuota ?? 0,
            semesterNumber: semester.semesterNumber,
            prodiName: prodi.name,
            prodiId: prodi.id,
          });
        });
      });
    });

    return courses;
  }, [dataProdis]);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return allCourses;

    return allCourses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.prodiName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCourses, searchTerm]);

  // Gunakan dynamicItemsPerPage di sini
  const totalPages = Math.ceil(filteredCourses.length / dynamicItemsPerPage);
  const startIndex = (currentPage - 1) * dynamicItemsPerPage;
  const endIndex = startIndex + dynamicItemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // document.getElementById("matkul")?.scrollIntoView({ behavior: "smooth" }); // Opsional: Scroll to top
  };

  const getPageNumbers = () => {
    const pages = [];

    if (isMobile) {
      // Tampilkan maksimal 3 halaman di mobile tanpa "..."
      const maxMobilePages = 3;
      const startPage = Math.max(1, currentPage - Math.floor(maxMobilePages / 2));
      const endPage = Math.min(totalPages, startPage + maxMobilePages - 1);
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      return pages;
    }

    // DESKTOP VERSION (biarkan tetap seperti yang kamu punya)
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section id="matkul" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            {title.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent">
              {title.split(" ").slice(2).join(" ")}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-500 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`w-5 h-5 text-slate-400 group-focus-within:${theme.text_fmipa} transition-colors`} />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah, kode, atau program studi..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0B5EA8]/20 focus:border-[#0B5EA8] transition-all font-medium text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center bg-slate-100/80 border border-slate-200/40 rounded-full px-4 py-1 text-xs font-bold text-slate-600 shadow-2xs">
            Menampilkan {currentCourses.length} dari {filteredCourses.length} Mata Kuliah
            {searchTerm && (
              <span className="text-[#0B5EA8] ml-1">
                untuk &quot;{searchTerm}&quot;
              </span>
            )}
          </span>
        </div>

        {/* Course Grid */}
        {currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(11,94,168,0.05)] hover:border-[#0B5EA8]/20 transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Slot info */}
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold shadow-2xs">
                  {course.kuota} Slot Tersedia
                </div>

                <div className="pt-2">
                  <p className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase mb-1">
                    {course.code}
                  </p>
                  <h4 className={`text-lg font-extrabold text-slate-800 mb-4 group-hover:${theme.text_fmipa} transition-colors leading-snug tracking-tight`}>
                    {course.name}
                  </h4>
                </div>

                <div className="border-t border-slate-100/80 pt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-slate-600 text-xs font-semibold">
                    <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{course.prodiName}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-600 text-xs font-semibold">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Semester {course.semesterNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/40 backdrop-blur-md border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 text-slate-400 rounded-xl mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700 mb-1">
              Mata Kuliah Tidak Ditemukan
            </h3>
            <p className="text-xs font-medium text-slate-400">Coba gunakan kata kunci pencarian alternatif.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white rounded-xl transition-all shadow-2xs cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" />
              Kembali
            </button>

            <div className="flex items-center gap-1.5">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && handlePageChange(page)}
                  disabled={page === "..."}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                    page === currentPage
                      ? "bg-[#0B5EA8] text-white shadow-2xs scale-105"
                      : page === "..."
                        ? "text-slate-400 cursor-default"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white rounded-xl transition-all shadow-2xs cursor-pointer disabled:cursor-not-allowed"
            >
              Lanjut
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};