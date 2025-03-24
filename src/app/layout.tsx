import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap", // important
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap", // 👈 garantit le fallback si Google Fonts échoue
  variable: "--font-playfair",
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
      <body
        className={`min-h-screen flex flex-col ${poppins.className} ${playfair.variable}`}
      >
        <ThemeProvider>
          <Navbar />
          <RootLayoutClient>
            <main className="flex-grow">{children}</main>
          </RootLayoutClient>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
