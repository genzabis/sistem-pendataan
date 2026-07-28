"use client";

import { FileText, FileSignature, Landmark, FileBadge2, Stethoscope, ArrowRight } from "lucide-react";
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
    },
    {
      title: "Surat Keterangan Usaha (SKU)",
      desc: "Pembuatan surat pengantar usaha untuk keperluan bank/izin.",
      icon: <Landmark className="w-8 h-8" />,
      color: "bg-amber-50 text-amber-600",
      link: "#"
    },
    {
      title: "Surat Keterangan Tidak Mampu",
      desc: "Penerbitan SKTM untuk keperluan pendidikan dan kesehatan.",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      link: "#"
    },
    {
      title: "Surat Keterangan Domisili",
      desc: "Bukti tempat tinggal sementara atau domisili perusahaan.",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      link: "#"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
                Akses Layanan <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
