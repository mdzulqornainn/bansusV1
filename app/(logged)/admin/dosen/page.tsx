import DosenAdminPage from "@/components/admin/dosen-admin-page";
import { getDosens } from "@/data/dosen";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getDosensCached = unstable_cache(async () => getDosens(), [], {
    tags: ["global-cache", "dosen"],
    revalidate: false,
  });

  const dataDosens = await getDosensCached();
  return <DosenAdminPage dataDosens={dataDosens} />;
}
