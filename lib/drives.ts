"use server";

import { google } from "googleapis";
import { Readable } from "stream";
import { prisma } from "@/lib/prisma";

async function getGoogleAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI!,
  );

  const { token } = await prisma.googleRefreshToken.findFirstOrThrow();

  oauth2Client.setCredentials({
    refresh_token: token,
  });

  return oauth2Client;
}

/**
 * Fungsi untuk mendapatkan instance Google Drive
 */
const getDriveService = async () => {
  try {
    const auth = await getGoogleAuth();
    const drive = google.drive({
      version: "v3",
      auth,
    });
    return drive;
  } catch (error) {
    console.error("Gagal mengautentikasi ke Google Drive:", error);
    throw new Error("Gagal mengautentikasi ke Google Drive.");
  }
};

/**
 * Fungsi untuk mengunggah file ke Google Drive dan menyimpan info ke DB
 */
export const uploadFileToDrive = async (
  file: File,
  fileName: string,
  parentsId?: string,
  isPublic?: boolean,
) => {
  if (!file) {
    return { error: "File surat pernyataan tidak ditemukan." };
  }

  try {
    const drive = await getDriveService();

    const fileStream = Readable.from(Buffer.from(await file.arrayBuffer()));

    const fileMetadata = {
      name: fileName,
      parents: parentsId ? [parentsId] : undefined,
      mimeType: file.type,
    };

    const media = {
      mimeType: file.type,
      body: fileStream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, name, webViewLink, webContentLink",
    });

    if (
      !response.data?.id ||
      !response.data?.name ||
      !response.data?.webViewLink ||
      !response.data?.webContentLink
    ) {
      return { error: "Gagal mengunggah file ke Google Drive." };
    }
    if (isPublic) {
      await drive.permissions.create({
        fileId: response.data.id!,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
    }

    await prisma.file.create({
      data: {
        id: response.data.id,
        namaFile: response.data.name,
        linkView: response.data.webViewLink,
        linkDownload: response.data.webContentLink,
      },
    });

    return { data: response.data, success: "Pendaftaran berhasil!" };
  } catch (e) {
    console.error("Error mengunggah file ke Google Drive:", e);
    return {
      error: `Gagal mengunggah file: ${e instanceof Error ? e.message : "Kesalahan tidak diketahui."}`,
    };
  }
};

// fungsi untuk membuat folder baru di Google Drive per nama asdos
export const createFolderForAsdos = async (
  folderName: string,
  parentFolderId?: string,
) => {
  try {
    const drive = await getDriveService();

    // Jika parentFolderId tidak dikirim, gunakan folder utama dari .env
    const targetParentId =
      parentFolderId || process.env.GOOGLE_DRIVE_FOLDER_ABSENSI_ASDOS;

    const fileMetadata = {
      name: `Absensi - ${folderName}`,
      mimeType: "application/vnd.google-apps.folder",
      parents: targetParentId ? [targetParentId] : undefined,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });

    if (!response.data?.id) {
      return { error: "Gagal membuat folder di Google Drive." };
    }

    // Jika ingin folder ini bisa dilihat oleh siapa saja yang memiliki link
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return {
      data: { id: response.data.id },
      success: "Folder berhasil dibuat!",
    };
  } catch (e) {
    console.error("Error membuat folder di Google Drive:", e);
    return {
      error: `Gagal membuat folder: ${e instanceof Error ? e.message : "Kesalahan tidak diketahui."}`,
    };
  }
};
