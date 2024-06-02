import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { pretendard } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
    </Providers>
  );
}
