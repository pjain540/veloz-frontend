import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./globals.css";
import "../../public/css/style.css";
import BootstrapClient from "@/components/BootstrapClient";
import { CartProvider } from "@/providers/CartProvider";
import { Toaster } from 'react-hot-toast';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Veloz",
  description: "Veloz frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
          <BootstrapClient />
        </CartProvider>
      </body>
    </html>
  );
}
