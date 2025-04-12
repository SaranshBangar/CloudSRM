import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { SoftwareApplicationJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto_sans",
});

export const metadata: Metadata = {
  title: {
    default: "CloudSRM - SRM's Cloud Storage Platform",
    template: "%s | CloudSRM",
  },
  description:
    "Secure cloud storage service built specifically for SRMIST students and faculty. Upload, manage, and share your academic files with ease.",
  keywords: ["cloud storage", "SRMIST", "SRM Institute", "file sharing", "document management", "student portal", "academic files"],
  authors: [{ name: "Saransh Bangar" }, { name: "MD Rakiul Islam" }],
  creator: "SRMIST",
  publisher: "SRMIST",
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "CloudSRM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.cloudsrm.xyz",
    siteName: "CloudSRM",
    title: "CloudSRM - SRM's Cloud Storage Platform",
    description:
      "Secure cloud storage service built specifically for SRMIST students and faculty. Upload, manage, and share your academic files with ease.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudSRM - SRM's Cloud Storage Platform",
    description:
      "Secure cloud storage service built specifically for SRMIST students and faculty. Upload, manage, and share your academic files with ease.",
    images: ["/assets/images/cloudsrm-og.png"],
    creator: "@srmist",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SoftwareApplicationJsonLd
          name="CloudSRM"
          description="Secure cloud storage service built specifically for SRMIST students and faculty"
          applicationCategory="WebApplication"
          operatingSystem="Windows, macOS, Android, iOS"
        />
        <OrganizationJsonLd
          name="SRM Institute of Science and Technology"
          url="https://www.srmist.edu.in"
          logo="https://www.cloudsrm.xyz/favicon.ico"
          description="SRM Institute of Science and Technology (formerly known as SRM University) is one of the top ranking universities in India with over 52,000 full time students and more than 3200 faculty."
        />
      </head>
      <body className={`${noto_sans.variable} font-noto_sans antialiased`}>{children}</body>
    </html>
  );
}
