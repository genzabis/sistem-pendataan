export interface PindahMasuk {
  id: string;
  wargaId: string;
  asalDaerah: string;
  tanggalPindah: string;
  dokumenUrl: string | null;
  statusVerifikasi: "PENDING" | "DISETUJUI" | "DITOLAK";
  createdAt?: string;
  updatedAt?: string;
}

export interface PindahKeluar {
  id: string;
  wargaId: string;
  tujuanDaerah: string;
  tanggalPindah: string;
  dokumenUrl: string | null;
  statusVerifikasi: "PENDING" | "DISETUJUI" | "DITOLAK";
  createdAt?: string;
  updatedAt?: string;
}
