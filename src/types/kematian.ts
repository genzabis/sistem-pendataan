export interface Kematian {
  id: string;
  wargaId: string;
  tanggalMeninggal: string;
  penyebab: string | null;
  statusVerifikasi: "PENDING" | "DISETUJUI" | "DITOLAK";
  dicatatOleh: string; // ID User
  createdAt?: string;
  updatedAt?: string;
}
