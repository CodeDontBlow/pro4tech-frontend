import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Metadata } from "next";
import { martel, ibmPlex } from "./fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Orbita | Pro4Tech",
  description:
    "O suporte da Pro4Tech que garante a continuidade das suas operações.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${martel.variable} ${ibmPlex.variable} antialiased overflow-hidden`}
      >
        {children}
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton
          theme="light"
        />
      </body>
    </html>
  );
}
