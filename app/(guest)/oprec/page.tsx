import OprecPage from "@/components/oprec/oprec-page";
import { getProdis } from "@/data/courses";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "OPREC",
};

export default async function Page() {
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi", "semester", "course", "class"],
    revalidate: false,
  });
  const dataProdis = await getProdisCached();
  return <OprecPage dataProdis={dataProdis} />;
}
