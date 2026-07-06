// File: src/components/admin/OprecForm.tsx
"use client";

import { updateOprecDetails } from "@/actions/oprec-control";
import { 
  CheckCircle, 
  X, 
  Calendar, 
  Users, 
  FileText, 
  Flag, 
  Clock, 
  AlertCircle,
  Settings,
  Save,
  Power,
  School,
  Hash 
} from "lucide-react";
import { useState, useRef } from "react";
import { theme } from "@/lib/theme";

/* =========================
   Stats Card Component
========================= */
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  subtitle?: string;
}

const StatsCard = ({ title, value, icon, gradient, subtitle }: StatsCardProps) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-xl`}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white blur-2xl transition-all duration-700 group-hover:scale-150" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white blur-xl transition-all duration-700 group-hover:scale-125" />
    </div>

    <div className="relative">
      <div className="mb-4">
        <div className="inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 border border-white/30">
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">{title}</p>
        <p className="text-4xl font-black text-white tracking-tight">{value}</p>
        {subtitle && <p className="text-xs text-white/70 font-medium mt-1">{subtitle}</p>}
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  </div>
);

/* =========================
   Main Form Component
========================= */
interface OprecFormProps {
  initialData: any; 
}

export const OprecForm = ({ initialData }: OprecFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Helper konversi tanggal ke string YYYY-MM-DD agar pas dengan input HTML5
  const toInputDate = (date: Date | null | undefined | string) => {
    if (!date) return "";
    return new Date(date).toISOString().split('T')[0];
  };

  // State tunggal teratur untuk semua field form
  const [formData, setFormData] = useState({
    status: initialData?.status || false,
    tahunAjaran: initialData?.tahunAjaran || "",
    angkatanOnline: initialData?.angkatanOnline || "22",
    recStart: toInputDate(initialData?.recStart),
    recEnd: toInputDate(initialData?.recEnd),
    recExStart: toInputDate(initialData?.recExStart),
    recExEnd: toInputDate(initialData?.recExEnd),
    seleksiAdmin: toInputDate(initialData?.seleksiAdmin),
    wawancaraStart: toInputDate(initialData?.wawancaraStart),
    wawancaraEnd: toInputDate(initialData?.wawancaraEnd),
    pengumuman: toInputDate(initialData?.pengumuman),
    orientasiStart: toInputDate(initialData?.orientasiStart),
    orientasiEnd: toInputDate(initialData?.orientasiEnd),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Fungsi pengiriman data inti ke Server Action
  const processSubmit = async (payload: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await updateOprecDetails(payload);
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
      } else {
        alert(result.error || "Gagal menyimpan perubahan");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit manual lewat tombol simpan di bagian footer
  const handleManualSubmit = async (payload: FormData) => {
    if (formData.status) {
      payload.set("status", "on");
    } else {
      payload.delete("status");
    }
    await processSubmit(payload);
  };

  // Auto-submit instan ketika sakelar toggle status diklik
  const handleToggleChange = async (checked: boolean) => {
    setFormData(prev => ({ ...prev, status: checked }));

    if (formRef.current) {
      const payload = new FormData(formRef.current);
      if (checked) {
        payload.set("status", "on");
      } else {
        payload.delete("status");
      }
      await processSubmit(payload);
    }
  };

  const DateInputGroup = ({ label, name, required = false }: { label: string, name: keyof typeof formData, required?: boolean }) => (
    <div className="space-y-2">
      <label className={`text-xs font-bold ${theme.text_default} uppercase tracking-wide`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <input 
          type="date" 
          name={name} 
          value={formData[name] as string} 
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-300 font-medium hover:border-blue-300 shadow-sm" 
        />
      </div>
    </div>
  );

  const totalSections = 5; 
  const filledSections = [
    formData.recStart && formData.recEnd,
    formData.seleksiAdmin,
    formData.wawancaraStart && formData.wawancaraEnd,
    formData.pengumuman,
    formData.orientasiStart && formData.orientasiEnd
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
      
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 pb-40">
        
        {/* SUCCESS TOAST */}
        {showSuccess && (
          <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white/90 backdrop-blur-xl border-l-4 border-green-500 text-gray-800 px-6 py-4 rounded-r-2xl shadow-2xl flex items-center gap-4 min-w-[340px]">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base">Berhasil Disimpan!</h4>
                <p className="text-sm text-gray-500 mt-0.5">Pengaturan Oprec telah diperbarui.</p>
              </div>
              <button type="button" onClick={() => setShowSuccess(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatsCard
            title="Status Pendaftaran"
            value={formData.status ? "BUKA" : "TUTUP"}
            icon={<Power className="h-6 w-6 text-white" />}
            gradient={formData.status ? "from-emerald-500 to-teal-600" : "from-gray-500 to-slate-600"}
            subtitle={formData.status ? "Pendaftaran sedang aktif" : "Pendaftaran ditutup"}
          />
          <StatsCard
            title="Tahun Ajaran"
            value={formData.tahunAjaran || "-"}
            icon={<School className="h-6 w-6 text-white" />}
            gradient="from-blue-500 to-indigo-600"
            subtitle="Periode aktif"
          />
          <StatsCard
            title="Konfigurasi"
            value={`${filledSections}/${totalSections}`}
            icon={<Settings className="h-6 w-6 text-white" />}
            gradient="from-purple-500 to-violet-600"
            subtitle="Bagian terisi"
          />
          <StatsCard
            title="NPM Online"
            value={formData.angkatanOnline || "22"}
            icon={<Users className="h-6 w-6 text-white" />}
            gradient="from-orange-500 to-red-600"
            subtitle="Prefix untuk wawancara online"
          />
        </div>

        <form ref={formRef} action={handleManualSubmit} className="space-y-6 lg:space-y-8">
          <input type="hidden" name="id" value={initialData?.id || ""} />

          {/* --- STATUS TOGGLE SECTION (AUTO SUBMIT + SWITCH SPINNER) --- */}
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-3xl p-6 lg:p-8 border-2 border-gray-200 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h2 className={`text-2xl font-bold ${theme.text_title} flex items-center gap-2`}>
                    <Power className="h-6 w-6" /> Status Pendaftaran
                  </h2>
                  <p className={`text-sm ${theme.text_default_light} max-w-2xl`}>
                    Pengaturan utama untuk membuka atau menutup akses pendaftaran. 
                    Perubahan status sakelar akan **otomatis tersimpan ke database** secara langsung.
                  </p>
                </div>

                {/* Switch Sakelar */}
                <label className="relative inline-flex items-center cursor-pointer group/toggle">
                  <input 
                    type="checkbox" 
                    name="status" 
                    className="sr-only peer" 
                    checked={formData.status}
                    disabled={isSubmitting}
                    onChange={(e) => handleToggleChange(e.target.checked)}
                  />
                  <div className="w-24 h-12 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-400/30 rounded-full peer peer-checked:bg-emerald-500 transition-all shadow-lg peer-disabled:opacity-50"></div>
                  
                  {/* Lingkaran Sakelar + Deteksi Spinner */}
                  <div className={`absolute left-1 top-1 bg-white w-10 h-10 rounded-full transition-all shadow-xl flex items-center justify-center ${formData.status ? 'translate-x-12' : ''}`}>
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    ) : formData.status ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  
                  <span className={`ml-5 font-black text-2xl min-w-[80px] select-none ${formData.status ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {formData.status ? "BUKA" : "TUTUP"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* --- KONFIGURASI PERIODE --- */}
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-3xl p-6 lg:p-8 border-2 border-gray-200 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-2xl" />

            <div className="relative space-y-6">
              <div>
                <h2 className={`text-xl font-bold ${theme.text_title} flex items-center gap-2 mb-2`}>
                  <Settings className="h-5 w-5" /> Konfigurasi Periode & Kebijakan
                </h2>
                <p className={`text-sm ${theme.text_default_light}`}>Atur tahun ajaran dan persyaratan wawancara online</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-bold ${theme.text_default} uppercase tracking-wide flex items-center gap-2`}>
                    <Hash className="w-4 h-4" /> Periode / Tahun Ajaran <span className="text-red-500">*</span>
                  </label>
                  <p className={`text-xs ${theme.text_default_light} mb-2 font-medium`}>Format: TAHUN [Ganjil/Genap]. Ubah ini saat pergantian semester.</p>
                  <input 
                    type="text" 
                    name="tahunAjaran" 
                    value={formData.tahunAjaran}
                    onChange={handleChange}
                    placeholder="Contoh: 2026/2027 Ganjil"
                    required
                    className="w-full px-4 py-3.5 bg-white border-2 border-indigo-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-400/30 focus:border-indigo-500 transition-all duration-300 font-bold hover:border-indigo-400 shadow-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-xs font-bold ${theme.text_default} uppercase tracking-wide`}>Syarat Wawancara Online (Prefix NPM)</label>
                  <p className={`text-xs ${theme.text_default_light} mb-2 font-medium`}>Hanya mahasiswa dengan awalan NPM ini yang bisa pilih online.</p>
                  <input 
                    type="text" 
                    name="angkatanOnline" 
                    value={formData.angkatanOnline}
                    onChange={handleChange}
                    placeholder="Contoh: 22"
                    className="w-full px-4 py-3.5 bg-white border-2 border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-300 font-semibold hover:border-blue-300 shadow-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- JADWAL SECTION --- */}
          <div className="relative overflow-hidden backdrop-blur-xl bg-white/70 rounded-3xl border-2 border-gray-200 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent" />
            
            <div className="relative p-6 lg:p-8">
              <div className="mb-6">
                <h2 className={`text-xl font-bold ${theme.text_title} flex items-center gap-2 mb-2`}>
                  <Calendar className="h-5 w-5" /> Jadwal & Timeline
                </h2>
                <p className={`text-sm ${theme.text_default_light}`}>Konfigurasi tanggal-tanggal penting dalam proses rekrutmen</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. PENDAFTARAN */}
                <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-100">
                    <div className="p-2 bg-sky-100 rounded-xl"><Calendar className="w-5 h-5 text-sky-600" /></div>
                    <h3 className={`font-bold text-lg ${theme.text_title}`}>Periode Pendaftaran</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DateInputGroup label="Tanggal Buka" name="recStart" required />
                    <DateInputGroup label="Tanggal Tutup" name="recEnd" required />
                  </div>
                </div>

                {/* 2. SELEKSI ADMINISTRASI */}
                <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-100">
                    <div className="p-2 bg-orange-100 rounded-xl"><FileText className="w-5 h-5 text-orange-600" /></div>
                    <h3 className={`font-bold text-lg ${theme.text_title}`}>Seleksi Administrasi</h3>
                  </div>
                  <DateInputGroup label="Tanggal Seleksi" name="seleksiAdmin" required />
                </div>

                {/* 3. WAWANCARA */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-100">
                    <div className="p-2 bg-purple-100 rounded-xl"><Users className="w-5 h-5 text-purple-600" /></div>
                    <h3 className={`font-bold text-lg ${theme.text_title}`}>Jadwal Wawancara</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DateInputGroup label="Mulai" name="wawancaraStart" required />
                    <DateInputGroup label="Selesai" name="wawancaraEnd" required />
                  </div>
                </div>

                {/* 4. EXTEND SECTION */}
                <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="absolute -top-3 left-4 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-300">
                    <span className={`text-xs font-bold ${theme.text_default_light} uppercase tracking-widest`}>Opsional</span>
                  </div>
                  <div className="flex items-center gap-3 mb-5 mt-2">
                    <div className="p-2 bg-gray-200 rounded-xl"><Clock className="w-5 h-5 text-gray-600" /></div>
                    <h3 className={`font-bold text-lg ${theme.text_default}`}>Extend Pendaftaran</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <DateInputGroup label="Mulai Extend" name="recExStart" />
                    <DateInputGroup label="Tutup Extend" name="recExEnd" />
                  </div>
                </div>

                {/* 5. FINALISASI */}
                <div className="lg:col-span-2 bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-gray-100">
                    <div className="p-2 bg-green-100 rounded-xl"><Flag className="w-5 h-5 text-green-600" /></div>
                    <h3 className={`font-bold text-lg ${theme.text_title}`}>Finalisasi (Pengumuman & Orientasi)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DateInputGroup label="Tanggal Pengumuman" name="pengumuman" required />
                    <div className="md:col-span-2 grid grid-cols-2 gap-4 p-5 bg-green-50 rounded-xl border border-green-200">
                      <DateInputGroup label="Mulai Orientasi" name="orientasiStart" required />
                      <DateInputGroup label="Selesai Orientasi" name="orientasiEnd" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="text-center py-6">
          <p className={`text-sm ${theme.text_default_light} font-medium`}>Pengaturan Oprec • Sistem Administrasi Lab</p>
        </div>
      </div>

      {/* --- STICKY FOOTER --- */}
      <div className="fixed bottom-0 left-0 lg:left-64 right-0 z-10 p-4 sm:p-6">
        <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border-2 border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="p-2 bg-blue-100 rounded-lg"><AlertCircle className="w-5 h-5 text-blue-600" /></div>
              <span className="font-semibold hidden md:block">Pastikan Tahun Ajaran dan semua tanggal sudah benar sebelum menyimpan.</span>
              <span className="font-semibold md:hidden">Periksa dan pastikan data sebelum simpan.</span>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => formRef.current?.requestSubmit()}
                  className="w-full group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span className="relative z-10">Simpan Perubahan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};