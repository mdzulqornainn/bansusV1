import AddDataRepositoriDosenPage from "@/components/dosen/add-data-repositori";
import { currentUserCached } from "@/lib/authenticate";

export default async function Page() {
  const user = await currentUserCached();

  return <AddDataRepositoriDosenPage user={user} />;
}
