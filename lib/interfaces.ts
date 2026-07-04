export interface FormDataUpdatePendaftar {
  whatsapp: string;
  domisili: string;
  status: string;
  wawancara: string;
  alasanOnline: string;
}

export interface FormDataUpdateMatkul {
  code?: string;
  name?: string;
  semesterNumber?: number;
  status?: string;
  sks?: number;
  kuota?: number;
}

export interface FormDataAddMatkul {
  code: string;
  name: string;
  sks: number;
  semesterId: string;
  kuota: number;
  prodiId: string;
  status: string;
}

export interface FormDataAddAsdos {
  npm: string;
  userId: string;
  fileId: string;
  whatsapp: string;
  domisili: string;
  alasan: string;
}

export interface FormDataAddDosen {
  nip: string;
  userId: string;
  namaDosen?: string;
}

export interface FormDataAddRepositori {
  dosenNip?: String;
  thumbnail?: String;
  namaDataset: String;
  namaPemilik: String;
  jenisDataset: String;
  linkPublikasi: String;
  linkRepositori: String;
  deskripsiDataset?: String;
}

export interface FormDataUpdateRepositori {
  namaDataset: String;
  thumbnail?: String;
  namaPemilik: String;
  jenisDataset: String;
  linkPublikasi: String;
  linkRepositori: String;
  deskripsiDataset?: String;
}

export interface FormDataUpdateRepositoriLaboran {
  namaDataset: String;
  thumbnail?: String;
  namaPemilik: String;
  status: String;
  jenisDataset: String;
  linkPublikasi: String;
  linkRepositori: String;
  deskripsiDataset?: String;
}
