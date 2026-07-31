"use client";

import { useState } from "react";
import { Download, FileText, Filter, Printer, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LaporanPage() {
  const [reportType, setReportType] = useState("penduduk");
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const mockReportData = [
    { no: 1, nik: "3201010101010001", nama: "Asep Sunandar", rt: "01", rw: "02", status: "Aktif" },
    { no: 2, nik: "3201010101010002", nama: "Siti Aminah", rt: "01", rw: "02", status: "Aktif" },
    { no: 3, nik: "3201010101010003", nama: "Budi Santoso", rt: "03", rw: "01", status: "Aktif" },
    { no: 4, nik: "3201010101010004", nama: "Rina Kusuma", rt: "03", rw: "01", status: "Pindah Keluar" },
  ];

  const handleExportExcel = () => {
    if (!isReportGenerated) {
      alert("Silakan buat laporan terlebih dahulu sebelum mengekspor!");
      return;
    }

    const headers = ["No", "NIK", "Nama Lengkap", "RT", "RW", "Status"];
    const csvRows = mockReportData.map(row => 
      [row.no, `"${row.nik}"`, `"${row.nama}"`, `"${row.rt}"`, `"${row.rw}"`, `"${row.status}"`].join(",")
    );
    
    const csvString = [headers.join(","), ...csvRows].join("\n");
    
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Laporan_${reportType}_Desa_Sukamulya.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!isReportGenerated) {
      alert("Silakan buat laporan terlebih dahulu sebelum mencetak!");
      return;
    }
    window.print();
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">Laporan & Rekapitulasi</h2>
          <p className="text-muted-foreground mt-1">
            Hasilkan dan unduh laporan kependudukan Desa Sukamulya.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0 self-start w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none gap-2 print:hidden" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Cetak Preview</span>
            <span className="sm:hidden">Cetak</span>
          </Button>
          <Button className="flex-1 sm:flex-none gap-2 bg-emerald-600 hover:bg-emerald-700 text-white print:hidden" onClick={handleExportExcel}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Excel</span>
            <span className="sm:hidden">Excel</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 print:block">
        {/* Filter Section - Hidden during print */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6 print:hidden">
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Parameter Laporan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Jenis Laporan</Label>
                <Select value={reportType} onValueChange={(val) => val && setReportType(val)}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Pilih Jenis Laporan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="penduduk">Data Induk Penduduk</SelectItem>
                    <SelectItem value="mutasi">Mutasi (Datang/Pindah)</SelectItem>
                    <SelectItem value="kelahiran">Rekap Kelahiran</SelectItem>
                    <SelectItem value="kematian">Rekap Kematian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Periode Awal</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label>Periode Akhir</Label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <Label>Berdasarkan RW</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Semua RW" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua RW</SelectItem>
                    <SelectItem value="01">RW 01</SelectItem>
                    <SelectItem value="02">RW 02</SelectItem>
                    <SelectItem value="03">RW 03</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full mt-4" onClick={() => setIsReportGenerated(true)}>Buat Laporan</Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="md:col-span-8 lg:col-span-9 print:col-span-12">
          <Card className="shadow-sm h-full min-h-[500px] print:shadow-none print:min-h-0">
            <CardHeader className="bg-gray-50/50 border-b pb-4 print:bg-white print:border-none">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2 print:text-2xl print:justify-center">
                <FileText className="w-5 h-5 text-primary print:hidden" />
                Preview Dokumen
              </CardTitle>
              <CardDescription className="print:hidden">Menampilkan baris pertama dari laporan yang dipilih.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 print:pt-0">
              {!isReportGenerated ? (
                <div className="border rounded-xl bg-gray-50/30 flex flex-col items-center justify-center h-[400px] text-gray-400 p-8 text-center border-dashed print:hidden">
                  <TableIcon className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Belum ada pratinjau</h3>
                  <p className="text-sm">Silakan pilih parameter di samping dan klik "Buat Laporan" untuk melihat pratinjau data sebelum mengunduh.</p>
                </div>
              ) : (
                <div className="overflow-x-auto print:overflow-visible">
                  <div className="hidden print:block mb-6 text-center">
                    <h1 className="text-xl font-bold uppercase">Laporan Kependudukan Desa Sukamulya</h1>
                    <p className="text-gray-600">Kecamatan Langkaplancar, Kabupaten Pangandaran</p>
                    <p className="text-gray-600 mt-2 font-medium">Kategori Laporan: {reportType}</p>
                  </div>
                  <Table className="print:border-collapse print:border print:border-black">
                    <TableHeader className="bg-gray-50 print:bg-transparent print:border-black">
                      <TableRow className="print:border-black">
                        <TableHead className="w-[50px] font-semibold print:border print:border-black print:text-black">No</TableHead>
                        <TableHead className="w-[200px] font-semibold print:border print:border-black print:text-black">NIK</TableHead>
                        <TableHead className="font-semibold print:border print:border-black print:text-black">Nama Lengkap</TableHead>
                        <TableHead className="font-semibold print:border print:border-black print:text-black">RT</TableHead>
                        <TableHead className="font-semibold print:border print:border-black print:text-black">RW</TableHead>
                        <TableHead className="font-semibold print:border print:border-black print:text-black">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReportData.map((row) => (
                        <TableRow key={row.no} className="hover:bg-gray-50/50 print:border-black print:hover:bg-transparent">
                          <TableCell className="font-medium text-gray-600 print:border print:border-black print:text-black">{row.no}</TableCell>
                          <TableCell className="font-medium text-gray-900 print:border print:border-black print:text-black">{row.nik}</TableCell>
                          <TableCell className="print:border print:border-black print:text-black">{row.nama}</TableCell>
                          <TableCell className="print:border print:border-black print:text-black">{row.rt}</TableCell>
                          <TableCell className="print:border print:border-black print:text-black">{row.rw}</TableCell>
                          <TableCell className="print:border print:border-black print:text-black">{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="hidden print:flex justify-end mt-12">
                    <div className="text-center">
                      <p className="mb-16">Mengetahui,<br/>Kepala Desa Sukamulya</p>
                      <p className="font-bold underline">H. Taryono, SE</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
