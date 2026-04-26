import type { Metadata } from "next";
import "@/styles/global.css";
import { BagProvider } from "@/store/BagContext";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FARFETCH | The Global Destination For Modern Luxury",
  description: "Shop the world's best brands at FARFETCH.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BagProvider>
          <TopBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </BagProvider>
      </body>
    </html>
  );
}
