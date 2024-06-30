import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const bit = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Bull Market Battletest",
  description: "Can you survive the bull market?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className} suppressHydrationWarning>
      <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
