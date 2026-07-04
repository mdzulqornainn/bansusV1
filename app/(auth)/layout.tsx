import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
