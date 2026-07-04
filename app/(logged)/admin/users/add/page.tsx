import AddUserPage from "@/components/admin/add-user-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah User",
};

export default function Page() {
  return <AddUserPage />;
}
