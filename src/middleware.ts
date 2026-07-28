import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/warga/:path*",
    "/peristiwa/:path*",
    "/verifikasi/:path*",
    "/laporan/:path*"
  ],
};
