import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromoBoost AI",
  description: "AI Marketing Engine for ambitious local businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}