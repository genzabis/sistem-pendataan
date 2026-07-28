"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserIcon, LockIcon, Fingerprint, HelpCircle, Globe, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau Password salah!");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

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

          {/* Right side - Login Form */}
          <div className="flex w-full lg:w-1/2 justify-center px-6 sm:px-10 lg:px-12 mt-12">
            <div className="w-full max-w-md space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Silakan masuk ke akun Sukamulya Portal Anda untuk melanjutkan.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email / NIK</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@desa.com"
                      required
                      className="pl-10 h-11 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <Link href="#" className="text-sm font-semibold text-primary hover:underline">
                      Lupa Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 h-11 rounded-xl border-gray-200"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="rounded-md border-gray-300" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-gray-600 cursor-pointer"
                  >
                    Ingat saya di perangkat ini
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full h-11 text-base font-semibold rounded-xl">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk ke Portal"}
                </Button>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-gray-400 font-medium">Atau</span>
                  </div>
                </div>

                <Button variant="outline" type="button" className="w-full h-11 text-base font-medium rounded-xl border-gray-200 text-gray-700 gap-2">
                  <Fingerprint className="w-5 h-5 text-primary" />
                  Masuk dengan Biometrik
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600 pt-6">
                Belum memiliki akun?{" "}
                <Link href="/register" className="font-bold text-primary hover:underline">
                  Daftar Sekarang
                </Link>
              </p>

              <div className="flex items-center justify-center gap-4 pt-6 text-gray-400">
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
