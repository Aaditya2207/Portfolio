import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aaditya's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-white`}>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton /> {/* 👈 Scroll-to-top button added */}
      </body>
    </html>
  );
}
