import type { Metadata } from "next";
import { AccessTokenProvider } from "@/context/AccessTokenContext";
import "@/app/globals.css";

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
      <body>
        <AccessTokenProvider>{children}</AccessTokenProvider>
      </body>
    </html>
  );
}
