import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import {
  ClerkProvider,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "BookWise",
  description: "An AI driven library assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" >
    <head>
          <link rel="icon" href="/a.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/a.svg" type="image/svg+xml" />
        </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  </ClerkProvider>
  );
}
