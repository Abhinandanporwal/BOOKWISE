import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "An AI driven library asssistant",
};

export default function RootLayout({children}) {
  return (
    <html>
    <body>
    <Header/>
    <main>{ children}</main>

    </body>
      </html>
  );
}
