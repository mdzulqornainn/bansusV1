import JadwalAdminPage from "@/components/admin/jadwal-admin-page";
import { getJadwalWawancaras } from "@/data/jadwal-wawancara";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const getJadwalWawancarasCached = unstable_cache(
    async () => getJadwalWawancaras(),
    [],
    {
      tags: ["global-cache", "jadwal-wawancara"],
      revalidate: false,
    }
  );
  const dataJadwalWawancaras = await getJadwalWawancarasCached();
  return <JadwalAdminPage dataJadwalWawancaras={dataJadwalWawancaras} />;
}
