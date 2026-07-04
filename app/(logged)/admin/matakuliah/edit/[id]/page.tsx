import EditMatkulPage from "@/components/admin/edit-matkul-page";
import { getCourse, getSemestersByProdiId } from "@/data/courses";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const getCourseCached = unstable_cache(
    async (id: string) => getCourse(id),
    [id],
    { tags: ["global-cache", `course-${id}`], revalidate: false }
  );
  const dataCourse = await getCourseCached(id);
  const prodiId = dataCourse?.semester.prodi.id || "";
  const getSemestersByProdiIdCached = unstable_cache(
    async (prodiId: string) => getSemestersByProdiId(prodiId),
    [prodiId],
    {
      tags: ["global-cache", "semester"],
      revalidate: false,
    }
  );
  const dataSemesters = await getSemestersByProdiIdCached(prodiId);
  return (
    <EditMatkulPage dataCourse={dataCourse} dataSemesters={dataSemesters} />
  );
}
