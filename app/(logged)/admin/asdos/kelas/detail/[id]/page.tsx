import DetailAsdosKelasPage from "@/components/admin/detail-asdos-kelas-page";
import { getClass } from "@/data/class";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const getClassCached = unstable_cache(
    async (id: string) => getClass(id),
    [id],
    {
      tags: ["global-cache", `class-${id}`, "class"],
      revalidate: false,
    }
  );
  const dataClass = await getClassCached(id);
  return <DetailAsdosKelasPage dataClass={dataClass} />;
}
