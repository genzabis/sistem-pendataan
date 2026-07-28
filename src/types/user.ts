export interface User {
  id: string;
  nama: string;
  role: "SUPER_ADMIN" | "ADMIN" | "KEPALA_DESA" | "RT_RW";
  wilayahTugas: string | null;
  statusAktif: boolean;
  createdAt?: string;
  updatedAt?: string;
}
