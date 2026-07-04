import AddDataRepositoriLaboranPage from "@/components/laboran/add-data-repositori";
import { currentUserCached } from "@/lib/authenticate";

export default async function Page() {
  const user = await currentUserCached();

  return <AddDataRepositoriLaboranPage user={user} />;
}
