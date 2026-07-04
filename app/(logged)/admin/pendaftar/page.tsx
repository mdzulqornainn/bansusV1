import PendaftarAdminPage from "@/components/admin/pendaftar-admin-page";
import { getAsdosApplications } from "@/data/calon-asdos";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getAsdosApplicationsCached = unstable_cache(
    async () => getAsdosApplications(),
    [],
    {
      tags: ["global-cache", "asdos-application"],
      revalidate: false,
    }
  );
  const dataAsdosApplications = await getAsdosApplicationsCached();
  return <PendaftarAdminPage dataAsdosApplications={dataAsdosApplications} />;
}
