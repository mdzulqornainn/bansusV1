import DataRepositoriLaboranPage from "@/components/laboran/data-repositori";
import { getRepositoriDatas } from "@/data/repositori";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getRepositoriDatasCached = unstable_cache(
    async () => getRepositoriDatas(),
    [],
    {
      tags: ["global-cache", "repositori"],
      revalidate: false,
    }
  );
  const dataRepositori = await getRepositoriDatasCached();
  return <DataRepositoriLaboranPage dataRepositori={dataRepositori} />;
}
