import DetailDosenPage from "@/components/admin/detail-dosen-page";
import { getProdis } from "@/data/courses";
import { getDosen } from "@/data/dosen";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ nip: string }>;
}

export default async function Page({ params }: PageProps) {
  const { nip } = await params;

  const getDosenCached = unstable_cache(
    async (nip: string) => getDosen(nip),
    [nip],
    {
      tags: ["global-cache", `dosen-${nip}`],
      revalidate: false,
    }
  );
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi"],
    revalidate: false,
  });
  const dataProdis = await getProdisCached();
  const dataDosen = await getDosenCached(nip);
  return <DetailDosenPage dataDosen={dataDosen} dataProdis={dataProdis} />;
}
