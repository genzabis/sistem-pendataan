"use client";

import { useState } from "react";
import { User, Shield, Building2, Bell, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Pengaturan Sistem</h2>
        <p className="text-muted-foreground mt-1">
          Konfigurasi aplikasi dan manajemen profil desa.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab("profil")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "profil" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Building2 className="w-5 h-5" />
            Profil Desa
          </button>
          <button 
            onClick={() => setActiveTab("akun")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "akun" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5" />
            Akun Saya
          </button>
          <button 
            onClick={() => setActiveTab("keamanan")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "keamanan" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Shield className="w-5 h-5" />
            Keamanan
          </button>
          <button 
            onClick={() => setActiveTab("notifikasi")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "notifikasi" ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Bell className="w-5 h-5" />
            Notifikasi
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "profil" && (
            <Card className="border-none shadow-sm">
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
            <Card className="border-none shadow-sm">
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

          {/* Keamanan Tab */}
          {activeTab === "keamanan" && (
            <Card className="border-none shadow-sm">
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
        </div>
      </div>
    </div>
  );
}
