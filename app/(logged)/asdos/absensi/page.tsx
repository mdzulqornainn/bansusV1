import AbsensiAsdosPage from "@/components/asdos/absensi-asdos-page";
import { getActiveAbsensi } from "@/data/absensi";
import { getAsdosByUserId } from "@/data/asdos";
import { currentUserCached } from "@/lib/authenticate";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const user = await currentUserCached();
  const userId = user?.id as string;
  const getAsdosByUserIdCached = unstable_cache(
    async (userId: string) => getAsdosByUserId(userId),
    [userId],
    {
      tags: ["global-cache", `asdos-${userId}`],
      revalidate: false,
    }
  );
  const dataAsdos = await getAsdosByUserIdCached(userId);
  const getActiveAbsensiCached = unstable_cache(
    async () => getActiveAbsensi(),
    [],
    {
      tags: [
        "global-cache",
        `absensi`,
        `active-absensi`,
        `asdos-${dataAsdos?.npm}`,
        `asdos-${userId}`,
      ],
      revalidate: false,
    }
  );
  const dataAbsensi = await getActiveAbsensiCached();
  return <AbsensiAsdosPage dataAsdos={dataAsdos} dataAbsensi={dataAbsensi} />;
}
