import EditKelolaJadwalLaboranPage from "@/components/laboran/edit-kelola-jadwal-laboran-page";
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
      tags: ["global-cache", `class-${id}`],
      revalidate: false,
    }
  );
  const dataClass = await getClassCached(id);
  return <EditKelolaJadwalLaboranPage dataClass={dataClass} />;
}
