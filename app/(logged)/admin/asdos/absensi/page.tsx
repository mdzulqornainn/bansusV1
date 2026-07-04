import AsdosAbsensiPage from "@/components/admin/asdos-absensi-page";
import { getActiveAbsensi } from "@/data/absensi";
import { getAsdoss } from "@/data/asdos";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getAsdossCached = unstable_cache(async () => getAsdoss(), [], {
    tags: ["global-cache", "asdos", "asdos-absensi"],
    revalidate: false,
  });
  const getActiveAbsensiCached = unstable_cache(
    async () => getActiveAbsensi(),
    [],
    {
      tags: ["global-cache", "active-absensi"],
      revalidate: false,
    }
  );

  const dataAsdoss = await getAsdossCached();
  const dataAbsensiActive = await getActiveAbsensiCached();
  return (
    <AsdosAbsensiPage
      dataAsdoss={dataAsdoss}
      dataAbsensiActive={dataAbsensiActive}
    />
  );
}
