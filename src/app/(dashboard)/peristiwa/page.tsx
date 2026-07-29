"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Baby, Skull, ArrowRightLeft, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type EventType = "KELAHIRAN" | "KEMATIAN" | "PINDAH";

// --- SCHEMAS ---
const kelahiranSchema = z.object({
  namaBayi: z.string().min(3, "Nama bayi minimal 3 karakter"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  nikAyah: z.string().length(16, "NIK Ayah harus 16 digit"),
  nikIbu: z.string().length(16, "NIK Ibu harus 16 digit"),
  tempatDilahirkan: z.string().min(3, "Tempat dilahirkan wajib diisi"),
  jenisKelamin: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
});

const kematianSchema = z.object({
  nikJenazah: z.string().length(16, "NIK Jenazah harus 16 digit"),
  tanggalMeninggal: z.string().min(1, "Tanggal meninggal wajib diisi"),
  penyebabKematian: z.string().min(1, "Penyebab kematian wajib dipilih"),
  tempatMeninggal: z.string().min(1, "Tempat meninggal wajib diisi"),
  namaPelapor: z.string().min(3, "Nama pelapor wajib diisi"),
});

const pindahSchema = z.object({
  jenisPindah: z.enum(["KELUAR", "MASUK"], { message: "Pilih jenis pindah" }),
  nikKk: z.string().length(16, "NIK/No KK harus 16 digit"),
  tanggalPindah: z.string().min(1, "Tanggal pindah wajib diisi"),
  alamatTujuan: z.string().min(5, "Alamat tujuan/asal wajib diisi"),
  alasanPindah: z.string().min(3, "Alasan pindah wajib diisi"),
});

// --- SUB-COMPONENTS ---
function FormKelahiran({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof kelahiranSchema>>({
    resolver: zodResolver(kelahiranSchema),
  });

  const onSubmit = (data: z.infer<typeof kelahiranSchema>) => {
    console.log("Submit Kelahiran:", data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Nama Bayi <span className="text-red-500">*</span></Label>
          <Input placeholder="Nama Lengkap Anak" className="bg-white" {...register("namaBayi")} />
          {errors.namaBayi && <p className="text-red-500 text-xs">{errors.namaBayi.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tanggal Lahir <span className="text-red-500">*</span></Label>
          <Input type="date" className="bg-white" {...register("tanggalLahir")} />
          {errors.tanggalLahir && <p className="text-red-500 text-xs">{errors.tanggalLahir.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>NIK Ayah <span className="text-red-500">*</span></Label>
          <Input placeholder="16 Digit NIK Ayah" className="bg-white" {...register("nikAyah")} />
          {errors.nikAyah && <p className="text-red-500 text-xs">{errors.nikAyah.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>NIK Ibu <span className="text-red-500">*</span></Label>
          <Input placeholder="16 Digit NIK Ibu" className="bg-white" {...register("nikIbu")} />
          {errors.nikIbu && <p className="text-red-500 text-xs">{errors.nikIbu.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tempat Dilahirkan <span className="text-red-500">*</span></Label>
          <Input placeholder="RS / Bidan / Rumah" className="bg-white" {...register("tempatDilahirkan")} />
          {errors.tempatDilahirkan && <p className="text-red-500 text-xs">{errors.tempatDilahirkan.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
          <Select onValueChange={(val: string | null) => val && setValue("jenisKelamin", val as "L" | "P")}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Pilih Jenis Kelamin..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Laki-Laki</SelectItem>
              <SelectItem value="P">Perempuan</SelectItem>
            </SelectContent>
          </Select>
          {errors.jenisKelamin && <p className="text-red-500 text-xs">{errors.jenisKelamin.message}</p>}
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.location.reload()}>Batalkan</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
          <FileText className="w-4 h-4 mr-2" />
          Catat Kelahiran
        </Button>
      </div>
    </form>
  );
}

function FormKematian({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof kematianSchema>>({
    resolver: zodResolver(kematianSchema),
  });

  const onSubmit = (data: z.infer<typeof kematianSchema>) => {
    console.log("Submit Kematian:", data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>NIK Jenazah <span className="text-red-500">*</span></Label>
          <Input placeholder="16 Digit NIK Warga" className="bg-white" {...register("nikJenazah")} />
          {errors.nikJenazah && <p className="text-red-500 text-xs">{errors.nikJenazah.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tanggal Meninggal <span className="text-red-500">*</span></Label>
          <Input type="date" className="bg-white" {...register("tanggalMeninggal")} />
          {errors.tanggalMeninggal && <p className="text-red-500 text-xs">{errors.tanggalMeninggal.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Penyebab Kematian <span className="text-red-500">*</span></Label>
          <Select onValueChange={(val: string | null) => val && setValue("penyebabKematian", val)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Pilih Penyebab..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sakit Biasa">Sakit Biasa / Usia</SelectItem>
              <SelectItem value="Wabah Penyakit">Wabah Penyakit</SelectItem>
              <SelectItem value="Kecelakaan">Kecelakaan</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          {errors.penyebabKematian && <p className="text-red-500 text-xs">{errors.penyebabKematian.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tempat Meninggal <span className="text-red-500">*</span></Label>
          <Input placeholder="Lokasi (RS / Rumah / dll)" className="bg-white" {...register("tempatMeninggal")} />
          {errors.tempatMeninggal && <p className="text-red-500 text-xs">{errors.tempatMeninggal.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Nama Pelapor (Ahli Waris) <span className="text-red-500">*</span></Label>
          <Input placeholder="Nama lengkap pelapor" className="bg-white" {...register("namaPelapor")} />
          {errors.namaPelapor && <p className="text-red-500 text-xs">{errors.namaPelapor.message}</p>}
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.location.reload()}>Batalkan</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
          <FileText className="w-4 h-4 mr-2" />
          Catat Kematian
        </Button>
      </div>
    </form>
  );
}

function FormPindah({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof pindahSchema>>({
    resolver: zodResolver(pindahSchema),
    defaultValues: {
      jenisPindah: "KELUAR"
    }
  });

  const onSubmit = (data: z.infer<typeof pindahSchema>) => {
    console.log("Submit Pindah:", data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 md:col-span-2">
          <Label>Jenis Perpindahan <span className="text-red-500">*</span></Label>
          <RadioGroup defaultValue="KELUAR" onValueChange={(val: string) => setValue("jenisPindah", val as "KELUAR" | "MASUK")} className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2 border p-4 rounded-xl flex-1 hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="KELUAR" id="keluar" className="text-primary border-primary" />
              <Label htmlFor="keluar" className="font-medium cursor-pointer w-full">Pindah Keluar Desa</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-xl flex-1 hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="MASUK" id="masuk" className="text-primary border-primary" />
              <Label htmlFor="masuk" className="font-medium cursor-pointer w-full">Pindah Datang / Masuk</Label>
            </div>
          </RadioGroup>
          {errors.jenisPindah && <p className="text-red-500 text-xs">{errors.jenisPindah.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>NIK / No. KK Kepala Keluarga <span className="text-red-500">*</span></Label>
          <Input placeholder="16 Digit NIK/KK" className="bg-white" {...register("nikKk")} />
          {errors.nikKk && <p className="text-red-500 text-xs">{errors.nikKk.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Tanggal Kepindahan <span className="text-red-500">*</span></Label>
          <Input type="date" className="bg-white" {...register("tanggalPindah")} />
          {errors.tanggalPindah && <p className="text-red-500 text-xs">{errors.tanggalPindah.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Alamat Tujuan / Asal <span className="text-red-500">*</span></Label>
          <Input placeholder="Jalan, RT/RW, Desa, Kecamatan, Kab/Kota" className="bg-white" {...register("alamatTujuan")} />
          {errors.alamatTujuan && <p className="text-red-500 text-xs">{errors.alamatTujuan.message}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Alasan Pindah <span className="text-red-500">*</span></Label>
          <Input placeholder="Contoh: Pekerjaan / Pendidikan / Menikah" className="bg-white" {...register("alasanPindah")} />
          {errors.alasanPindah && <p className="text-red-500 text-xs">{errors.alasanPindah.message}</p>}
        </div>
      </div>
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => window.location.reload()}>Batalkan</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[150px]">
          <FileText className="w-4 h-4 mr-2" />
          Catat Perpindahan
        </Button>
      </div>
    </form>
  );
}

// --- MAIN COMPONENT ---
export default function PeristiwaPage() {
  const [activeTab, setActiveTab] = useState<EventType>("KELAHIRAN");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
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
          onClick={() => { setActiveTab("KELAHIRAN"); setIsSubmitted(false); }}
          className={`flex items-center justify-center whitespace-nowrap shrink-0 gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "KELAHIRAN" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <Baby className="w-4 h-4" />
          Kelahiran
        </button>
        <button
          onClick={() => { setActiveTab("KEMATIAN"); setIsSubmitted(false); }}
          className={`flex items-center justify-center whitespace-nowrap shrink-0 gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "KEMATIAN" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <Skull className="w-4 h-4" />
          Kematian
        </button>
        <button
          onClick={() => { setActiveTab("PINDAH"); setIsSubmitted(false); }}
          className={`flex items-center justify-center whitespace-nowrap shrink-0 gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            activeTab === "PINDAH" ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Pindah Masuk / Keluar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-6 border-b border-gray-50">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
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
          <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-medium text-sm">Data peristiwa berhasil dicatat dan menunggu verifikasi Admin!</p>
          </div>
        )}

        {/* Dynamic Forms */}
        {activeTab === "KELAHIRAN" && <FormKelahiran onSuccess={handleSuccess} />}
        {activeTab === "KEMATIAN" && <FormKematian onSuccess={handleSuccess} />}
        {activeTab === "PINDAH" && <FormPindah onSuccess={handleSuccess} />}

      </div>
    </div>
  );
}
