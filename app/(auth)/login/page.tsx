import LoginPage from "@/components/auth/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return <LoginPage />;
}
