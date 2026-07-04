import DetailPendaftarPage from "@/components/admin/detail-pendaftar-page";
import { getAsdosApplication } from "@/data/calon-asdos";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ npm: string }>;
}

export default async function Page({ params }: PageProps) {
  const { npm } = await params;
  const getAsdosApplicationCached = unstable_cache(
    async (npm: string) => getAsdosApplication(npm),
    [npm],
    {
      tags: ["global-cache", `asdos-application-${npm}`],
      revalidate: false,
    }
  );
  const dataAsdosApplication = await getAsdosApplicationCached(npm);
  return <DetailPendaftarPage dataAsdosApplication={dataAsdosApplication} />;
}
