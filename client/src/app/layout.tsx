import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@app/components/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food app",
  description: "Schedule campaigns for restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
