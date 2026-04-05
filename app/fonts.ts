import { Martel, IBM_Plex_Sans } from "next/font/google";

export const martel = Martel({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-martel",
  display: "swap",
});

export const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});
