import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, User, Calendar, FileText, Image as ImageIcon } from "lucide-react";

type Pengajuan = {
  id: string;
  tipe: string;
  pemohon: string;
  tanggalPengajuan: string;
  status: string;
  detail: string;
};

interface VerifikasiDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pengajuan: Pengajuan | null;
}

export function VerifikasiDetailDialog({ isOpen, onOpenChange, pengajuan }: VerifikasiDetailDialogProps) {
  if (!pengajuan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary/80" />
              Detail Pengajuan
              <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${
                pengajuan.status === 'MENUNGGU' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                pengajuan.status === 'DISETUJUI' ? 'bg-green-50 text-green-700 border-green-200' :
                'bg-red-50 text-red-700 border-red-200'
              }`}>
                {pengajuan.status}
              </span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          
          {/* Section: Info Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Informasi Tiket</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">ID Pengajuan:</span>
                <span className="font-medium text-gray-900">{pengajuan.id}</span>
                
                <span className="text-gray-500">Tipe Peristiwa:</span>
                <span className="font-medium text-gray-900">{pengajuan.tipe}</span>
                
                <span className="text-gray-500">Tanggal Diajukan:</span>
                <span className="font-medium text-gray-900">{pengajuan.tanggalPengajuan}</span>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Data Pemohon</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500">Nama Pemohon:</span>
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> {pengajuan.pemohon}
                </span>
                
                <span className="text-gray-500">Detail Laporan:</span>
                <span className="font-medium text-gray-900 col-span-2 mt-1 bg-white p-2 rounded-md border border-gray-200">
                  {pengajuan.detail}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Dokumen Lampiran */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" /> Dokumen Lampiran Pendukung
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center space-y-2 h-40">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <div className="text-sm font-medium text-gray-700">Surat Pengantar RT/RW</div>
                <Button variant="outline" size="sm" className="mt-2 text-xs">Lihat Dokumen</Button>
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center space-y-2 h-40">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <div className="text-sm font-medium text-gray-700">Foto KTP / KK Pemohon</div>
                <Button variant="outline" size="sm" className="mt-2 text-xs">Lihat Dokumen</Button>
              </div>
            </div>
          </div>

          {/* Action Buttons (Hanya jika masih menunggu) */}
          {pengajuan.status === "MENUNGGU" && (
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Button 
                variant="outline" 
                className="px-6 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={() => {
                  alert("Pengajuan ditolak!");
                  onOpenChange(false);
                }}
              >
                <X className="w-4 h-4 mr-2" /> Tolak
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 shadow-md"
                onClick={() => {
                  alert("Pengajuan berhasil disetujui!");
                  onOpenChange(false);
                }}
              >
                <Check className="w-4 h-4 mr-2" /> Setujui Perubahan
              </Button>
            </div>
          )}

          {/* Close button untuk histori */}
          {pengajuan.status !== "MENUNGGU" && (
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Tutup
              </Button>
            </div>
          )}
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
