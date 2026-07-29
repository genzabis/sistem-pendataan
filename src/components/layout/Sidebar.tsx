"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, BarChart2, Settings, LogOut, HelpCircle, ShieldCheck, Plus, Map, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/uiStore";
import { signOut, useSession } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || "ADMIN";
  
  return (
    <>
      {/* Overlay on mobile when sidebar is open */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => useUiStore.getState().toggleSidebar()}
      />
      
      <div className={cn(
        "h-screen bg-white border-r flex flex-col justify-between shrink-0 transition-all duration-300 print:hidden absolute z-50 md:relative",
        isSidebarOpen ? "w-64 translate-x-0 shadow-2xl md:shadow-none" : "-translate-x-full md:translate-x-0 w-64 md:w-20"
      )}>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-6 shrink-0 flex flex-col items-center text-center">
          <img 
            src="/logo.png" 
            alt="Logo Desa" 
            className={cn("h-auto object-contain mb-3 logo-stroke-white transition-all duration-300", isSidebarOpen ? "w-12" : "w-8")}
          />
          {isSidebarOpen && (
            <div className="animate-in fade-in zoom-in duration-300">
              <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">Desa Sukamulya</h1>
              <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">Kec. Langkaplancar, Kab. Pangandaran</p>
            </div>
          )}
        </div>

        <nav className="mt-2 space-y-1 px-4 mb-6">
          <Link href="/dashboard" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
            {pathname === "/dashboard" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Dashboard</span>}
          </Link>
          <Link href="/warga" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/warga" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
            {pathname === "/warga" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
            <Users className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Data Penduduk</span>}
          </Link>
          <Link href="/wilayah" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/wilayah" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
            {pathname === "/wilayah" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
            <Map className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Data Wilayah</span>}
          </Link>
          {(role === "SUPER_ADMIN" || role === "ADMIN" || role === "RT_RW") && (
            <Link href="/layanan" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/layanan" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
              {pathname === "/layanan" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
              <Briefcase className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Layanan Desa</span>}
            </Link>
          )}
          {(role === "SUPER_ADMIN" || role === "ADMIN" || role === "RT_RW") && (
            <Link href="/peristiwa" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/peristiwa" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
              {pathname === "/peristiwa" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
              <FileText className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Catat Peristiwa</span>}
            </Link>
          )}
          {(role === "SUPER_ADMIN" || role === "ADMIN") && (
            <Link href="/verifikasi" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/verifikasi" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
              {pathname === "/verifikasi" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
              <ShieldCheck className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Verifikasi Data</span>}
            </Link>
          )}
          <Link href="/laporan" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/laporan" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
            {pathname === "/laporan" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
            <BarChart2 className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Laporan</span>}
          </Link>
          {role === "SUPER_ADMIN" && (
            <Link href="/pengaturan" className={cn("flex items-center gap-3 py-3 text-sm font-medium rounded-md relative transition-colors", pathname === "/pengaturan" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", isSidebarOpen ? "px-3" : "justify-center")}>
              {pathname === "/pengaturan" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
              <Settings className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Pengaturan</span>}
            </Link>
          )}
        </nav>
      </div>

      <div className={cn("p-4 border-t shrink-0 bg-white", !isSidebarOpen && "px-2")}>
        {role !== "KEPALA_DESA" && (
          <button className={cn("flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors mb-4", isSidebarOpen ? "w-full" : "w-10 h-10 mx-auto p-0 rounded-full shadow-md")}>
            {isSidebarOpen ? "Tambah Data Baru" : <Plus className="w-5 h-5" />}
          </button>
        )}
        <div className="space-y-2">
          <Link href="/bantuan" className={cn("flex items-center gap-3 py-2 text-sm font-medium rounded-md relative transition-colors", pathname === "/bantuan" ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50", isSidebarOpen ? "px-3" : "justify-center")}>
            {pathname === "/bantuan" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>}
            <HelpCircle className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Bantuan</span>}
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={cn("w-full flex items-center gap-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 text-left transition-colors", isSidebarOpen ? "px-3" : "justify-center")}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="whitespace-nowrap animate-in fade-in duration-300">Log Out</span>}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
