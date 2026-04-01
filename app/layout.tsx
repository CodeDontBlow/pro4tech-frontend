import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/ui/navbar";

export const metadata: Metadata = {
  title: "Orbita | Pro4Tech",
  description: "O suporte da Pro4Tech que garante a continuidade das suas operações.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}