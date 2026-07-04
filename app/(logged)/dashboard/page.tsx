import DashboardAdminPage from "@/components/admin/dashboard-admin-page";
import DashboardAsdosPage from "@/components/asdos/dashboard-asdos-page";
import DashboardCalonAsdosPage from "@/components/calon-asdos/dashboard-calon-asdos-page";
import DashboardLaboranPage from "@/components/laboran/dashboard-laboran-page";
import Sidebar from "@/components/layouts/sidebar";
import { getAsdosByUserId, getAsdoss } from "@/data/asdos";
import { getCourses } from "@/data/courses";
import { getDosens } from "@/data/dosen";
import { getUsers } from "@/data/user";
import { currentUserCached } from "@/lib/authenticate";
import { unstable_cache } from "next/cache";

export default async function Page() {
  const user = await currentUserCached();
  if (user?.role === "ASDOS") {
    const userId = user?.id as string;
    const getAsdosByUserIdCached = unstable_cache(
      async (userId: string) => getAsdosByUserId(userId),
      [userId],
      {
        tags: [
          "global-cache",
          `asdos-${userId}`,
          `asdos-${user?.asdos?.npm}`,
          "asdos",
        ],
        revalidate: false,
      }
    );
    const dataAsdos = await getAsdosByUserIdCached(userId);
    return (
      <div className="min-h-screen">
        <Sidebar user={user} />
        <DashboardAsdosPage user={user} dataAsdos={dataAsdos} />;
      </div>
    );
  } else if (user?.role === "CALON_ASDOS")
    return (
      <div className="min-h-screen">
        <Sidebar user={user} />
        <DashboardCalonAsdosPage user={user} />
      </div>
    );
  else if (user?.role === "ADMIN") {
    const getCoursesCached = unstable_cache(async () => getCourses(), [], {
      tags: ["global-cache", "courses"],
      revalidate: false,
    });
    const dataCourses = await getCoursesCached();

    const getAsdossCached = unstable_cache(async () => getAsdoss(), [], {
      tags: ["global-cache", "asdos"],
      revalidate: false,
    });
    const dataAsdoss = await getAsdossCached();

    const getUsersCached = unstable_cache(async () => getUsers(), [], {
      tags: ["global-cache", "user"],
      revalidate: false,
    });
    const dataUsers = await getUsersCached();

    const getDosensCached = unstable_cache(async () => getDosens(), [], {
      tags: ["global-cache", "dosen"],
      revalidate: false,
    });
    const dataDosens = await getDosensCached();
    return (
      <div className="min-h-screen">
        <Sidebar user={user} />
        <DashboardAdminPage
          user={user}
          dataCourses={dataCourses}
          dataAsdoss={dataAsdoss}
          dataUsers={dataUsers}
          dataDosens={dataDosens}
        />
      </div>
    );
  } else if (user?.role === "LABORAN")
    return (
      <div className="min-h-screen">
        <Sidebar user={user} />
        <DashboardLaboranPage user={user} />
      </div>
    );
  else if (user?.role === "DOSEN")
    return (
      <div className="min-h-screen">
        <Sidebar user={user} />
        <DashboardLaboranPage user={user} />
      </div>
    );
}
