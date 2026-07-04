import PadPage from "@/components/pad/pad-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PAD",
};
export default function Page() {
  return <PadPage />;
}
