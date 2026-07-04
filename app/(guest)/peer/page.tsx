import PeerPage from "@/components/peer/peer-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PG",
};

export default function Page() {
  return <PeerPage />;
}
