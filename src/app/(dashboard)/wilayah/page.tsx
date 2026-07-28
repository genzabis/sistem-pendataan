"use client";

import { Map, MapPin, Home, Users, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function WilayahPage() {
  const dataDusun = [
    { id: "Dusun Cigintung", nama: "Cigintung", ketua: "Atoy Sunarto", kk: 210, jiwa: 640, luas: "7.2 km²" },
    { id: "Dusun Cintamukti", nama: "Cintamukti", ketua: "Trisno", kk: 195, jiwa: 580, luas: "6.8 km²" },
    { id: "Dusun Sukasari", nama: "Sukasari", ketua: "Hendra Nurdiana, S.Pd", kk: 240, jiwa: 720, luas: "8.5 km²" },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">Pemetaan Wilayah</h2>
        <p className="text-muted-foreground mt-1">
          Peta geografis dan data demografi per Dusun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Peta Interaktif (Mockup) */}
        <Card className="lg:col-span-2 border-none shadow-sm h-[500px] overflow-hidden relative group">
          <div className="absolute inset-0 bg-blue-50/50"></div>
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[80%] h-[80%] border-4 border-indigo-200/50 rounded-3xl bg-indigo-50/30 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <div className="text-center p-8 bg-white/80 rounded-2xl shadow-lg border border-white/50 backdrop-blur-md">
                <Map className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">Integrasi Peta Desa (GIS)</h3>
                <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Fitur pemetaan lahan dan batas wilayah RT/RW menggunakan API Google Maps / Leaflet (Tahap 2).</p>
              </div>

              {/* Dummy Map Pins */}
              <div className="absolute top-[20%] left-[30%] animate-bounce delay-100">
                <MapPin className="w-8 h-8 text-red-500 drop-shadow-md" />
              </div>
              <div className="absolute top-[60%] left-[70%] animate-bounce delay-300">
                <MapPin className="w-8 h-8 text-blue-500 drop-shadow-md" />
              </div>
              <div className="absolute top-[40%] left-[60%] animate-bounce delay-500">
                <MapPin className="w-8 h-8 text-emerald-500 drop-shadow-md" />
              </div>
            </div>
          </div>
        </Card>

        {/* Statistik Singkat */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500 to-primary text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-100 text-sm font-medium">Total Luas Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">24.5 <span className="text-xl font-normal text-indigo-200">km²</span></div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Data Per Dusun</CardTitle>
              <CardDescription>Demografi berdasarkan pembagian Dusun.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="divide-y">
                {dataDusun.map((dusun, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {dusun.nama.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{dusun.id}</h4>
                        <p className="text-xs text-gray-500">Kadus: {dusun.ketua}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{dusun.jiwa} Jiwa</div>
                      <div className="text-xs text-gray-500">{dusun.kk} KK</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
