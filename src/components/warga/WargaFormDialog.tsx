import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Warga } from "@/types/warga";
import { useWargaStore } from "@/store/useWargaStore";

// Schema validasi dengan Zod
const formSchema = z.object({
  nik: z.string().length(16, "NIK harus 16 digit"),
  namaLengkap: z.string().min(3, "Nama terlalu pendek"),
  tempatLahir: z.string().min(3, "Tempat lahir wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  jenisKelamin: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  agama: z.string().min(1, "Agama wajib dipilih"),
  statusPerkawinan: z.string().min(1, "Status perkawinan wajib dipilih"),
  alamat: z.string().min(5, "Alamat terlalu pendek"),
  dusun: z.string().min(1, "Dusun wajib diisi"),
  rt: z.string().min(1, "RT wajib diisi"),
  rw: z.string().min(1, "RW wajib diisi"),
});

type FormValues = z.infer<typeof formSchema>;

export function WargaFormDialog({ 
  initialData, 
  trigger,
  open: externalOpen,
  onOpenChange: setExternalOpen
}: { 
  initialData?: Warga; 
  trigger?: React.ReactNode; 
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      nik: initialData.nik,
      namaLengkap: initialData.namaLengkap,
      tempatLahir: initialData.tempatLahir,
      tanggalLahir: initialData.tanggalLahir,
      jenisKelamin: initialData.jenisKelamin,
      agama: initialData.agama,
      statusPerkawinan: initialData.statusPerkawinan,
      alamat: initialData.alamat,
      dusun: initialData.dusun,
      rt: initialData.rt,
      rw: initialData.rw,
    } : undefined,
  });

  useEffect(() => {
    if (initialData && open) {
      reset({
        nik: initialData.nik,
        namaLengkap: initialData.namaLengkap,
        tempatLahir: initialData.tempatLahir,
        tanggalLahir: initialData.tanggalLahir,
        jenisKelamin: initialData.jenisKelamin,
        agama: initialData.agama,
        statusPerkawinan: initialData.statusPerkawinan,
        alamat: initialData.alamat,
        dusun: initialData.dusun,
        rt: initialData.rt,
        rw: initialData.rw,
      });
    }
  }, [initialData, open, reset]);

  const { addWarga, updateWarga } = useWargaStore();

  const onSubmit = (data: FormValues) => {
    if (initialData) {
      updateWarga(initialData.id, data);
      alert("Data berhasil diperbarui!");
    } else {
      addWarga(data);
      alert("Data berhasil ditambahkan!");
    }
    setOpen(false);
    if (!initialData) reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        trigger ? (
          <>{trigger}</>
        ) : (
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm transition-shadow">
            <Plus className="mr-2 h-4 w-4" /> Tambah Data
          </Button>
        )
      } />
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {initialData ? "Edit Data Warga" : "Tambah Data Warga Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          
          {/* Section: Identitas Diri */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              Data Identitas Diri
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NIK */}
              <div className="space-y-2">
                <Label htmlFor="nik">Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span></Label>
                <Input id="nik" placeholder="16 Digit NIK" className="bg-white" {...register("nik")} />
                {errors.nik && <p className="text-red-500 text-xs">{errors.nik.message}</p>}
              </div>

              {/* Nama Lengkap */}
              <div className="space-y-2">
                <Label htmlFor="namaLengkap">Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input id="namaLengkap" placeholder="Sesuai KTP" className="bg-white" {...register("namaLengkap")} />
                {errors.namaLengkap && <p className="text-red-500 text-xs">{errors.namaLengkap.message}</p>}
              </div>

              {/* Tempat & Tanggal Lahir */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="tempatLahir">Tempat Lahir <span className="text-red-500">*</span></Label>
                  <Input id="tempatLahir" placeholder="Kota" className="bg-white" {...register("tempatLahir")} />
                  {errors.tempatLahir && <p className="text-red-500 text-xs">{errors.tempatLahir.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalLahir">Tanggal Lahir <span className="text-red-500">*</span></Label>
                  <Input id="tanggalLahir" type="date" className="bg-white" {...register("tanggalLahir")} />
                  {errors.tanggalLahir && <p className="text-red-500 text-xs">{errors.tanggalLahir.message}</p>}
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="space-y-2">
                <Label>Jenis Kelamin <span className="text-red-500">*</span></Label>
                <Select onValueChange={(val) => setValue("jenisKelamin", val as "L" | "P")} defaultValue={initialData?.jenisKelamin}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-Laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jenisKelamin && <p className="text-red-500 text-xs">{errors.jenisKelamin.message}</p>}
              </div>

              {/* Agama */}
              <div className="space-y-2">
                <Label>Agama <span className="text-red-500">*</span></Label>
                <Select onValueChange={(val) => setValue("agama", val as string)} defaultValue={initialData?.agama ?? undefined}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
                {errors.agama && <p className="text-red-500 text-xs">{errors.agama.message}</p>}
              </div>
              
              {/* Status Perkawinan */}
              <div className="space-y-2">
                <Label>Status Perkawinan <span className="text-red-500">*</span></Label>
                <Select onValueChange={(val) => setValue("statusPerkawinan", val as string)} defaultValue={initialData?.statusPerkawinan ?? undefined}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Belum Kawin">Belum Kawin</SelectItem>
                    <SelectItem value="Kawin">Kawin</SelectItem>
                    <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                    <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                  </SelectContent>
                </Select>
                {errors.statusPerkawinan && <p className="text-red-500 text-xs">{errors.statusPerkawinan.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Alamat Domisili */}
          <div className="bg-blue-50/30 p-6 rounded-xl border border-blue-100/50">
            <h3 className="text-sm font-bold text-blue-700 flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              Alamat Domisili
            </h3>

            <div className="space-y-4">
              {/* Alamat Lengkap */}
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Lengkap / Jalan <span className="text-red-500">*</span></Label>
                <Input id="alamat" placeholder="Jalan / Blok / Patokan" className="bg-white" {...register("alamat")} />
                {errors.alamat && <p className="text-red-500 text-xs">{errors.alamat.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dusun */}
                <div className="space-y-2">
                  <Label htmlFor="dusun">Dusun <span className="text-red-500">*</span></Label>
                  <Input id="dusun" placeholder="Nama Dusun" className="bg-white" {...register("dusun")} />
                  {errors.dusun && <p className="text-red-500 text-xs">{errors.dusun.message}</p>}
                </div>

                {/* RT */}
                <div className="space-y-2">
                  <Label htmlFor="rt">RT <span className="text-red-500">*</span></Label>
                  <Input id="rt" placeholder="001" className="bg-white" {...register("rt")} />
                  {errors.rt && <p className="text-red-500 text-xs">{errors.rt.message}</p>}
                </div>

                {/* RW */}
                <div className="space-y-2">
                  <Label htmlFor="rw">RW <span className="text-red-500">*</span></Label>
                  <Input id="rw" placeholder="002" className="bg-white" {...register("rw")} />
                  {errors.rw && <p className="text-red-500 text-xs">{errors.rw.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              {initialData ? "Simpan Perubahan" : "Simpan Data"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
