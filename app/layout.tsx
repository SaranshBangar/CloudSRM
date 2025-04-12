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
      <head>
        <meta name="google-site-verification" content="qF71edahFIYLNHvFM63PAKUWBDzbvGg5Dk4j44IM_Eg" />
        <meta name="google-adsense-account" content="ca-pub-4851546257120071" />
      </head>
      <body className={`${noto_sans.variable} font-noto_sans antialiased`}>{children}</body>
    </html>
  );
}
