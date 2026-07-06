// File: app/(logged)/admin/pendaftar/edit/[npm]/page.tsx

import EditPendaftarPage from "@/components/admin/edit-pendaftar-page";
import { getAsdosApplication } from "@/data/calon-asdos";
import { TGetAsdosApplication } from "@/lib/types";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ npm: string }>;
}

const getAsdosApplicationCached = (npm: string) => 
  unstable_cache(
    async (targetNpm: string) => getAsdosApplication(targetNpm),
    [`asdos-app-edit-${npm}`], // Key cache unik untuk halaman edit berbasis NPM
    {
      tags: ["global-cache", `asdos-application-${npm}`],
      revalidate: false,
    }
  )(npm);

export default async function Page({ params }: PageProps) {
  const { npm } = await params;
  
  // Panggil fungsi cache eksternal
  const dataAsdosApplication = await getAsdosApplicationCached(npm);
  
  // 🌟 PERBAIKAN 2: Gunakan type casting 'as TGetAsdosApplication' agar lolos dari type truncation TypeScript
  return (
    <EditPendaftarPage 
      dataAsdosApplication={dataAsdosApplication as TGetAsdosApplication} 
    />
  );
}