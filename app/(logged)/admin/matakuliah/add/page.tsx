import AddMatkulPage from "@/components/admin/add-matkul-page";
import { getProdis, getSemesters } from "@/data/courses";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getProdisCached = unstable_cache(async () => getProdis(), [], {
    tags: ["global-cache", "prodi"],
    revalidate: false,
  });
  const getSemestersCached = unstable_cache(async () => getSemesters(), [], {
    tags: ["global-cache", "semester"],
    revalidate: false,
  });
  const dataProdis = await getProdisCached();
  const dataSemesters = await getSemestersCached();
  return (
    <AddMatkulPage dataProdis={dataProdis} dataSemesters={dataSemesters} />
  );
}
