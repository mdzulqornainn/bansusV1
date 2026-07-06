import PengumumanCalonAsdosPage from "@/components/calon-asdos/pengumuman-calon-asdos-page";
import { getAsdosApplication } from "@/data/calon-asdos";
import { currentUserCached } from "@/lib/authenticate";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const user = await currentUserCached();
  const getAsdosApplicationCached = unstable_cache(
    async (npm: string) => getAsdosApplication(npm),
    [user?.asdosApplicants?.[0].npm ?? ""],
    {
      tags: [
        "global-cache",
        `asdos-application-${user?.asdosApplicants?.[0].npm ?? ""}`,
      ],
      revalidate: false,
    }
  );
  const dataAsdosApplication = await getAsdosApplicationCached(
    user?.asdosApplicants?.[0].npm ?? ""
  );
  return (
    <PengumumanCalonAsdosPage
      status={dataAsdosApplication?.status ?? "processing"}
    />
  );
}
