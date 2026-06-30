import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import "./pages.css";
import HashScroll from "@/components/HashScroll";
import Preloader from "@/components/Preloader";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jelapang Resources — Military, Railway & IT Engineering Solutions",
  description:
    "Jelapang Resources Sdn. Bhd. is a Malaysian Bumiputera-owned engineering and supply specialist delivering world-class technologies across Military, Railway and IT for government and industry.",
  keywords: [
    "Jelapang Resources",
    "defence supplier Malaysia",
    "rail engineering",
    "IT systems integration",
    "Bumiputera defence company",
    "military equipment supply Malaysia",
  ],
  openGraph: {
    title: "Jelapang Resources — Military, Railway & IT Engineering Solutions",
    description:
      "World-class technologies and technical services across Military, Railway and IT for Malaysia's government and industrial sectors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <HashScroll />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
