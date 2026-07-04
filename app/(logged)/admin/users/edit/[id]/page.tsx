import EditUsersPage from "@/components/admin/edit-users-page";
import { getUserById } from "@/data/user";
import { unstable_cache } from "next/cache";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const getUserByIdCached = unstable_cache(
    async (id: string) => getUserById(id),
    [id],
    { tags: ["global-cache", `user-${id}`] }
  );
  const user = await getUserByIdCached(id);
  return <EditUsersPage user={user} />;
}
