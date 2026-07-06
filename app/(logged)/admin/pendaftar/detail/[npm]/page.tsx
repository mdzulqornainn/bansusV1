// File: app/(logged)/admin/pendaftar/detail/[npm]/page.tsx
import DetailPendaftarPage from "@/components/admin/detail-pendaftar-page";
import { getAsdosApplication } from "@/data/calon-asdos";
import { TGetAsdosApplication } from "@/lib/types"; // Pastikan diimport untuk type casting
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ npm: string }>;
}

// 🌟 PERBAIKAN 1: Pindahkan unstable_cache ke luar komponen agar cache bekerja dengan benar
const getAsdosApplicationCached = (npm: string) => 
  unstable_cache(
    async (targetNpm: string) => getAsdosApplication(targetNpm),
    [`asdos-app-detail-${npm}`], // Key cache unik berbasis NPM
    {
      tags: ["global-cache", `asdos-application-${npm}`],
      revalidate: false,
    }
  )(npm);

export default async function Page({ params }: PageProps) {
  const { npm } = await params;
  
  // Panggil fungsi cache eksternal
  const dataAsdosApplication = await getAsdosApplicationCached(npm);
  
  // 🌟 PERBAIKAN 2: Gunakan type casting 'as TGetAsdosApplication' agar lolos compile TypeScript
  return (
    <DetailPendaftarPage 
      dataAsdosApplication={dataAsdosApplication as TGetAsdosApplication} 
    />
  );
}