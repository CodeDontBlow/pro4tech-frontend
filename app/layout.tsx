import "./globals.css";
import { Metadata } from "next";
import { martel, ibmPlex } from "./fonts";

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
    <html lang="pt-br">
      <body className={`${martel.variable} ${ibmPlex.variable} antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}