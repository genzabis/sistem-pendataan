"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function CetakSuratContent() {
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  // Parameter dari URL
  const jenisSurat = searchParams.get("jenis") || "Surat Keterangan";
  const namaLengkap = searchParams.get("nama") || "Niamilah Nabil Syahputra";
  const nik = searchParams.get("nik") || "1234567891234567";
  const keperluan = searchParams.get("keperluan") || "untuk usaha UMKM di provinsi";
  
  // Logika Penomoran Surat Resmi (Berdasarkan Permendagri Tata Naskah Dinas Desa)
  // Format: [Kode Klasifikasi] / [Nomor Urut] / [Kode Instansi] / [Bulan Romawi] / [Tahun]
  const getKodeKlasifikasi = (jenis: string) => {
    const lowerJenis = jenis.toLowerCase();
    if (lowerJenis.includes("usaha") || lowerJenis.includes("sku")) return "503"; // Perizinan / Usaha
    if (lowerJenis.includes("sktm") || lowerJenis.includes("tidak mampu")) return "460"; // Kesejahteraan Sosial
    if (lowerJenis.includes("skck")) return "331"; // Trantib
    if (lowerJenis.includes("nikah") || lowerJenis.includes("janda")) return "474.2"; // Perkawinan
    return "470"; // Default: Kependudukan (Domisili, Beda Identitas, dll)
  };

  const getRomawiBulan = () => {
    const romawi = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return romawi[new Date().getMonth()];
  };


  const [nomorUrut, setNomorUrut] = useState(1);

  useEffect(() => {
    setIsReady(true);
    setNomorUrut(Math.floor(Math.random() * 99) + 1);
  }, []);

  const formattedNomor = nomorUrut.toString().padStart(3, "0");
  const tahun = new Date().getFullYear();
  const kodeKlasifikasi = getKodeKlasifikasi(jenisSurat);
  const nomorSuratResmi = `${kodeKlasifikasi} / ${formattedNomor} / DS.SKM / ${getRomawiBulan()} / ${tahun}`;

  if (!isReady) return null;

  return (
    <div className="min-h-screen print:min-h-0 bg-gray-100 print:bg-white py-8 print:py-0 flex flex-col items-center text-black print:block" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Action Buttons (Hidden on Print) */}
      <div className="no-print w-[215mm] flex justify-end gap-4 mb-6">
        <Button variant="outline" className="bg-white shadow-sm" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
        <Button onClick={() => window.print()} className="shadow-sm">
          <Printer className="w-4 h-4 mr-2" /> Cetak Sekarang (Ctrl+P)
        </Button>
      </div>

      {/* F4 (Folio) Paper Container */}
      <div className="bg-white shadow-xl print:shadow-none relative overflow-hidden print:overflow-visible w-[215mm] min-h-[330mm] p-[20mm] print:w-full print:min-h-0 print:m-0">
        
        {/* KOP Surat */}
        <div className="flex items-center justify-between border-b-[3px] border-double border-black pb-4 mb-8">
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

        {/* Judul Surat */}
        <div className="text-center mb-10">
          <h4 className="text-xl font-bold uppercase underline underline-offset-4 decoration-2">{jenisSurat}</h4>
          <p className="text-sm mt-1">Nomor: {nomorSuratResmi}</p>
        </div>

        {/* Isi Surat */}
        <div className="text-base leading-relaxed text-justify space-y-6 px-4">
          <p>
            Yang bertanda tangan di bawah ini Kepala Desa Sukamulya, Kecamatan Langkaplancar, Kabupaten Pangandaran, dengan ini menerangkan bahwa:
          </p>

          <table className="w-full ml-8">
            <tbody>
              <tr>
                <td className="w-40 py-1 align-top">Nama Lengkap</td>
                <td className="w-4 py-1 align-top">:</td>
                <td className="py-1 align-top font-bold">{namaLengkap}</td>
              </tr>
              <tr>
                <td className="w-40 py-1 align-top">NIK</td>
                <td className="w-4 py-1 align-top">:</td>
                <td className="py-1 align-top">{nik}</td>
              </tr>
              <tr>
                <td className="w-40 py-1 align-top">Keperluan</td>
                <td className="w-4 py-1 align-top">:</td>
                <td className="py-1 align-top">{keperluan}</td>
              </tr>
            </tbody>
          </table>

          <p>
            Orang tersebut di atas adalah benar warga Desa Sukamulya, Kecamatan Langkaplancar, Kabupaten Pangandaran. Surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.
          </p>
        </div>

        {/* Tanda Tangan & Verifikasi (Mengikuti konten, tidak dipaku di bawah) */}
        <div className="mt-20 flex justify-end px-8">
          
          {/* Tanda Tangan Kades */}
          <div className="text-center w-64">
            <p className="mb-1">Sukamulya, 27 Juni 2026</p>
            <p className="mb-24">Kepala Desa</p>
            <p className="font-bold underline uppercase">Jajang Somantri</p>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default function CetakSuratPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center bg-gray-100">Memuat Dokumen...</div>}>
      <CetakSuratContent />
    </Suspense>
  );
}
