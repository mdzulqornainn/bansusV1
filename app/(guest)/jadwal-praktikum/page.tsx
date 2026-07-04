import { Metadata } from "next";
import { getClasses } from "@/data/class";
import { unstable_cache } from "next/cache";
import JadwalPraktikumPage from "@/components/jadwal-praktikum/jadwal-praktikum-page";

export const metadata: Metadata = {
  title: "Jadwal Praktikum",
};

export default async function Page() {
  const getClassesCached = unstable_cache(async () => getClasses(), [], {
    tags: ["global-cache", "class"],
    revalidate: false,
  });
  const dataClasses = await getClassesCached();
  return <JadwalPraktikumPage dataClasses={dataClasses} />;
}
