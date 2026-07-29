"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, User, MapPin, FileText, CheckCircle2, 
  Edit, Printer, Trash, Activity, Calendar, Heart, Contact,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Warga } from "@/types/warga";
import { WargaFormDialog } from "@/components/warga/WargaFormDialog";

export default function WargaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [warga, setWarga] = useState<Warga | null>(null);

  useEffect(() => {
    // Mock data fetch based on ID
    // Di aplikasi nyata, lakukan fetch ke API Backend di sini:
    // fetch(`/api/warga/${resolvedParams.id}`)
    
    setTimeout(() => {
      setWarga({
        id: resolvedParams.id,
        nik: "3201010101010001",
        namaLengkap: "Asep Sunandar",
        tempatLahir: "Bandung",
        tanggalLahir: "1980-01-01",
        jenisKelamin: "L",
        agama: "Islam",
        statusPerkawinan: "Kawin",
        alamat: "Jl. Sukamulya No. 1",
        dusun: "Cigintung",
        rt: "01",
        rw: "02",
        statusWarga: "AKTIF",
        sumberData: "BASELINE_DISDUKCAPIL",
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01"
      });
    }, 500);
  }, [resolvedParams.id]);

  if (!warga) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Activity className="w-8 h-8 animate-spin mb-4 text-primary" />
        <p>Memuat profil penduduk...</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    if (status === 'AKTIF') return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {status}</span>;
    if (status === 'PINDAH_KELUAR') return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold uppercase tracking-wider">{status.replace('_', ' ')}</span>;
    return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold uppercase tracking-wider">{status}</span>;
  };

  const handleDelete = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus profil penduduk ${warga.namaLengkap}?`)) {
      // Mock API delete call
      alert("Profil warga berhasil dihapus (Mock).");
      router.push('/warga');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 print:m-0 print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-gray-100 shrink-0">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Detail Profil Penduduk</h1>
            <p className="text-xs sm:text-sm text-gray-500">ID Sistem: {warga.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto pl-14 sm:pl-0">
          <Button variant="outline" onClick={() => window.print()} className="text-gray-700 border-gray-300 hover:bg-gray-50 rounded-xl shadow-sm">
            <Printer className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Cetak</span>
          </Button>
          <WargaFormDialog 
            initialData={warga} 
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm">
                <Edit className="w-4 h-4 mr-2" /> Edit Profil
              </Button>
            } 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Identity */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg relative">
              <User className="w-16 h-16" />
              <div className="absolute -bottom-2">
                {getStatusBadge(warga.statusWarga)}
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-4">{warga.namaLengkap}</h2>
            <p className="text-gray-500 font-mono text-sm mt-1">{warga.nik}</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border shadow-sm p-4 print:hidden">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 px-2">Aksi Cepat</h3>
            <div className="space-y-2">
              <Button variant="ghost" onClick={handleDelete} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash className="w-4 h-4 mr-2" /> Hapus Penduduk
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 flex items-center gap-2 bg-gray-50/50">
              <Contact className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900">Data Diri Utama</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Nomor Induk Kependudukan</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.nik}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.namaLengkap}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.tempatLahir}, {warga.tanggalLahir}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Jenis Kelamin</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 flex items-center gap-2 bg-gray-50/50">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900">Alamat & Wilayah</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Alamat Lengkap</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.alamat}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Dusun</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.dusun}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">RT / RW</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.rt} / {warga.rw}</p>
              </div>
            </div>
          </div>

          {/* Demographic Card */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="border-b px-6 py-4 flex items-center gap-2 bg-gray-50/50">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900">Demografi & Sosial</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Agama</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.agama}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status Perkawinan</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.statusPerkawinan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sumber Data</p>
                <p className="mt-1 font-semibold text-gray-900">{warga.sumberData === 'BASELINE_DISDUKCAPIL' ? 'Sinkronisasi Dukcapil' : 'Input Manual'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
