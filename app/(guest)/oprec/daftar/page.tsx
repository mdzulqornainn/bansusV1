import OprecDaftarAsdosPage from "@/components/oprec/oprec-daftar-asdos-page";
import { getCourses } from "@/data/courses";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const metadata: Metadata = {
  title: "Daftar",
};

export default async function Page() {
  const getCoursesCached = unstable_cache(async () => getCourses(), [], {
    tags: ["global-cache", "course"],
    revalidate: false,
  });
  const dataCoures = await getCoursesCached();

  return <OprecDaftarAsdosPage dataCoures={dataCoures} />;
}
