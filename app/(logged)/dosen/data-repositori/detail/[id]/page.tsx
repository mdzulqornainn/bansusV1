import DetailDataRepositoriDosenPage from "@/components/dosen/detail-data-repositori";
import { getRepositoriDataById } from "@/data/repositori";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const getCourseCached = unstable_cache(
    async (id: string) => getRepositoriDataById(id),
    [id],
    {
      tags: ["global-cache", `repositori-${id}`, "repositori"],
      revalidate: false,
    }
  );
  const dataRepositori = await getCourseCached(id);
  return <DetailDataRepositoriDosenPage dataRepositori={dataRepositori} />;
}
