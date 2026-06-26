import type { Metadata } from "next";
import { DM_Mono,DM_Sans, Playfair_Display } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfairDisplay",
  subsets: ["latin"],
  weight: ['400', '600', '700', '900'],
});

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  variable: "--font-dmMono",
  subsets: ["latin"],
  weight: ['400', '500',],
  display: 'swap'
});



export const metadata: Metadata = {
  title: "Book Converse",
  description: "Transform your book into interactive AI conversations. Upload PDFs, and chat with your books using voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}