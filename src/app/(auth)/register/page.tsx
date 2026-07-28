"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon, LockIcon, ShieldCheck, HelpCircle, Globe, IdCard, Mail, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-white">
      {/* Background layer */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="hidden lg:block w-1/2 bg-primary"></div>
        <div className="w-full lg:w-1/2 bg-white"></div>
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex w-full h-full items-center">
        <div className="flex w-full items-start">
          
          {/* Left side - Branding */}
          <div className="hidden lg:flex w-1/2 justify-center px-8 lg:px-12 text-center text-white">
            <div className="flex flex-col items-center w-full max-w-md mt-12">
              <img src="/logo.png" alt="Logo" className="w-24 h-auto object-contain mb-6 drop-shadow-lg" />
              <h1 className="text-4xl font-bold mb-1">Desa Sukamulya</h1>
              <h2 className="text-xl font-medium text-primary-foreground/90 mb-4">Kec. Langkaplancar, Kab. Pangandaran</h2>
              <p className="text-primary-foreground/80 text-base mb-8 leading-relaxed">
                Platform digital terintegrasi untuk pengelolaan data penduduk, administrasi desa, dan layanan masyarakat yang lebih transparan dan efisien.
              </p>

              <div className="flex gap-4 mt-8 w-full">
                <div className="flex-1 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <UserIcon className="w-5 h-5 text-white/70" />
                    <span className="text-white/70 text-sm font-medium">Total Penduduk</span>
                  </div>
                  <div className="text-2xl font-bold">12.4k+</div>
                </div>
                <div className="flex-1 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-white/70" />
                    <span className="text-white/70 text-sm font-medium">Layanan Digital</span>
                  </div>
                  <div className="text-2xl font-bold">99%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Register Form */}
          <div className="flex w-full lg:w-1/2 justify-center px-6 sm:px-10 lg:px-12">
            <div className="w-full max-w-md space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Akun</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Daftarkan diri Anda untuk mengakses layanan Portal Sukamulya.
                </p>
              </div>

              <form className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-gray-700 font-medium">Nomor Induk Kependudukan (NIK)</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="nik"
                      placeholder="Masukkan 16 digit NIK"
                      className="pl-10 h-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Nama Lengkap</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Sesuai KTP"
                      className="pl-10 h-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email (Opsional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="pl-10 h-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Buat password"
                      className="pl-10 pr-10 h-10 rounded-xl border-gray-200"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700 font-medium">Konfirmasi Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      className="pl-10 pr-10 h-10 rounded-xl border-gray-200"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="button" className="w-full h-10 text-base font-semibold rounded-xl mt-2">
                  Daftar Sekarang
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600 pt-4">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">
                  Masuk di sini
                </Link>
              </p>

              <div className="flex items-center justify-center gap-4 pt-4 text-gray-400">
                <HelpCircle className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors" />
                <Globe className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors" />
                <ShieldCheck className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors" />
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                © 2026 Pemerintah Desa Sukamulya. All rights reserved.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
