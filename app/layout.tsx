import type { Metadata } from "next";
import "./globals.css";
import { martel, ibmPlex } from "./fonts";

import { Footer } from "./components/layout/footer";

export const metadata: Metadata = {
  title: "Orbita | Pro4Tech",
  description: "O suporte da Pro4Tech que garante a continuidade das suas operações.",
};


export default function RootLayout({
  children,
}: {
  }: {
    children: React.ReactNode;
  }) {
}) {
  return (
    <html lang="pt-BR" className={`${martel.variable} ${ibmPlex.variable}`}>
      <body>

        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

