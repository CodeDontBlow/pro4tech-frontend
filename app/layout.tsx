import { Martel_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const martelSans = Martel_Sans({
  variable: "--font-martel-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      <body className={`${martelSans.variable} ${ibmPlexSans.variable} antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}