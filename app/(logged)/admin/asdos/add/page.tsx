import AddAsdosPage from "@/components/admin/add-asdos-page";
import { getAsdosApplications } from "@/data/calon-asdos";
import { getProdis } from "@/data/courses";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi"],
    revalidate: false,
  });
  const getAsdosApplicationsCached = unstable_cache(
    async () => getAsdosApplications(),
    [],
    {
      tags: ["global-cache", "asdos-application"],
      revalidate: false,
    }
  );
  const dataProdis = await getProdisCached();
  const dataAsdosApplications = await getAsdosApplicationsCached();
  return (
    <AddAsdosPage
      dataProdis={dataProdis}
      dataAsdosApplications={dataAsdosApplications}
    />
  );
}
