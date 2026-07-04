import DetailMatkulPage from "@/components/admin/detail-matkul-page";
import { getCourse } from "@/data/courses";
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
  return <DetailMatkulPage dataCourse={dataCourse} id={id} />;
}
