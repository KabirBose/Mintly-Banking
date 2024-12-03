import type { Metadata } from "next";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import { Nunito } from "next/font/google";
import "@/app/globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mintly Finance",
  description: "A comprehensive personal finance tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AccessTokenProvider>{children}</AccessTokenProvider>
      </body>
    </html>
  );
}
