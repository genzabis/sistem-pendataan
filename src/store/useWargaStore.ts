import { create } from 'zustand';
import { Warga } from '@/types/warga';

// Mock Data Awal
const initialWarga: Warga[] = [
  {
    id: "1", nik: "3201010101010001", namaLengkap: "Asep Sunandar", tempatLahir: "Bandung", tanggalLahir: "1980-01-01", jenisKelamin: "L", agama: "Islam", statusPerkawinan: "Kawin", alamat: "Jl. Sukamulya No. 1", dusun: "Cempaka", rt: "01", rw: "02", statusWarga: "AKTIF", sumberData: "BASELINE_DISDUKCAPIL", createdAt: "2026-01-01", updatedAt: "2026-01-01"
  },
  {
    id: "2", nik: "3201010101010002", namaLengkap: "Siti Aminah", tempatLahir: "Sumedang", tanggalLahir: "1985-05-15", jenisKelamin: "P", agama: "Islam", statusPerkawinan: "Kawin", alamat: "Jl. Sukamulya No. 1", dusun: "Cempaka", rt: "01", rw: "02", statusWarga: "AKTIF", sumberData: "BASELINE_DISDUKCAPIL", createdAt: "2026-01-01", updatedAt: "2026-01-01"
  },
  {
    id: "3", nik: "3201010101010003", namaLengkap: "Budi Santoso", tempatLahir: "Jakarta", tanggalLahir: "1992-08-20", jenisKelamin: "L", agama: "Kristen", statusPerkawinan: "Belum Kawin", alamat: "Jl. Pahlawan No. 45", dusun: "Melati", rt: "03", rw: "01", statusWarga: "AKTIF", sumberData: "INPUT_MANUAL", createdAt: "2026-02-10", updatedAt: "2026-02-10"
  },
  {
    id: "4", nik: "3201010101010004", namaLengkap: "Rina Kusuma", tempatLahir: "Bogor", tanggalLahir: "1995-12-10", jenisKelamin: "P", agama: "Katolik", statusPerkawinan: "Belum Kawin", alamat: "Jl. Pahlawan No. 45", dusun: "Melati", rt: "03", rw: "01", statusWarga: "PINDAH_KELUAR", sumberData: "INPUT_MANUAL", createdAt: "2026-03-05", updatedAt: "2026-04-12"
  }
];

interface WargaState {
  warga: Warga[];
  addWarga: (warga: Omit<Warga, 'id' | 'createdAt' | 'updatedAt' | 'statusWarga' | 'sumberData'>) => void;
  updateWarga: (id: string, warga: Partial<Warga>) => void;
  deleteWarga: (id: string) => void;
}

export const useWargaStore = create<WargaState>((set) => ({
  warga: initialWarga,
  
  addWarga: (newWargaData) => set((state) => {
    const newWarga: Warga = {
      ...newWargaData,
      id: Math.random().toString(36).substring(7),
      statusWarga: "AKTIF",
      sumberData: "INPUT_MANUAL",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { warga: [...state.warga, newWarga] };
  }),

  updateWarga: (id, updatedFields) => set((state) => ({
    warga: state.warga.map((w) => 
      w.id === id ? { ...w, ...updatedFields, updatedAt: new Date().toISOString() } : w
    )
  })),

  deleteWarga: (id) => set((state) => ({
    warga: state.warga.filter((w) => w.id !== id)
  })),
}));
