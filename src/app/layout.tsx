import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";
import QuickNavBar from "./QuickNavBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DreamPoint | General Contractor for Your Dreams",
  description: "The future operating system for beauty founders. Secure your digital booth in the Dreampoint Mall.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "DreamPoint",
    description: "Secure your digital booth in the Dreampoint Mall.",
    url: "https://dreampoint.web",
    siteName: "DreamPoint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamPoint",
    description: "The future operating system for beauty founders. Secure your digital booth in the Dreampoint Mall.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${workSans.variable} antialiased font-work text-concrete-900 bg-transparent`}
      >
        <QuickNavBar />
        {children}
      </body>
    </html>
  );
}
