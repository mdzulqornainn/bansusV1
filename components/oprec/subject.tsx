"use client";

import { theme } from "@/lib/theme";
import { TGetProdis } from "@/lib/types";
import { BookOpen, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState, useEffect } from "react"; // Import useEffect

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
  itemsPerPage = 6, // Default untuk desktop/tablet
}: MatkulSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicItemsPerPage, setDynamicItemsPerPage] = useState(itemsPerPage); // State baru untuk itemsPerPage dinamis

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
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxMobilePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxMobilePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    }

    // DESKTOP VERSION (biarkan tetap seperti yang kamu punya)
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section id="matkul" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme.text_title} mb-6`}>
            {title.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="">
              {title.split(" ").slice(2).join(" ")}
            </span>
          </h2>
          <p className={`text-xl ${theme.text_default} max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`${theme.icon_search}`} />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah, kode, atau program studi..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`${theme.highlight_search}`}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className={`${theme.text_default}`}>
            Menampilkan {currentCourses.length} dari {filteredCourses.length} mata kuliah
            {searchTerm && (
              <span className={`${theme.text_title} ml-1`}>
                untuk &quot;{searchTerm}&quot;
              </span>
            )}
          </p>
        </div>

        {/* Course Grid */}
        {currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className={`relative ${theme.card_shadow} ${theme.card_elegant} ${theme.hover_default} p-6 transition-all duration-300 `}
              >
                {/* Slot info */}
                <div className={`text-shadow-white absolute -top-2 -right-2 bg-linear-to-r from-emerald-500 via-emerald-600 to-teal-600 text-xs px-3 py-1 rounded-full font-bold shadow-sm`}>
                  {course.kuota} Slot
                </div>

                {/* Course name */}
                <h4 className={`text-lg font-semibold ${theme.text_title} mb-1`}>
                  {course.name}
                </h4>

                {/* Course code */}
                <p className={`text-sm ${theme.text_default} font-mono tracking-wide mb-2`}>
                  {course.code}
                </p>

                {/* Program info */}
                <div className={`mb-3 flex items-center gap-2 ${theme.text_default} text-sm`}>
                  <BookOpen className={`w-4 h-4 ${theme.text_title}`} />`
                  {course.prodiName}
                </div>

                {/* Semester info */}
                <div className={`flex items-center gap-2 ${theme.text_default} text-sm`}>
                  <svg
                    className={`w-4 h-4 ${theme.text_title}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1h10V3a1 1 0 00-1-1H6zM5 6v10a2 2 0 002 2h6a2 2 0 002-2V6H5z" />
                  </svg>
                  Semester {course.semesterNumber}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 rounded-full mb-4">
              <Search className={`w-8 h-8 ${theme.text_default}`} />
            </div>
            <h3 className={`text-xl font-semibold ${theme.text_default} mb-2`}>
              Tidak ada mata kuliah ditemukan
            </h3>
            <p className={`${theme.text_default}`}>Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${theme.text_default} ${theme.card_elegant} ${theme.button_previous}`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`cursor-pointer px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${page === currentPage
                    ? `${theme.button_default_small}`
                    : page === "..."
                      ? `${theme.text_default} cursor-default`
                      : `${theme.button_default_small_reversed}`
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
              className={`${theme.text_default} ${theme.card_elegant} ${theme.button_next}`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );

};
