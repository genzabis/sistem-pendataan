"use client";

import { useState } from "react";
import { Download, FileText, Filter, Printer, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
          <h2 className="text-3xl font-bold tracking-tight text-primary">Laporan & Rekapitulasi</h2>
          <p className="text-muted-foreground mt-1">
            Hasilkan dan unduh laporan kependudukan Desa Sukamulya.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 print:hidden" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Cetak Preview
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white print:hidden" onClick={handleExportExcel}>
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 print:block">
        {/* Filter Section - Hidden during print */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6 print:hidden">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Parameter Laporan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Jenis Laporan</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="penduduk">Data Induk Penduduk</option>
                  <option value="mutasi">Mutasi (Datang/Pindah)</option>
                  <option value="kelahiran">Rekap Kelahiran</option>
                  <option value="kematian">Rekap Kematian</option>
                </select>
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
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <option value="all">Semua RW</option>
                  <option value="01">RW 01</option>
                  <option value="02">RW 02</option>
                  <option value="03">RW 03</option>
                </select>
              </div>

              <Button className="w-full mt-4" onClick={() => setIsReportGenerated(true)}>Buat Laporan</Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="md:col-span-8 lg:col-span-9 print:col-span-12">
          <Card className="border-none shadow-sm h-full min-h-[500px] print:shadow-none print:min-h-0">
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
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 print:bg-gray-200">
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">No</th>
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">NIK</th>
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">Nama Lengkap</th>
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">RT</th>
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">RW</th>
                        <th className="border p-2 text-left text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReportData.map((row) => (
                        <tr key={row.no} className="hover:bg-gray-50 print:hover:bg-transparent">
                          <td className="border p-2 text-sm text-gray-600">{row.no}</td>
                          <td className="border p-2 text-sm font-medium text-gray-900">{row.nik}</td>
                          <td className="border p-2 text-sm text-gray-800">{row.nama}</td>
                          <td className="border p-2 text-sm text-gray-600">{row.rt}</td>
                          <td className="border p-2 text-sm text-gray-600">{row.rw}</td>
                          <td className="border p-2 text-sm text-gray-600">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
