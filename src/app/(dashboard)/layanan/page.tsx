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
      color: "bg-primary/10 text-primary",
      link: "/peristiwa"
    },
    {
      title: "Pencatatan Kematian",
      desc: "Buat Surat Keterangan Kematian warga desa.",
      icon: <FileSignature className="w-8 h-8" />,
      color: "bg-primary/10 text-primary",
      link: "/peristiwa"
    },
    {
      title: "Surat Pengantar Pindah",
      desc: "Urus administrasi kepindahan warga keluar desa.",
      icon: <ArrowRight className="w-8 h-8" />,
      color: "bg-primary/10 text-primary",
      link: "/peristiwa"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Layanan Masyarakat</h2>
        <p className="text-muted-foreground mt-1">
          Pusat penerbitan surat pengantar dan administrasi digital desa.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Layanan Pembuatan Surat</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {/* Buat Surat */}
          <Card className="border-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <Link href="/layanan/buat-surat" className="absolute inset-0 z-10"></Link>
            <CardHeader className="pb-2 md:pb-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 bg-primary text-white group-hover:scale-110 transition-transform shadow-md">
                <Layers className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <CardTitle className="text-sm md:text-2xl text-gray-800 group-hover:text-primary transition-colors leading-tight">
                Buat Surat Keterangan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs md:text-base text-gray-600 mb-3 md:mb-6 line-clamp-3 md:line-clamp-none">
                Akses cepat untuk membuat 10+ jenis surat keterangan desa (SKU, SKTM, Domisili, dll) dalam satu formulir pintar.
              </CardDescription>
              <div className="inline-flex items-center text-[10px] md:text-sm font-semibold text-white bg-primary px-2 py-1.5 md:px-4 md:py-2 rounded-md md:rounded-lg group-hover:bg-primary/90 transition-colors w-full md:w-auto justify-center md:justify-start">
                <span className="md:hidden">Buka</span><span className="hidden md:inline">Buka Layanan Surat</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </div>
            </CardContent>
          </Card>

          {/* Arsip Surat */}
          <Card className="border-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <Link href="/layanan/arsip" className="absolute inset-0 z-10"></Link>
            <CardHeader className="pb-2 md:pb-4">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 bg-primary text-white group-hover:scale-110 transition-transform shadow-md">
                <Archive className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <CardTitle className="text-sm md:text-2xl text-gray-800 group-hover:text-primary transition-colors leading-tight">
                Arsip Surat Keluar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs md:text-base text-gray-600 mb-3 md:mb-6 line-clamp-3 md:line-clamp-none">
                Riwayat digital dan buku register untuk semua surat keterangan yang telah dicetak. Cari dan cetak ulang surat yang hilang.
              </CardDescription>
              <div className="inline-flex items-center text-[10px] md:text-sm font-semibold text-white bg-primary px-2 py-1.5 md:px-4 md:py-2 rounded-md md:rounded-lg group-hover:bg-primary/90 transition-colors w-full md:w-auto justify-center md:justify-start">
                <span className="md:hidden">Buka</span><span className="hidden md:inline">Buka Arsip Surat</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Pencatatan Peristiwa Kependudukan</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {layananList.map((item, idx) => (
            <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer border border-transparent hover:border-gray-100 relative overflow-hidden flex flex-col">
              <Link href={item.link} className="absolute inset-0 z-10"></Link>
              <CardHeader className="pb-2 md:pb-4 flex-1">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                  {/* Clone element to override icon size on mobile if necessary, or just rely on CSS */}
                  <div className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-8 md:[&>svg]:h-8">
                    {item.icon}
                  </div>
                </div>
                <CardTitle className="text-sm md:text-xl text-gray-800 group-hover:text-primary transition-colors leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-end">
                <CardDescription className="text-[10px] md:text-sm text-gray-500 h-auto md:h-10 line-clamp-2 md:line-clamp-none">
                  {item.desc}
                </CardDescription>
                <div className="mt-2 md:mt-6 flex items-center text-[10px] md:text-sm font-semibold text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity md:-translate-x-2 md:group-hover:translate-x-0 duration-300">
                  <span className="hidden md:inline">Akses Modul Peristiwa</span>
                  <span className="md:hidden">Buka</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
