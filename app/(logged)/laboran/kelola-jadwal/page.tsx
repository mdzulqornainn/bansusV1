import KelolaJadwalLaboranPage from "@/components/laboran/kelola-jadwal-laboran-page";
import { getClasses } from "@/data/class";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getClassesCached = unstable_cache(async () => getClasses(), [], {
    tags: ["global-cache", "class"],
    revalidate: false,
  });
  const dataClasses = await getClassesCached();
  return <KelolaJadwalLaboranPage dataClasses={dataClasses} />;
}
