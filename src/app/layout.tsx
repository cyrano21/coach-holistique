import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";

// Configuration de Poppins
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Configuration de Playfair Display
const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: '--font-playfair', // Permet d'utiliser la police comme variable CSS
});

export const metadata: Metadata = {
  title: "Coach Holistique",
  description: "Coaching holistique pour un bien-être durable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="fr">
      <head></head>
      <body className={`min-h-screen flex flex-col ${poppins.className} ${playfair.variable}`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
