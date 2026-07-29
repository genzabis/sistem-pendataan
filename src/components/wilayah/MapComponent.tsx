"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

import { renderToStaticMarkup } from "react-dom/server";

// We create custom div icons for each dusun to match the original mockup design
const createCustomIcon = (colorClass: string) => {
  const iconHtml = renderToStaticMarkup(
    <div className={`relative flex items-center justify-center animate-bounce ${colorClass} drop-shadow-md`}>
      <MapPin className="w-8 h-8" strokeWidth={2.5} />
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: "bg-transparent border-none",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const mapData = [
  { id: "Dusun Cigintung", nama: "Cigintung", ketua: "Atoy Sunarto", coords: [-7.5250, 108.3750] as [number, number], icon: createCustomIcon("text-red-500") },
  { id: "Dusun Cintamukti", nama: "Cintamukti", ketua: "Trisno", coords: [-7.5350, 108.3850] as [number, number], icon: createCustomIcon("text-blue-500") },
  { id: "Dusun Sukasari", nama: "Sukasari", ketua: "Hendra Nurdiana, S.Pd", coords: [-7.5300, 108.3700] as [number, number], icon: createCustomIcon("text-emerald-500") },
];

export default function MapComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Center coordinate for Desa Sukamulya roughly
  const center: [number, number] = [-7.5300, 108.3780];

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="w-full h-full z-0 rounded-xl">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.map((dusun) => (
        <Marker key={dusun.id} position={dusun.coords} icon={dusun.icon}>
          <Popup className="rounded-xl font-sans">
            <div className="p-1">
              <h3 className="font-bold text-base">{dusun.nama}</h3>
              <p className="text-sm text-gray-600 mb-1">Ketua: {dusun.ketua}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
