import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Stranger Visions - AI Image Generator",
  description: "Transform your photos into the Upside Down with AI-powered dimension shifting",
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
      </body>
    </html>
  );
}
