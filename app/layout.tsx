import { Martel_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${martelSans.variable} ${ibmPlexSans.variable} antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
