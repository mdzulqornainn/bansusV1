"use server";

import {
  FormDataAddDosen,
  FormDataAddRepositori,
  FormDataUpdatePendaftar,
  FormDataUpdateRepositori,
  FormDataUpdateRepositoriLaboran,
} from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

// ------------------------ CREATE FUNCTION ------------------------

export const addRepositoriData = async (data: FormDataAddRepositori) => {
  try {
    await prisma.dataRepositori.create({
      data: {
        dosenNip: (data.dosenNip as string) || "",
        namaDataset: (data.namaDataset as string) || "",
        namaPemilik: (data.namaPemilik as string) || "",
        jenisDataset: (data.jenisDataset as string) || "",
        linkPublikasi: (data.linkPublikasi as string) || "",
        linkRepositori: (data.linkRepositori as string) || "",
        deskripsiDataset: (data.deskripsiDataset as string) || "",
      },
    });
    updateTag("repositori");
    return { success: "Data berhasil disimpan" };
  } catch (e) {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" + e };
  }
};

// ------------------------ READ FUNCTION ------------------------

export const getRepositoriDatas = async () => {
  try {
    const repositori = await prisma.dataRepositori.findMany({});
    return repositori;
  } catch (error) {
    console.error("Error fetching repositori:", error);
    return null;
  }
};

export const getRepositoriDatasByDosenNip = async (dosenNip: string) => {
  try {
    const repositori = await prisma.dataRepositori.findMany({
      where: { dosenNip },
      orderBy: { updatedAt: "desc" },
    });
    return repositori;
  } catch {
    return null;
  }
};

export const getRepositoriDataById = async (id: string) => {
  try {
    const repositori = await prisma.dataRepositori.findUnique({
      where: { id },
    });
    return repositori;
  } catch {
    return null;
  }
};

// ------------------------ UPDATE FUNCTION ------------------------

export const updateRepositoriData = async (
  id: string,
  data: FormDataUpdateRepositori
) => {
  try {
    await prisma.dataRepositori.update({
      where: { id },
      data: {
        namaDataset: (data.namaDataset as string) || "",
        namaPemilik: (data.namaPemilik as string) || "",
        jenisDataset: (data.jenisDataset as string) || "",
        linkPublikasi: (data.linkPublikasi as string) || "",
        linkRepositori: (data.linkRepositori as string) || "",
        deskripsiDataset: (data.deskripsiDataset as string) || "",
      },
    });
    updateTag("repositori");
    updateTag(`repositori-${id}`);
    return { success: "Data berhasil disimpan" };
  } catch (e) {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" + e };
  }
};

export const updateRepositoriDataLaboran = async (
  id: string,
  data: FormDataUpdateRepositoriLaboran
) => {
  try {
    await prisma.dataRepositori.update({
      where: { id },
      data: {
        namaDataset: (data.namaDataset as string) || "",
        namaPemilik: (data.namaPemilik as string) || "",
        jenisDataset: (data.jenisDataset as string) || "",
        status: (data.status as string) || "",
        linkPublikasi: (data.linkPublikasi as string) || "",
        linkRepositori: (data.linkRepositori as string) || "",
        deskripsiDataset: (data.deskripsiDataset as string) || "",
      },
    });
    updateTag("repositori");
    updateTag(`repositori-${id}`);
    return { success: "Data berhasil disimpan" };
  } catch (e) {
    return { error: "Data gagal disimpan, coba dengan data yang berbeda" + e };
  }
};

// ------------------------ DELETE FUNCTION ------------------------

export const deleteDosen = async (nip: string) => {
  try {
    await prisma.dosen.delete({ where: { nip } });
    updateTag("dosen");
    updateTag(`dosen-${nip}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};

export const deleteRepositoriData = async (id: string) => {
  try {
    await prisma.dataRepositori.delete({ where: { id } });
    updateTag("repositori");
    updateTag(`repositori-${id}`);
    return { success: "Data berhasil dihapus" };
  } catch {
    return { error: "Data gagal dihapus" };
  }
};
