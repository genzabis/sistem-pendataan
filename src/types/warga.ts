export interface Warga {
  id: string;
  nik: string;
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string; // ISO 8601 string
  jenisKelamin: "L" | "P";
  agama: string;
  statusPerkawinan: string;
  alamat: string;
  dusun: string;
  rt: string;
  rw: string;
  statusWarga: "AKTIF" | "PINDAH_KELUAR" | "MENINGGAL";
  sumberData: "BASELINE_DISDUKCAPIL" | "INPUT_MANUAL";
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}
