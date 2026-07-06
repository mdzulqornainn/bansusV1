// File: src/actions/oprec-control.ts
"use server";

import { revalidatePath } from "next/cache";
import { 
  getOprecDetails,
  upsertOprecDetails, 
  deleteOprecDetailsData,
  OprecDetailsPayload 
} from "@/data/oprec";

/**
 * Action Wrapper untuk pembacaan data awal (opsional jika dibutuhkan di client action)
 */
export async function getOprecDetailsAction() {
  return await getOprecDetails();
}

/**
 * Action Form Handler: Menerima input dari panel admin controller
 */
export async function updateOprecDetails(formData: FormData) {
  try {
    const rawId = formData.get("id") as string;
    
    const getDate = (key: string) => {
      const val = formData.get(key);
      return val ? new Date(val as string) : new Date();
    };

    const getNullableDate = (key: string) => {
      const val = formData.get(key);
      return val ? new Date(val as string) : null;
    };

    const angkatanOnline = formData.get("angkatanOnline") as string;
    const tahunAjaran = formData.get("tahunAjaran") as string;
    const statusValue = formData.get("status");
    const status = statusValue === "on" || statusValue === "true";
    
    const payload: OprecDetailsPayload = {
      recStart: getDate("recStart"),
      recEnd: getDate("recEnd"),
      recExStart: getNullableDate("recExStart"),
      recExEnd: getNullableDate("recExEnd"),
      seleksiAdmin: getDate("seleksiAdmin"),
      wawancaraStart: getDate("wawancaraStart"),
      wawancaraEnd: getDate("wawancaraEnd"),
      pengumuman: getDate("pengumuman"),
      orientasiStart: getDate("orientasiStart"),
      orientasiEnd: getDate("orientasiEnd"),
      status: status,
      angkatanOnline: angkatanOnline || "22",
      tahunAjaran: tahunAjaran,
    };

    // Panggil fungsi eksekusi DB dari folder data
    await upsertOprecDetails(rawId, payload);

    // Revalidasi menyeluruh
    revalidatePath("/", "layout"); 
    revalidatePath("/oprec");
    revalidatePath("/oprec/daftar");
    revalidatePath("/admin/oprec-control");
    revalidatePath("/admin/oprec-controller");
    
    return { success: true };
  } catch (error) {
    console.error("Action error [updateOprecDetails]:", error);
    return { success: false, error: "Gagal menyimpan data. Silakan coba lagi." };
  }
}

/**
 * Action Reset Handler: Menghapus jadwal oprec
 */
export async function deleteOprecDetails() {
  try {
    await deleteOprecDetailsData();
    
    revalidatePath("/", "layout");
    revalidatePath("/oprec");
    revalidatePath("/oprec/daftar");
    revalidatePath("/admin/oprec-control");
    revalidatePath("/admin/oprec-controller");
    
    return { success: true };
  } catch (error) {
    console.error("Action error [deleteOprecDetails]:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}