"use client";

import { useState } from "react";
import { User, Shield, Building2, Bell, Save, Users, Plus, Edit, Trash, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- DUMMY DATA ---
const dummyUsers = [
  { id: "USR-001", username: "admin_sukamulya", name: "Niamilah Nabil Syahputra", role: "SUPER_ADMIN", status: "AKTIF" },
  { id: "USR-002", username: "staf_pelayanan", name: "Staf Desa", role: "ADMIN", status: "AKTIF" },
];

// --- SCHEMAS ---
const userSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  username: z.string().min(5, "Username minimal 5 karakter"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  role: z.enum(["SUPER_ADMIN", "ADMIN"], { message: "Pilih peran pengguna" })
});

// --- SUB-COMPONENTS ---
function PenggunaTab() {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log("Submit User:", data);
    setIsOpen(false);
    reset();
    alert("Akun pengguna berhasil ditambahkan!");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50/50 border-b pb-6 flex flex-row flex-wrap items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl">Pengguna & Hak Akses</CardTitle>
          <CardDescription className="mt-1">Kelola akun staf yang dapat masuk ke dalam sistem.</CardDescription>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger render={
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Plus className="w-4 h-4" /> Tambah Pengguna
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input placeholder="Contoh: Budi Santoso" {...register("name")} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Username <span className="text-red-500">*</span></Label>
                <Input placeholder="Minimal 5 karakter" {...register("username")} />
                {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Kata Sandi <span className="text-red-500">*</span></Label>
                <Input type="password" placeholder="Minimal 8 karakter" {...register("password")} />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Role (Peran) <span className="text-red-500">*</span></Label>
                <Select onValueChange={(val) => val && setValue("role", val as "SUPER_ADMIN" | "ADMIN")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih hak akses..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Super Admin (Kepala/Sekdes)</SelectItem>
                    <SelectItem value="ADMIN">Admin (Staf Pelayanan)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Batal</Button>
                <Button type="submit">Simpan Akun</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                <th className="px-6 py-4 font-medium">Username</th>
                <th className="px-6 py-4 font-medium">Peran / Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{user.username}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <Activity className="w-3 h-3" /> {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// --- MAIN COMPONENT ---
export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Pengaturan Sistem</h2>
        <p className="text-muted-foreground mt-1">
          Konfigurasi aplikasi dan manajemen profil desa.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button 
            onClick={() => setActiveTab("profil")}
            className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "profil" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200 md:border-none"
            }`}
          >
            <Building2 className="w-4 h-4 md:w-5 md:h-5" />
            Profil Desa
          </button>
          <button 
            onClick={() => setActiveTab("pengguna")}
            className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "pengguna" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200 md:border-none"
            }`}
          >
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            Pengguna & Akses
          </button>
          <button 
            onClick={() => setActiveTab("akun")}
            className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "akun" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200 md:border-none"
            }`}
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
            Akun Saya
          </button>
          <button 
            onClick={() => setActiveTab("keamanan")}
            className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "keamanan" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200 md:border-none"
            }`}
          >
            <Shield className="w-4 h-4 md:w-5 md:h-5" />
            Keamanan
          </button>
          <button 
            onClick={() => setActiveTab("notifikasi")}
            className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "notifikasi" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200 md:border-none"
            }`}
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            Notifikasi
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
          
          {activeTab === "pengguna" && <PenggunaTab />}

          {activeTab === "profil" && (
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b pb-6">
                <CardTitle className="text-xl">Profil Desa Sukamulya</CardTitle>
                <CardDescription>Informasi ini akan muncul pada kop surat dan dokumen resmi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Desa</Label>
                    <Input defaultValue="Desa Sukamulya" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kode Pos</Label>
                    <Input defaultValue="45123" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kecamatan</Label>
                    <Input defaultValue="Kecamatan Langkaplancar" />
                  </div>
                  <div className="space-y-2">
                    <Label>Kabupaten / Kota</Label>
                    <Input defaultValue="Kabupaten Pangandaran" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Alamat Lengkap Kantor Desa</Label>
                    <Input defaultValue="Jl. Raya Sukamulya No. 123, RT 01/RW 02" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Nama Kepala Desa</Label>
                    <Input defaultValue="Bpk. H. Suryana, S.E." />
                  </div>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "akun" && (
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b pb-6">
                <CardTitle className="text-xl">Informasi Akun</CardTitle>
                <CardDescription>Kelola detail informasi pribadi Anda sebagai pengelola sistem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input defaultValue="Admin Desa Sukamulya" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@desa.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Nomor Telepon</Label>
                  <Input defaultValue="081234567890" />
                </div>
                <div className="pt-6 flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Perbarui Profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "keamanan" && (
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b pb-6">
                <CardTitle className="text-xl">Ganti Kata Sandi</CardTitle>
                <CardDescription>Pastikan akun Anda menggunakan kata sandi yang kuat.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>Kata Sandi Saat Ini</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Kata Sandi Baru</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Konfirmasi Kata Sandi Baru</Label>
                  <Input type="password" />
                </div>
                <div className="pt-6 flex justify-end">
                  <Button className="gap-2 bg-slate-800 hover:bg-slate-900">
                    Ganti Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifikasi" && (
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50/50 border-b pb-6">
                <CardTitle className="text-xl">Pengaturan Notifikasi</CardTitle>
                <CardDescription>Pilih notifikasi apa saja yang ingin Anda terima.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                 <p className="text-gray-500">Fitur notifikasi sedang dalam tahap pengembangan (Coming Soon).</p>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
