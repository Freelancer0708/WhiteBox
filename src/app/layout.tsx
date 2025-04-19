import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhiteBox",
  description: "クリック位置から豆知識を得られるアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7923860585158007" crossOrigin="anonymous"></script>
      </Head>
      <body className={`${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
