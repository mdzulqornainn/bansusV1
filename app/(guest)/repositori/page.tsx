import RepositoriPage from "@/components/repositori/repositori-page";
import { getRepositoriDatas } from "@/data/repositori";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Repositori",
};

export default async function Page() {
  const getRepositoriDatasCached = unstable_cache(getRepositoriDatas, [], {
    tags: ["global-cache", "repositori"],
  });
  const dataRepositori = await getRepositoriDatasCached();
  return (
    <RepositoriPage
      dataRepositori={
        dataRepositori?.filter((item) => item?.status === "published") || []
      }
    />
  );
}
