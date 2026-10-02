import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@context/PlanContext";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} bg-[#0a0a0a] text-white font-sans antialiased`}
      >
        <PlanProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },
              success: {
                iconTheme: { primary: "#ccff00", secondary: "#0a0a0a" },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}