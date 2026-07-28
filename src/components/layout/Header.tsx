"use client";

import { Search, Bell, Mail, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUiStore } from "@/store/uiStore";
import { useSession } from "next-auth/react";

export function Header() {
  const pathname = usePathname();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Admin Desa";
  const userRole = (session?.user as any)?.role || "ADMIN";
  const displayRole = userRole === "SUPER_ADMIN" ? "Super Admin" : 
                      userRole === "KEPALA_DESA" ? "Kepala Desa" : 
                      userRole === "RT_RW" ? "Kepala Dusun" : "Admin";
  
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-6 shrink-0 print:hidden">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Cari data penduduk..." 
            className="w-full pl-10 h-10 bg-gray-50/50 border-gray-200 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/dashboard" 
            className={cn("text-sm font-semibold pb-1 border-b-2", pathname === "/dashboard" ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-900")}
          >
            Statistik
          </Link>
          <Link 
            href="/wilayah" 
            className={cn("text-sm font-semibold pb-1 border-b-2", pathname === "/wilayah" ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-900")}
          >
            Wilayah
          </Link>
          <Link 
            href="/layanan" 
            className={cn("text-sm font-semibold pb-1 border-b-2", pathname === "/layanan" ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-900")}
          >
            Layanan
          </Link>
        </nav>

        <div className="flex items-center gap-4 border-l pl-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 text-primary hover:bg-gray-50 rounded-full transition-colors outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl p-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-semibold text-gray-800">Notifikasi Baru</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-1 py-2">
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-gray-50 flex flex-col items-start gap-1">
                    <span className="font-medium text-sm text-gray-900">3 Pengajuan Data Baru</span>
                    <span className="text-xs text-gray-500">Ada 3 warga yang menunggu verifikasi KTP.</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-gray-50 flex flex-col items-start gap-1">
                    <span className="font-medium text-sm text-gray-900">Laporan Selesai</span>
                    <span className="text-xs text-gray-500">Laporan demografi bulan ini berhasil dibuat.</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-gray-50 flex flex-col items-start gap-1">
                    <span className="font-medium text-sm text-gray-900">Sistem Maintenance</span>
                    <span className="text-xs text-gray-500">Pemeliharaan server nanti malam pukul 00:00.</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 cursor-pointer justify-center text-primary font-medium text-sm">
                Lihat Semua Notifikasi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-primary hover:bg-gray-50 rounded-full transition-colors outline-none">
              <Mail className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl p-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-semibold text-gray-800">Pesan Masuk</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="space-y-1 py-2">
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-gray-50 flex flex-col items-start gap-1">
                    <span className="font-medium text-sm text-gray-900">Bpk. Hidayat (RT 02)</span>
                    <span className="text-xs text-gray-500 truncate w-full">Pak, mohon dicek pengajuan SKTM warga saya a.n Budi.</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-gray-50 flex flex-col items-start gap-1">
                    <span className="font-medium text-sm text-gray-900">Admin Kecamatan</span>
                    <span className="text-xs text-gray-500 truncate w-full">Undangan sosialisasi aplikasi SIAK terbaru hari Jumat.</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 cursor-pointer justify-center text-primary font-medium text-sm">
                Buka Kotak Masuk
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-primary">{userName}</p>
              <p className="text-xs text-gray-500">{displayRole} - Portal Sukamulya</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
