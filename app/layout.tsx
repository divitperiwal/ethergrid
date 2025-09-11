import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethergrid | Crypto Wallet & Transaction Tracker",
  description:
    "Ethergrid is a modern crypto wallet for securely sending, receiving, and tracking cryptocurrencies in real-time.",
  icons: {
    icon: "/fav.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${opensans.className} antialiased`}>{children}</body>
    </html>
  );
}
