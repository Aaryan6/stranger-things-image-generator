import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const strangerFont = localFont({
  src: "./fonts/Stranger Things.ttf",
  variable: "--font-stranger",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Stranger Things Image Generator | Transform Your Reality",
  description:
    "Enter the Upside Down. AI-powered image generator that transforms your photos into the Stranger Things universe. Powered by Nano-Banana-Pro.",
  openGraph: {
    title: "Stranger Things Image Generator",
    description:
      "One click to Dimension Shift your photos into the Upside Down.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${strangerFont.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
