import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto_sans",
});

export const metadata: Metadata = {
  title: "CloudSRM",
  description: "SRM's very own cloud storage service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto_sans.variable} font-noto_sans antialiased`}>{children}</body>
    </html>
  );
}
