import EditAsdosPage from "@/components/admin/edit-asdos-page";
// import { getAsdos } from "@/data/asdos";
// import { unstable_cache } from "next/cache";

// interface PageProps {
//   params: { npm: string };
// }

export default function Page() {
  //   const { npm } = params;

  //   // ✅ Pindahkan cache ke dalam agar bisa pakai nilai `npm`
  //   const getAsdosCached = unstable_cache(
  //     async (npm: string) => getAsdos(npm),
  //     [npm],
  //     {
  //       tags: ["global-cache", `asdos-${npm}`],
  //       revalidate: false,
  //     }
  //   );

  //   const dataAsdos = await getAsdosCached(npm);
  return (
    <EditAsdosPage
    //   dataAsdos={dataAsdos}
    />
  );
}
