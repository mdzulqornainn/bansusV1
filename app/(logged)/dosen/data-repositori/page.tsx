import DataRepositoriDosenPage from "@/components/dosen/data-repositori";
import { getRepositoriDatasByDosenNip } from "@/data/repositori";
import { currentUserCached } from "@/lib/authenticate";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const user = await currentUserCached();
  const nip = user?.dosen?.nip as string;
  const getRepositoriDatasByDosenNipCached = unstable_cache(
    async (nip: string) => getRepositoriDatasByDosenNip(nip),
    [nip],
    {
      tags: ["global-cache", `dosen-${nip}`, "repositori"],
      revalidate: false,
    }
  );
  const dataRepositori = await getRepositoriDatasByDosenNipCached(nip);
  return <DataRepositoriDosenPage dataRepositori={dataRepositori} />;
}
