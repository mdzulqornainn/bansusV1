import DetailAsdosAbsensiPage from "@/components/admin/detail-asdos-absensi-page";
import { getAsdos } from "@/data/asdos";
import { unstable_cache } from "next/cache";
interface PageProps {
  params: Promise<{ npm: string }>;
}
export default async function Page({ params }: PageProps) {
  const { npm } = await params;

  const getAsdosCached = unstable_cache(
    async (npm: string) => getAsdos(npm),
    [npm],
    {
      tags: ["global-cache", `asdos-${npm}`],
      revalidate: false,
    }
  );
  const dataAsdos = await getAsdosCached(npm);
  return <DetailAsdosAbsensiPage dataAsdos={dataAsdos} />;
}
