import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
//import MaintenancePage from "@/components/auth/maintenance";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {" "}
      {/* Header */}
      <Header />
      {children}
      {/* Footer */}
      <Footer />
    </>
    // <MaintenancePage />
  );
}
