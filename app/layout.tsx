import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfairDisplay",
  subsets: ["latin"],
  weight: ['400', '600', '700', '900'],
  display: "swap",
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



// export const metadata: Metadata = {
//   title: "Book Converse",
//   description: "Transform your book into interactive AI conversations. Upload PDFs, and chat with your books using voice.",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://bookconverse.vercel.app"),

  title: {
    default: "Book Converse",
    template: "%s | Book Converse",
  },

  description:
    "Transform PDFs into interactive AI conversations. Upload books, documents, and study materials to chat with them using AI and voice.",

  keywords: [
    "AI books",
    "chat with PDF",
    "PDF AI assistant",
    "AI reader",
    "interactive books",
    "voice AI books",
    "study assistant",
    "document chatbot",
    "book chatbot",
    "Book Converse",
  ],

  authors: [
    {
      name: "Book Converse",
    },
  ],

  creator: "Book Converse",

  publisher: "Book Converse",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Book Converse",
    description:
      "Upload PDFs and transform books into interactive AI conversations with voice support.",
    url: "https://bookconverse.vercel.app",
    siteName: "Book Converse",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Book Converse",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}