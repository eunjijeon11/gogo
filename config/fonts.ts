import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Font files can be colocated inside of `app`
export const pretendard = localFont({
  src: [
    {
      path: "../app/font/PretendardVariable.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/font/PretendardVariable.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});
