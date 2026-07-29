"use client";

import { FileBadge2, FileSignature, ArrowRight, Layers, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LayananPage() {
  const layananList = [
    {
      title: "Pencatatan Kelahiran",
      desc: "Buat Surat Keterangan Kelahiran untuk anak baru lahir.",
      icon: <FileBadge2 className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      link: "/peristiwa"
    },
    {
      title: "Pencatatan Kematian",
      desc: "Buat Surat Keterangan Kematian warga desa.",
      icon: <FileSignature className="w-8 h-8" />,
      color: "bg-slate-50 text-slate-600",
      link: "/peristiwa"
    },
    {
      title: "Surat Pengantar Pindah",
      desc: "Urus administrasi kepindahan warga keluar desa.",
      icon: <ArrowRight className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      link: "/peristiwa"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Layanan Masyarakat</h2>
        <p className="text-muted-foreground mt-1">
          Pusat penerbitan surat pengantar dan administrasi digital desa.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Layanan Pembuatan Surat</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buat Surat */}
          <Card className="border-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <Link href="/layanan/buat-surat" className="absolute inset-0 z-10"></Link>
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary text-white group-hover:scale-110 transition-transform shadow-md">
                <Layers className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl text-gray-800 group-hover:text-primary transition-colors">
                Buat Surat Keterangan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 mb-6">
                Akses cepat untuk membuat 10+ jenis surat keterangan desa (SKU, SKTM, Domisili, dll) dalam satu formulir pintar.
              </CardDescription>
              <div className="inline-flex items-center text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg group-hover:bg-primary/90 transition-colors">
                Buka Layanan Surat <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>

          {/* Arsip Surat */}
          <Card className="border-2 border-orange-500/20 bg-orange-50/50 hover:border-orange-500/40 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <Link href="/layanan/arsip" className="absolute inset-0 z-10"></Link>
            <CardHeader className="pb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-orange-500 text-white group-hover:scale-110 transition-transform shadow-md">
                <Archive className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl text-gray-800 group-hover:text-orange-600 transition-colors">
                Arsip Surat Keluar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600 mb-6">
                Riwayat digital dan buku register untuk semua surat keterangan yang telah dicetak. Cari dan cetak ulang surat yang hilang.
              </CardDescription>
              <div className="inline-flex items-center text-sm font-semibold text-white bg-orange-500 px-4 py-2 rounded-lg group-hover:bg-orange-600 transition-colors">
                Buka Arsip Surat <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Pencatatan Peristiwa Kependudukan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layananList.map((item, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer border border-transparent hover:border-gray-100 relative overflow-hidden">
              <Link href={item.link} className="absolute inset-0 z-10"></Link>
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <CardTitle className="text-xl text-gray-800 group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-500 h-10">
                  {item.desc}
                </CardDescription>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  Akses Modul Peristiwa <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
