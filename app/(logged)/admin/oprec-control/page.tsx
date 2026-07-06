import { OprecForm } from "@/components/admin/oprecForm";
import { getOprecDetailsAction } from "@/actions/oprec-control";

// Memastikan Next.js selalu mengambil data terbaru dari database (Dynamic Rendering)
export const dynamic = "force-dynamic";

export default async function OprecControllerPage() {
  // 1. Ambil data konfigrasi oprec aktif langsung dari database saat di server
  const initialData = await getOprecDetailsAction();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 2. Kirim data tersebut sebagai props ke Client Component */}
      <OprecForm initialData={initialData} />
    </div>
  );
}