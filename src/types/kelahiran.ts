export interface Kelahiran {
  id: string;
  wargaId: string; // ID Warga (anak)
  namaIbu: string;
  namaAyah: string;
  tanggalLahir: string;
  tempatLahir: string;
  statusVerifikasi: "PENDING" | "DISETUJUI" | "DITOLAK";
  dicatatOleh: string; // ID User
  createdAt?: string;
  updatedAt?: string;
}
