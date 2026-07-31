"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Activity, Briefcase, MapPin, Edit3, UserPlus, TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Cell, PieChart, Pie, Sector } from "recharts";

const dataRW = [
  { name: "RW 01", total: 400 },
  { name: "RW 02", total: 300 },
  { name: "RW 03", total: 550 },
  { name: "RW 04", total: 450 },
  { name: "RW 05", total: 460 },
];

const dataPekerjaan = [
  { name: "Sektor Swasta", value: 45, fill: "#6d28d9" },
  { name: "Wiraswasta", value: 25, fill: "#8b5cf6" },
  { name: "PNS/ASN", value: 30, fill: "#a78bfa" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ringkasan Dasbor</h1>
        <p className="text-gray-500">Data kependudukan real-time Desa Sukamulya.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Card Total Penduduk */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-1">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Total Penduduk</CardTitle>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">2,160</div>
            <p className="text-[10px] md:text-xs font-medium text-emerald-600 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              +12 bulan ini
            </p>
          </CardContent>
        </Card>

        {/* Card Total KK */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-1">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Total KK</CardTitle>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">645</div>
            <p className="text-[10px] md:text-xs font-medium text-emerald-600 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              +3 bulan ini
            </p>
          </CardContent>
        </Card>

        {/* Card Rasio Jenis Kelamin */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-1">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Rasio P/W</CardTitle>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Activity className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-1">
              <div className="flex items-center justify-between md:block">
                <div className="text-sm md:text-2xl font-bold text-gray-900 tracking-tight order-2 md:order-1">1,050</div>
                <div className="text-[10px] uppercase font-bold text-primary tracking-wider mt-0.5 order-1 md:order-2">Laki-Laki</div>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200"></div>
              <div className="flex items-center justify-between md:block">
                <div className="text-sm md:text-2xl font-bold text-gray-900 tracking-tight order-2 md:order-1">1,110</div>
                <div className="text-[10px] uppercase font-bold text-primary tracking-wider mt-0.5 order-1 md:order-2">Perempuan</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Warga Miskin */}
        <Card className="border border-gray-200 shadow-sm bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2 gap-1">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">Pra Sejahtera</CardTitle>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">124</div>
            <p className="text-[10px] md:text-xs font-medium text-orange-600 flex items-center">
              65,7% dari total penduduk
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sebaran Penduduk per RW */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-base md:text-lg font-bold text-primary">Sebaran Penduduk per RW</CardTitle>
            <select className="bg-gray-50 border-none text-xs font-bold rounded-md px-3 py-1.5 outline-none cursor-pointer w-full sm:w-auto">
              <option>Semua RW</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataRW} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#6b7280' }} dy={10} interval={0} />
                  <YAxis hide />
                  <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={50}>
                    {dataRW.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#4c1d95" /> // Darker purple for bars
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pekerjaan */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-primary">Pekerjaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataPekerjaan}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {dataPekerjaan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-primary">1.420</span>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">PEKERJA</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              {dataPekerjaan.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-gray-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-primary">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aktivitas Terbaru */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-primary">Aktivitas Terbaru</CardTitle>
            <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
          </CardHeader>
          <CardContent className="space-y-6 mt-2">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary">Penduduk baru ditambahkan di RW 02</h4>
                <p className="text-sm text-gray-600 mt-1">Anwar Ibrahim telah berhasil terdaftar.</p>
                <p className="text-xs text-gray-400 mt-2">2 jam yang lalu • oleh Admin A</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary">Pembaruan alamat di KK #1024</h4>
                <p className="text-sm text-gray-600 mt-1">Mengubah alamat domisili untuk Keluarga Budi.</p>
                <p className="text-xs text-gray-400 mt-2">5 jam yang lalu • oleh Admin B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geografis Wilayah */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-primary">Geografis Wilayah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[220px] bg-indigo-50 rounded-xl overflow-hidden border border-indigo-100 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              {/* Dummy Map Illustration */}
              <div className="relative w-full h-full p-2 md:p-4 flex items-end gap-1 md:gap-2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <MapPin className="w-8 h-8 md:w-10 md:h-10 text-red-500 drop-shadow-md animate-bounce" />
                </div>
                
                <div className="bg-white/90 backdrop-blur px-2 py-2 md:px-4 md:py-3 rounded-lg shadow-sm w-1/2 border border-white/50 relative z-10">
                  <div className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-wider">LUAS WILAYAH</div>
                  <div className="text-sm md:text-lg font-bold text-primary">24,5 km²</div>
                </div>
                <div className="bg-white/90 backdrop-blur px-2 py-2 md:px-4 md:py-3 rounded-lg shadow-sm w-1/2 border border-white/50 relative z-10">
                  <div className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-wider">KEPADATAN</div>
                  <div className="text-sm md:text-lg font-bold text-primary">88 jiwa/km²</div>
                </div>
              </div>
              
              <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 z-20">
                <span className="text-xl leading-none">+</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
