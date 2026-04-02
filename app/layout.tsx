import type { Metadata } from "next";
import "./globals.css";
import GlowCursor from "./sections/GlowCursor";

export const metadata: Metadata = {
  title: "Future Life Studio",
  description: "Creative Studio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <GlowCursor />
        {children}
      </body>
    </html>
  );
}