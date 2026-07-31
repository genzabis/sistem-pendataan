"use client";

import { useState } from "react";
import { Search, Printer, FileText, ArrowLeft, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dummy Data
const arsipData = [
  {
    id: "SRT-001",
    nomor: "503 / 024 / DS.SKM / VII / 2026",
    jenis: "Surat Keterangan Usaha",
    pemohon: "Niamilah Nabil Syahputra",
    nik: "3329102203060002",
    tanggal: "27 Juli 2026",
    keperluan: "Pengajuan KUR Bank BRI",
  },
  {
    id: "SRT-002",
    nomor: "470 / 025 / DS.SKM / VII / 2026",
    jenis: "Surat Keterangan Domisili",
    pemohon: "Asep Sunandar",
    nik: "3329101101850004",
    tanggal: "28 Juli 2026",
    keperluan: "Pendaftaran Sekolah Anak",
  },
  {
    id: "SRT-003",
    nomor: "460 / 026 / DS.SKM / VII / 2026",
    jenis: "Surat Keterangan Tidak Mampu",
    pemohon: "Siti Aminah",
    nik: "3329104405780001",
    tanggal: "28 Juli 2026",
    keperluan: "Pengajuan Beasiswa KIP",
  },
  {
    id: "SRT-004",
    nomor: "331 / 027 / DS.SKM / VII / 2026",
    jenis: "Pengantar SKCK",
    pemohon: "Budi Santoso",
    nik: "3329101212990003",
    tanggal: "29 Juli 2026",
    keperluan: "Melamar Pekerjaan",
  }
];

export default function ArsipSuratPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");

  const filteredData = arsipData.filter(item => {
    const matchSearch = item.pemohon.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.nomor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchJenis = filterJenis === "Semua" ? true : item.jenis === filterJenis;
    return matchSearch && matchJenis;
  });

  const handleCetakUlang = (item: typeof arsipData[0]) => {
    // Navigasi ke halaman cetak dengan data yang sama
    const url = `/layanan/cetak?jenis=${encodeURIComponent(item.jenis)}&nama=${encodeURIComponent(item.pemohon)}&nik=${encodeURIComponent(item.nik)}&keperluan=${encodeURIComponent(item.keperluan)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 print:p-8 print:m-0 bg-white print:[font-family:'Times_New_Roman',Times,serif] print:text-black">
      
      {/* KOP untuk Laporan Cetak (Hanya tampil saat di-print) */}
      <div className="hidden print:block w-full mb-8">
        <div className="flex items-center justify-between border-b-[3px] border-double border-black pb-4 mb-6">
          <div className="w-[80px] h-[100px] flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Logo Pangandaran" className="w-[80px] h-auto object-contain" />
          </div>
          <div className="flex-1 text-center px-4">
            <h1 className="text-xl font-bold uppercase tracking-wider">Pemerintah Kabupaten Pangandaran</h1>
            <h2 className="text-xl font-bold uppercase tracking-wider">Kecamatan Langkaplancar</h2>
            <h3 className="text-2xl font-bold uppercase tracking-widest mt-1 mb-1">Desa Sukamulya</h3>
            <p className="text-sm">Jalan Raya Sukamulya, Kecamatan Langkaplancar, Kabupaten Pangandaran, Jawa Barat 46391</p>
          </div>
          <div className="w-[80px] shrink-0"></div> {/* Spacer for centering */}
        </div>
        
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold uppercase underline underline-offset-4 decoration-2">Buku Register Arsip Surat Keluar</h4>
          <p className="text-sm mt-1">Dicetak pada: {new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 no-print print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/layanan" className="text-sm text-muted-foreground hover:text-primary flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Layanan
            </Link>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Arsip Surat Keluar</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Buku register digital untuk riwayat surat keterangan yang telah diterbitkan.
          </p>
        </div>
        <div className="flex gap-2 self-start md:self-auto">
          <Button variant="outline" onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" /> 
            <span className="hidden sm:inline">Export PDF / Cetak Laporan</span>
            <span className="sm:hidden">Cetak</span>
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm print:border-none print:shadow-none">
        <CardHeader className="pb-4 bg-gray-50/50 border-b print:hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" /> Daftar Riwayat Surat
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Select value={filterJenis} onValueChange={(v) => v && setFilterJenis(v)}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                  <SelectValue placeholder="Filter Jenis Surat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua Surat</SelectItem>
                  <SelectItem value="Surat Keterangan Usaha">Surat Keterangan Usaha</SelectItem>
                  <SelectItem value="Surat Keterangan Domisili">Surat Keterangan Domisili</SelectItem>
                  <SelectItem value="Surat Keterangan Tidak Mampu">Surat Keterangan Tidak Mampu</SelectItem>
                  <SelectItem value="Pengantar SKCK">Pengantar SKCK</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari nama atau no surat..."
                  className="pl-9 bg-white w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 print:p-0 overflow-x-auto">
          <Table className="print:border-collapse print:border print:border-black min-w-[800px] print:min-w-0">
            <TableHeader className="bg-gray-50 print:bg-transparent print:border-black">
              <TableRow className="print:border-black">
                <TableHead className="w-[50px] font-semibold print:border print:border-black print:text-black text-center">No.</TableHead>
                <TableHead className="w-[200px] font-semibold print:border print:border-black print:text-black">Nomor Surat</TableHead>
                <TableHead className="font-semibold print:border print:border-black print:text-black">Pemohon</TableHead>
                <TableHead className="font-semibold print:border print:border-black print:text-black">Jenis Surat</TableHead>
                <TableHead className="font-semibold print:border print:border-black print:text-black">Tujuan / Keperluan</TableHead>
                <TableHead className="font-semibold print:border print:border-black print:text-black">Tanggal</TableHead>
                <TableHead className="text-right font-semibold print:hidden">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-gray-50/50 print:border-black">
                    <TableCell className="text-center font-medium print:border print:border-black print:text-black">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 print:border print:border-black print:text-black">
                      {item.nomor}
                    </TableCell>
                    <TableCell className="print:border print:border-black print:text-black">
                      <div className="flex flex-col">
                        <span className="font-medium print:font-normal">{item.pemohon}</span>
                        <span className="text-xs text-muted-foreground print:text-black">{item.nik}</span>
                      </div>
                    </TableCell>
                    <TableCell className="print:border print:border-black print:text-black">
                      <Badge variant="secondary" className="font-normal print:bg-transparent print:border-none print:p-0 print:text-black">
                        {item.jenis}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 truncate max-w-[200px] print:max-w-none print:whitespace-normal print:border print:border-black print:text-black">
                      {item.keperluan}
                    </TableCell>
                    <TableCell className="print:border print:border-black print:text-black">{item.tanggal}</TableCell>
                    <TableCell className="text-right print:hidden">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => handleCetakUlang(item)}>
                        <Printer className="w-4 h-4 mr-2" /> Cetak Ulang
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    Tidak ada surat yang ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
