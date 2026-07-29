"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, FileDown, MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Warga } from "@/types/warga";

import { WargaFormDialog } from "@/components/warga/WargaFormDialog";

// Mock Data
const mockData: Warga[] = [
  {
    id: "1", nik: "3201010101010001", namaLengkap: "Asep Sunandar", tempatLahir: "Bandung", tanggalLahir: "1980-01-01", jenisKelamin: "L", agama: "Islam", statusPerkawinan: "Kawin", alamat: "Jl. Sukamulya No. 1", dusun: "Cempaka", rt: "01", rw: "02", statusWarga: "AKTIF", sumberData: "BASELINE_DISDUKCAPIL", createdAt: "2026-01-01", updatedAt: "2026-01-01"
  },
  {
    id: "2", nik: "3201010101010002", namaLengkap: "Siti Aminah", tempatLahir: "Sumedang", tanggalLahir: "1985-05-15", jenisKelamin: "P", agama: "Islam", statusPerkawinan: "Kawin", alamat: "Jl. Sukamulya No. 1", dusun: "Cempaka", rt: "01", rw: "02", statusWarga: "AKTIF", sumberData: "BASELINE_DISDUKCAPIL", createdAt: "2026-01-01", updatedAt: "2026-01-01"
  },
  {
    id: "3", nik: "3201010101010003", namaLengkap: "Budi Santoso", tempatLahir: "Jakarta", tanggalLahir: "1992-08-20", jenisKelamin: "L", agama: "Kristen", statusPerkawinan: "Belum Kawin", alamat: "Jl. Pahlawan No. 45", dusun: "Melati", rt: "03", rw: "01", statusWarga: "AKTIF", sumberData: "INPUT_MANUAL", createdAt: "2026-02-10", updatedAt: "2026-02-10"
  },
  {
    id: "4", nik: "3201010101010004", namaLengkap: "Rina Kusuma", tempatLahir: "Bogor", tanggalLahir: "1995-12-10", jenisKelamin: "P", agama: "Katolik", statusPerkawinan: "Belum Kawin", alamat: "Jl. Pahlawan No. 45", dusun: "Melati", rt: "03", rw: "01", statusWarga: "PINDAH_KELUAR", sumberData: "INPUT_MANUAL", createdAt: "2026-03-05", updatedAt: "2026-04-12"
  }
];

export default function WargaPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [filterDusun, setFilterDusun] = useState<string>("Semua");
  
  const [data, setData] = useState<Warga[]>(mockData);
  const [editWarga, setEditWarga] = useState<Warga | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = (id: string, nama: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data penduduk ${nama}?`)) {
      setData(data.filter(w => w.id !== id));
    }
  };

  const filteredData = data.filter(warga => {
    const matchSearch = warga.namaLengkap.toLowerCase().includes(search.toLowerCase()) || warga.nik.includes(search);
    const matchStatus = filterStatus === "Semua" || warga.statusWarga === filterStatus;
    const matchDusun = filterDusun === "Semua" || warga.dusun === filterDusun;
    return matchSearch && matchStatus && matchDusun;
  });

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    
    // Header CSV
    const headers = ["NIK", "Nama Lengkap", "Jenis Kelamin", "Agama", "Status Perkawinan", "Alamat", "Dusun", "RT", "RW", "Status Warga"];
    
    // Body CSV
    const csvRows = filteredData.map(warga => [
      `"${warga.nik}"`,
      `"${warga.namaLengkap}"`,
      `"${warga.jenisKelamin}"`,
      `"${warga.agama}"`,
      `"${warga.statusPerkawinan}"`,
      `"${warga.alamat}"`,
      `"${warga.dusun}"`,
      `"${warga.rt}"`,
      `"${warga.rw}"`,
      `"${warga.statusWarga}"`
    ].join(","));
    
    const csvString = [headers.join(","), ...csvRows].join("\n");
    
    // Create Blob and Download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Data_Warga_Sukamulya_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Data Penduduk</h2>
          <p className="text-muted-foreground mt-1">
            Kelola data induk kependudukan Desa Sukamulya.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-gray-600 hover:bg-gray-50" onClick={handleExportCSV}>
            <FileDown className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <WargaFormDialog />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari NIK atau Nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-gray-200"
            />
          </div>
          
          <div className="flex w-full md:w-auto items-center gap-3">
            <Select value={filterDusun} onValueChange={setFilterDusun}>
              <SelectTrigger className="w-full md:w-[150px] bg-white">
                <SelectValue placeholder="Semua Dusun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Dusun</SelectItem>
                <SelectItem value="Cempaka">Cempaka</SelectItem>
                <SelectItem value="Melati">Melati</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[160px] bg-white">
                <SelectValue placeholder="Status Warga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Status</SelectItem>
                <SelectItem value="AKTIF">Aktif</SelectItem>
                <SelectItem value="PINDAH_KELUAR">Pindah Keluar</SelectItem>
                <SelectItem value="MENINGGAL">Meninggal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="font-semibold text-gray-600">NIK</TableHead>
                <TableHead className="font-semibold text-gray-600">Nama Lengkap</TableHead>
                <TableHead className="font-semibold text-gray-600">L/P</TableHead>
                <TableHead className="font-semibold text-gray-600">Dusun</TableHead>
                <TableHead className="font-semibold text-gray-600">RT/RW</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="text-right font-semibold text-gray-600">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((warga) => (
                  <TableRow key={warga.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900">{warga.nik}</TableCell>
                    <TableCell>{warga.namaLengkap}</TableCell>
                    <TableCell>{warga.jenisKelamin}</TableCell>
                    <TableCell>{warga.dusun}</TableCell>
                    <TableCell>{warga.rt}/{warga.rw}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        warga.statusWarga === 'AKTIF' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : warga.statusWarga === 'PINDAH_KELUAR'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {warga.statusWarga.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 p-0 text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors outline-none">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <Link href={`/warga/${warga.id}`} passHref legacyBehavior>
                              <DropdownMenuItem className="cursor-pointer text-gray-600">
                                <Eye className="mr-2 h-4 w-4" /> Detail
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer text-primary" onClick={() => { setEditWarga(warga); setIsEditDialogOpen(true); }}>
                              <Edit className="mr-2 h-4 w-4" /> Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700" onClick={() => handleDelete(warga.id, warga.namaLengkap)}>
                              <Trash className="mr-2 h-4 w-4" /> Hapus
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    Tidak ada data warga ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/30">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium text-gray-900">{filteredData.length}</span> dari <span className="font-medium text-gray-900">{data.length}</span> data
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
            <Button variant="outline" size="sm" disabled>Selanjutnya</Button>
          </div>
        </div>
      </div>

      <WargaFormDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        initialData={editWarga || undefined} 
      />
    </div>
  );
}
