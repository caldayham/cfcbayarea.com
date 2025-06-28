import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContactBadge from "@/components/FloatingContactBadge";
import BottomTabs from "@/components/BottomTabs";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fixed Frame/Border - never scrolls */}
        <div
          className="fixed inset-0 flex flex-col pointer-events-none"
          style={{
            margin: '8px',
            marginBottom: '60px', // Space for tabs
            border: '4px solid var(--color-text-primary)',
            borderRadius: 'var(--radius)'
          }}
        >
          {/* Scrollable Content Area - THIS is what was missing */}
          <main 
            className="flex-1 overflow-auto bg-transparent pointer-events-auto"
            style={{
              margin: '4px', // Small margin inside border
              borderRadius: 'calc(var(--radius) - 4px)' // Slightly smaller radius
            }}
          >
            {children}
          </main>
        </div>

        {/* Bottom Tabs - Fixed at bottom of viewport */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{ margin: '8px', marginTop: '0' }}
        >
          <BottomTabs />
        </div>
        
        {/* Floating contact badge - appears on all pages */}
        <FloatingContactBadge />
      </body>
    </html>
  );
}