import DetailAsdosPage from "@/components/admin/detail-asdos-page";
import { getAsdos } from "@/data/asdos";
import { getProdis } from "@/data/courses";
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
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi"],
    revalidate: false,
  });
  const dataProdis = await getProdisCached();
  const dataAsdos = await getAsdosCached(npm);
  return <DetailAsdosPage dataAsdos={dataAsdos} dataProdis={dataProdis} />;
}
