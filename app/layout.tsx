import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//import FloatingGetQuoteBadge from "@/components/FloatingGetQuoteBadge";
import TabbedContentWrapper from "@/components/TabbedContentWrapper/TabbedContentWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quality design build.",
  description: "Personal design, honest communication, and quality construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/*<FloatingGetQuoteBadge />*/}
        <TabbedContentWrapper>

          {children}

        </TabbedContentWrapper>

      </body>
    </html>
  );
}
