import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";
import QuickNavBar from "./QuickNavBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DreamPoint | General Contractor for Your Dreams",
  description: "The future operating system for beauty founders. Secure your digital booth in the Dreampoint Mall.",
  openGraph: {
    title: "DreamPoint",
    description: "Secure your digital booth in the Dreampoint Mall.",
    type: "website",
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
        className={`${spaceGrotesk.variable} ${workSans.variable} antialiased font-work text-concrete-900`}
      >
        <QuickNavBar />
        <div className="pt-8">
          {children}
        </div>
      </body>
    </html>
  );
}
