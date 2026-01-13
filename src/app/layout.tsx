import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Well Done",
  description: "Fashion Brand local dengan kwalitas Original Brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
