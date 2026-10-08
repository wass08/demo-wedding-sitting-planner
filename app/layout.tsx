import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vow — Wedding Atelier",
  description: "Arrange your people in a beautifully imagined garden wedding. Create your seating plan, set the atmosphere, and take it with you.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
