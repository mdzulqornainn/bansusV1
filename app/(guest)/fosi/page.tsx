import FosiPage from "@/components/fosi/fosi-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FOSI",
};

export default async function Page() {
  // await new Promise((resolve) => setTimeout(resolve, 50000));
  return <FosiPage />;
}
