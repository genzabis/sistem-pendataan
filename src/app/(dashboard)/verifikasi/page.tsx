"use client";

import { useState } from "react";
import { Check, X, Eye, Filter, ShieldCheck } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Pengajuan = {
  id: string;
  tipe: "KELAHIRAN" | "KEMATIAN" | "PINDAH";
  pemohon: string;
  tanggalPengajuan: string;
  status: "MENUNGGU" | "DISETUJUI" | "DITOLAK";
  detail: string;
};

const mockData: Pengajuan[] = [
  { id: "REQ-001", tipe: "KELAHIRAN", pemohon: "Ahmad Hidayat", tanggalPengajuan: "2026-07-28", status: "MENUNGGU", detail: "Kelahiran bayi laki-laki (Budi)" },
  { id: "REQ-002", tipe: "PINDAH", pemohon: "Siti Aminah", tanggalPengajuan: "2026-07-27", status: "MENUNGGU", detail: "Pindah ke Kec. Cikarang" },
  { id: "REQ-003", tipe: "KEMATIAN", pemohon: "Rahman", tanggalPengajuan: "2026-07-26", status: "DISETUJUI", detail: "Bpk. Suryana (Sakit)" },
  { id: "REQ-004", tipe: "KELAHIRAN", pemohon: "Dewi Lestari", tanggalPengajuan: "2026-07-25", status: "DITOLAK", detail: "Kelahiran anak ke-2 (Dokumen Tidak Lengkap)" },
];

import { VerifikasiDetailDialog } from "@/components/verifikasi/VerifikasiDetailDialog";

export default function VerifikasiPage() {
  const [activeTab, setActiveTab] = useState<"ANTRIAN" | "RIWAYAT">("ANTRIAN");
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredData = mockData.filter(item => 
    activeTab === "ANTRIAN" ? item.status === "MENUNGGU" : item.status !== "MENUNGGU"
  );

  return (
    <>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary/80" /> 
            Verifikasi Data
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Modul khusus Super Admin (Kades/Sekdes) untuk memverifikasi perubahan data.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        {/* Tab Controls */}
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab("ANTRIAN")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === "ANTRIAN" ? "text-primary border-b-2 border-primary bg-white" : "text-gray-500 hover:bg-gray-100/50"
            }`}
          >
            Antrian Approval
            <span className="ml-2 bg-orange-100 text-orange-700 py-0.5 px-2 rounded-full text-xs">
              {mockData.filter(d => d.status === "MENUNGGU").length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab("RIWAYAT")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === "RIWAYAT" ? "text-primary border-b-2 border-primary bg-white" : "text-gray-500 hover:bg-gray-100/50"
            }`}
          >
            Riwayat Verifikasi
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 flex items-center justify-between bg-white border-b border-gray-50">
          <Button variant="outline" size="sm" className="text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            Filter Kategori
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="w-[120px] font-semibold text-gray-600">ID Tiket</TableHead>
                <TableHead className="font-semibold text-gray-600">Tipe Peristiwa</TableHead>
                <TableHead className="font-semibold text-gray-600">Tgl Pengajuan</TableHead>
                <TableHead className="font-semibold text-gray-600">Pemohon</TableHead>
                <TableHead className="font-semibold text-gray-600">Keterangan Singkat</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-600">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">{item.id}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        item.tipe === 'KELAHIRAN' ? 'bg-blue-50 text-blue-700' :
                        item.tipe === 'KEMATIAN' ? 'bg-gray-100 text-gray-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {item.tipe}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{item.tanggalPengajuan}</TableCell>
                    <TableCell className="font-medium">{item.pemohon}</TableCell>
                    <TableCell className="text-gray-600 truncate max-w-[200px]">{item.detail}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'MENUNGGU' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        item.status === 'DISETUJUI' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.status === "MENUNGGU" ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700" title="Tolak">
                            <X className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700" title="Setujui">
                            <Check className="w-4 h-4" />
                          </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-primary" 
                              title="Lihat Detail"
                              onClick={() => {
                                setSelectedPengajuan(item);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-3 text-primary text-xs font-medium"
                            onClick={() => {
                              setSelectedPengajuan(item);
                              setIsDialogOpen(true);
                            }}
                          >
                            Lihat Detail
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <ShieldCheck className="w-10 h-10 text-gray-300" />
                        <p>Tidak ada pengajuan yang {activeTab === "ANTRIAN" ? "menunggu verifikasi" : "dalam riwayat"}.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <VerifikasiDetailDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        pengajuan={selectedPengajuan}
      />
    </>
  );
}
