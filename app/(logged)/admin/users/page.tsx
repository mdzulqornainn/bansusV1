import UsersAdminPage from "@/components/admin/users-admin-page";
import { getUsers } from "@/data/user";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getUsersCached = unstable_cache(async () => getUsers(), [], {
    tags: ["global-cache", "user"],
    revalidate: false,
  });
  const dataUsers = await getUsersCached();
  return <UsersAdminPage dataUsers={dataUsers} />;
}
