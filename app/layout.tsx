import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll Driven Hero",
  description: "Premium Scroll Animation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}