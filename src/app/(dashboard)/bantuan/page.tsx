import { Search, BookOpen, MessageCircle, FileQuestion, Video, Phone, Mail, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BantuanPage() {
  const faqList = [
    {
      q: "Bagaimana cara mereset password akun warga?",
      a: "Anda dapat menuju halaman Pengaturan > Akun, lalu memilih opsi 'Reset Password' atau hubungi administrator sistem desa jika Anda lupa akses utama."
    },
    {
      q: "Apakah data NIK dienkripsi di dalam database?",
      a: "Ya, sistem ini menggunakan enkripsi standar untuk menjaga kerahasiaan NIK dan nomor KK warga sesuai dengan regulasi perlindungan data pribadi."
    },
    {
      q: "Bagaimana jika ada warga yang pindah keluar desa?",
      a: "Masuk ke menu Data Penduduk, klik tombol aksi (titik tiga) pada baris warga yang bersangkutan, lalu pilih 'Edit Data'. Ubah statusnya menjadi 'PINDAH_KELUAR'."
    },
    {
      q: "Kenapa laporan Excel saya berantakan saat dibuka?",
      a: "Pastikan Anda mengatur pemisah kolom (delimiter) pada Microsoft Excel menjadi 'koma' (comma). Anda bisa menggunakan fitur 'Text to Columns' di Excel jika formatnya masih menyatu."
    }
  ];

  const guideTopics = [
    { title: "Panduan Dasar Penggunaan Sistem", icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
    { title: "Video Tutorial: Menambah Data Warga", icon: <Video className="w-5 h-5 text-purple-500" /> },
    { title: "Alur Verifikasi Dokumen Kependudukan", icon: <FileQuestion className="w-5 h-5 text-orange-500" /> },
    { title: "Cara Men-generate & Mencetak Laporan", icon: <FileText className="w-5 h-5 text-emerald-500" /> },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-6xl mx-auto">
      
      {/* Header & Search */}
      <div className="text-center space-y-4 py-8 bg-primary/5 rounded-2xl border border-primary/10">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Pusat Bantuan & Panduan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Temukan jawaban, panduan penggunaan, dan solusi atas kendala yang Anda alami saat menggunakan Portal Sistem Pendataan Desa.
        </p>
        <div className="relative max-w-lg mx-auto mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Ketik topik bantuan yang Anda cari..." 
            className="w-full pl-10 h-12 bg-white border-gray-200 rounded-full shadow-sm text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        
        {/* Left Column: FAQ */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Pertanyaan Populer (FAQ)</h3>
          
          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <details key={index} className="group bg-white border border-gray-100 rounded-xl shadow-sm open:ring-1 open:ring-primary/20 open:shadow-md transition-all">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800 marker:hidden">
                  {faq.q}
                  <span className="relative ml-4 flex h-5 w-5 items-center justify-center">
                    <div className="absolute h-0.5 w-4 bg-gray-400 transition-transform group-open:bg-primary" />
                    <div className="absolute h-4 w-0.5 bg-gray-400 transition-transform group-open:rotate-90 group-open:bg-transparent" />
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mt-10">Buku Panduan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guideTopics.map((topic, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/5">
                  {topic.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">{topic.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">Baca selengkapnya &rarr;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Support */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Butuh Bantuan Langsung?</CardTitle>
              <CardDescription className="text-blue-100">Tim dukungan teknis kami siap membantu Anda menyelesaikan masalah.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-white text-primary hover:bg-gray-100 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Live Chat Support
              </Button>
              <div className="pt-4 border-t border-blue-400/30 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-blue-200" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-blue-200" />
                  <span>support@sukamulya.go.id</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 bg-gray-50/50">
            <CardHeader>
              <CardTitle className="text-base text-gray-700">Kirim Tiket Keluhan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Judul Kendala..." className="bg-white" />
              <textarea 
                className="w-full min-h-[100px] p-3 rounded-md border border-input bg-white text-sm" 
                placeholder="Deskripsikan masalah yang Anda hadapi secara detail..."
              ></textarea>
              <Button className="w-full">Kirim Laporan</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
