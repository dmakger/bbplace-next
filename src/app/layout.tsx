import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AppProvider } from "./_providers/app-provider";
import { SITE_NAME } from "@/constans/seo.constans";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--inter-font'});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Платформа для поиска оптовых поставщиков и покупателей, маркетплейс для бизнеса, B2B площадка'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
