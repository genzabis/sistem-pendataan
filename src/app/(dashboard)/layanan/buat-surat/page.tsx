"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Printer, CheckCircle2, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

// Dynamic fields depending on letter type
export default function BuatSuratPage() {
  const [jenisSurat, setJenisSurat] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [wargaData, setWargaData] = useState<any>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const { register, handleSubmit, formState: { isSubmitting }, reset, getValues } = useForm();

  const onSubmit = async (data: any) => {
    if (!jenisSurat) {
      alert("Silakan pilih jenis surat terlebih dahulu!");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Data ${jenisSurat} Submitted:`, data);
    setSubmittedData({ ...data, namaLengkap: wargaData?.namaLengkap });
    setIsSuccess(true);
  };

  const handleSearchNIK = async () => {
    setIsSearching(true);
    setTimeout(() => {
      setWargaData({
        namaLengkap: "Dadan Ramadhan",
        tempatTanggalLahir: "Tasikmalaya, 15-02-1988",
        alamat: "Dusun Sukamulya RT 01 RW 01",
        pekerjaan: "Wiraswasta"
      });
      setIsSearching(false);
    }, 600);
  };

  const resetForm = () => {
    setIsSuccess(false);
    reset();
    setJenisSurat("");
    setWargaData(null);
    setSubmittedData(null);
  };

  if (isSuccess) {
    // Generate print URL with query params
    const printUrl = `/layanan/cetak?jenis=${encodeURIComponent(jenisSurat)}&nama=${encodeURIComponent(submittedData?.namaLengkap || "")}&nik=${encodeURIComponent(submittedData?.nik || "")}&keperluan=${encodeURIComponent(submittedData?.tujuan || submittedData?.keperluan || submittedData?.ketPerbedaan || "-")}`;

    return (
      <div className="flex-1 p-4 md:p-8 pt-6">
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardContent className="flex flex-col items-center">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembuatan Surat Berhasil!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              <b>{jenisSurat}</b> atas nama <b>{wargaData?.namaLengkap || "Warga"}</b> telah berhasil dibuat dan disimpan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={resetForm} variant="outline">
                Buat Surat Lainnya
              </Button>
              <Link href={printUrl} target="_blank">
                <Button className="gap-2">
                  <Printer className="w-4 h-4" /> Cetak PDF Surat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/layanan">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Buat Surat Keterangan</h2>
          <p className="text-muted-foreground mt-1">
            Formulir pintar untuk membuat berbagai jenis surat pengantar dan keterangan desa.
          </p>
        </div>
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Step 1: Pilih Jenis Surat */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">1</span>
                <h3 className="font-medium text-lg">Pilih Jenis Surat</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jenisSurat">Jenis Layanan Surat</Label>
                <Select onValueChange={(v: string | null) => v && setJenisSurat(v)} value={jenisSurat}>
                  <SelectTrigger className="w-full text-base h-12">
                    <SelectValue placeholder="-- Klik untuk memilih jenis surat yang akan dibuat --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</SelectItem>
                    <SelectItem value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</SelectItem>
                    <SelectItem value="Surat Keterangan Domisili">Surat Keterangan Domisili</SelectItem>
                    <SelectItem value="Surat Pengantar SKCK">Surat Pengantar SKCK</SelectItem>
                    <SelectItem value="Surat Keterangan Belum Menikah">Surat Keterangan Belum Menikah</SelectItem>
                    <SelectItem value="Surat Keterangan Janda / Duda">Surat Keterangan Janda / Duda</SelectItem>
                    <SelectItem value="Surat Keterangan Beda Identitas">Surat Keterangan Beda Identitas</SelectItem>
                    <SelectItem value="Surat Keterangan Penghasilan">Surat Keterangan Penghasilan</SelectItem>
                    <SelectItem value="Surat Keterangan Bepergian">Surat Keterangan Bepergian</SelectItem>
                    <SelectItem value="Surat Keterangan Kehilangan">Surat Pengantar Kehilangan (Kepolisian)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Step 2: Identitas Pemohon (Hanya muncul jika surat sudah dipilih) */}
            {jenisSurat && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 border-b pb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">2</span>
                  <h3 className="font-medium text-lg">Identitas Pemohon</h3>
                </div>
                
                <div className="flex gap-3 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="nik">NIK KTP Pemohon</Label>
                    <Input id="nik" placeholder="Masukkan 16 digit NIK..." {...register("nik", { required: true })} />
                  </div>
                  <Button type="button" variant="secondary" onClick={handleSearchNIK} disabled={isSearching} className="w-[120px]">
                    {isSearching ? "Mencari..." : <><Search className="w-4 h-4 mr-2" /> Cari NIK</>}
                  </Button>
                </div>

                {wargaData && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 mb-1">Nama Lengkap</p>
                      <p className="font-semibold">{wargaData.namaLengkap}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">TTL</p>
                      <p className="font-semibold">{wargaData.tempatTanggalLahir}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Pekerjaan</p>
                      <p className="font-semibold">{wargaData.pekerjaan}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Alamat Asal KTP</p>
                      <p className="font-semibold">{wargaData.alamat}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Informasi Dinamis (Hanya muncul jika NIK sudah dicari/diisi) */}
            {jenisSurat && wargaData && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 border-b pb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">3</span>
                  <h3 className="font-medium text-lg">Detail {jenisSurat.split('(')[0]}</h3>
                </div>

                {/* --- Kondisi: Surat Keterangan Usaha --- */}
                {jenisSurat.includes("Usaha") && (
                  <>
                    <div className="space-y-2">
                      <Label>Nama Usaha / Toko</Label>
                      <Input placeholder="Contoh: Toko Berkah Jaya" {...register("namaUsaha")} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Jenis Usaha / Bidang</Label>
                      <Input placeholder="Contoh: Perdagangan Sembako" {...register("jenisUsaha")} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Alamat Tempat Usaha</Label>
                      <Textarea placeholder="Tuliskan alamat lengkap tempat usaha beroperasi..." rows={3} {...register("alamatUsaha")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Keterangan Tidak Mampu --- */}
                {jenisSurat.includes("Tidak Mampu") && (
                  <>
                    <div className="space-y-2">
                      <Label>Keperluan SKTM</Label>
                      <Input placeholder="Contoh: Persyaratan BPJS Kesehatan / Daftar Sekolah" {...register("keperluan")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Keterangan Domisili --- */}
                {jenisSurat.includes("Domisili") && (
                  <>
                    <div className="space-y-2">
                      <Label>Alamat Domisili Saat Ini di Desa</Label>
                      <Textarea placeholder="Contoh: Mengontrak di rumah Bpk. Asep, Dusun Sukamulya..." rows={3} {...register("alamatDomisili")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Pengantar SKCK --- */}
                {jenisSurat.includes("SKCK") && (
                  <>
                    <div className="space-y-2">
                      <Label>Tujuan SKCK</Label>
                      <Input placeholder="Contoh: Melamar pekerjaan di PT Mencari Cinta Sejati" {...register("tujuan")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Keterangan Belum Menikah / Janda --- */}
                {(jenisSurat.includes("Menikah") || jenisSurat.includes("Janda")) && (
                  <>
                    <div className="space-y-2">
                      <Label>Tujuan / Keperluan Surat</Label>
                      <Input placeholder="Contoh: Persyaratan administrasi pernikahan" {...register("tujuan")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Keterangan Beda Identitas --- */}
                {jenisSurat.includes("Identitas") && (
                  <>
                    <div className="space-y-2">
                      <Label>Dokumen yang Berbeda (Ijazah / Sertifikat / KK)</Label>
                      <Input placeholder="Contoh: Ijazah SMA" {...register("dokumenSalah")} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Keterangan Perbedaan</Label>
                      <Input placeholder="Contoh: Pada Ijazah tertulis nama Agoes Supriyadi" {...register("ketPerbedaan")} required />
                    </div>
                  </>
                )}

                {/* --- Kondisi: Surat Keterangan Penghasilan --- */}
                {jenisSurat.includes("Penghasilan") && (
                  <>
                    <div className="space-y-2">
                      <Label>Rata-rata Penghasilan per Bulan (Rp)</Label>
                      <Input placeholder="Contoh: 2.500.000" type="number" {...register("penghasilan")} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Tujuan Penggunaan</Label>
                      <Input placeholder="Contoh: Pengajuan KIP Kuliah anak" {...register("tujuan")} required />
                    </div>
                  </>
                )}

                {/* Default Keterangan (Selalu ada) */}
                <div className="space-y-2 pt-4">
                  <Label>Keterangan Tambahan (Opsional)</Label>
                  <Textarea placeholder="Catatan tambahan untuk dicetak pada surat jika diperlukan..." rows={2} {...register("keteranganTambahan")} />
                </div>

                <div className="pt-6 flex justify-end gap-4 border-t mt-4">
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full md:w-auto font-semibold">
                    {isSubmitting ? "Menyimpan Data..." : "Simpan & Terbitkan Surat"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
