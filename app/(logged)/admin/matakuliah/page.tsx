import MatkulAdminPage from "@/components/admin/matkul-admin-page";
import { getCourses, getProdis } from "@/data/courses";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi"],
    revalidate: false,
  });
  const getCoursesCached = unstable_cache(async () => getCourses(), [], {
    tags: ["global-cache", "course"],
    revalidate: false,
  });
  const dataProdis = await getProdisCached();
  const dataCourses = await getCoursesCached();
  return <MatkulAdminPage dataCourses={dataCourses} dataProdis={dataProdis} />;
}
