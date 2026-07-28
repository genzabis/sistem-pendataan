"use client";

import { useState } from "react";
import { Baby, Skull, ArrowRightLeft, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EventType = "KELAHIRAN" | "KEMATIAN" | "PINDAH";

export default function PeristiwaPage() {
  const [activeTab, setActiveTab] = useState<EventType>("KELAHIRAN");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Pencatatan Peristiwa</h2>
        <p className="text-muted-foreground mt-1">
          Layanan pencatatan kelahiran, kematian, dan kepindahan penduduk desa.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-50/50 p-1.5 rounded-xl border border-gray-100 overflow-x-auto">
        <button
          onClick={() => setActiveTab("KELAHIRAN")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "KELAHIRAN" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <Baby className="w-4 h-4" />
          Kelahiran
        </button>
        <button
          onClick={() => setActiveTab("KEMATIAN")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "KEMATIAN" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <Skull className="w-4 h-4" />
          Kematian
        </button>
        <button
          onClick={() => setActiveTab("PINDAH")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "PINDAH" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Pindah Masuk / Keluar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            {activeTab === "KELAHIRAN" && <Baby className="w-6 h-6" />}
            {activeTab === "KEMATIAN" && <Skull className="w-6 h-6" />}
            {activeTab === "PINDAH" && <ArrowRightLeft className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {activeTab === "KELAHIRAN" && "Formulir Surat Keterangan Kelahiran"}
              {activeTab === "KEMATIAN" && "Formulir Surat Keterangan Kematian"}
              {activeTab === "PINDAH" && "Formulir Surat Keterangan Pindah"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Mohon isi data dengan lengkap dan benar sesuai dokumen kependudukan.
            </p>
          </div>
        </div>

        {isSubmitted && (
          <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-medium text-sm">Data peristiwa berhasil dicatat dan menunggu verifikasi Admin!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {activeTab === "KELAHIRAN" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nama Bayi</Label>
                  <Input placeholder="Nama Lengkap Anak" required />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-2">
                  <Label>NIK Ayah</Label>
                  <Input placeholder="16 Digit NIK Ayah" required />
                </div>
                <div className="space-y-2">
                  <Label>NIK Ibu</Label>
                  <Input placeholder="16 Digit NIK Ibu" required />
                </div>
                <div className="space-y-2">
                  <Label>Tempat Dilahirkan</Label>
                  <Input placeholder="RS / Bidan / Rumah" required />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Pilih Jenis Kelamin...</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "KEMATIAN" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>NIK Jenazah</Label>
                  <Input placeholder="16 Digit NIK Warga" required />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Meninggal</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-2">
                  <Label>Penyebab Kematian</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="">Pilih Penyebab...</option>
                    <option value="Sakit Biasa">Sakit Biasa / Usia</option>
                    <option value="Wabah Penyakit">Wabah Penyakit</option>
                    <option value="Kecelakaan">Kecelakaan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Tempat Meninggal</Label>
                  <Input placeholder="Lokasi (RS / Rumah / dll)" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Nama Pelapor (Ahli Waris)</Label>
                  <Input placeholder="Nama lengkap pelapor" required />
                </div>
              </div>
            </div>
          )}

          {activeTab === "PINDAH" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label>Jenis Perpindahan</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 border p-4 rounded-xl flex-1 cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="jenisPindah" className="w-4 h-4 text-primary" defaultChecked />
                      <span className="font-medium">Pindah Keluar Desa</span>
                    </label>
                    <label className="flex items-center gap-2 border p-4 rounded-xl flex-1 cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="jenisPindah" className="w-4 h-4 text-primary" />
                      <span className="font-medium">Pindah Datang / Masuk</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>NIK / No. KK Kepala Keluarga</Label>
                  <Input placeholder="16 Digit NIK/KK" required />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Kepindahan</Label>
                  <Input type="date" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Alamat Tujuan / Asal</Label>
                  <Input placeholder="Jalan, RT/RW, Desa, Kecamatan, Kab/Kota" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Alasan Pindah</Label>
                  <Input placeholder="Contoh: Pekerjaan / Pendidikan / Menikah" required />
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Button variant="outline" type="button">Batalkan</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
              <FileText className="w-4 h-4 mr-2" />
              Catat Peristiwa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
