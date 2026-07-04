import AsdosAdminPage from "@/components/admin/asdos-admin-page";
import { getAsdoss } from "@/data/asdos";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getAsdossCached = unstable_cache(async () => getAsdoss(), [], {
    tags: ["global-cache", "asdos"],
    revalidate: false,
  });

  const dataAsdoss = await getAsdossCached();
  return <AsdosAdminPage dataAsdoss={dataAsdoss} />;
}
