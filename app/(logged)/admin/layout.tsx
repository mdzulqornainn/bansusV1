import RoleGate from "@/components/auth/role-gate";
import Sidebar from "@/components/layouts/sidebar";
import { currentUserCached } from "@/lib/authenticate";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUserCached();
  return (
    <RoleGate accessRole="ADMIN">
      <div className="min-h-screen">
        <Sidebar user={user} />
        {children}
      </div>
    </RoleGate>
  );
}
