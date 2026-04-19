import type { Metadata } from "next";
import { fraunces, geist } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AK Sign — Commercial Signage, Arlington Heights IL",
  description:
    "Custom illuminated signs, lightboxes, and vehicle wraps for Chicago-area businesses. Design, UL-listed LED fabrication, permit handling, and install.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
