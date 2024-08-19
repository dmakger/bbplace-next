import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.scss";
import { Providers } from "./_providers/app-provider";
import { SITE_NAME } from "@/shared/data/seo.data";
import { cls } from "@/shared/lib/classes.lib";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--inter-font'});
// const poppins = Poppins({ 
//   subsets: ["latin"], 
//   variable: '--poppins-font',
//   weight: ['400', '500', '600', '700'],
// });

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
      {/* <body className={cls(inter.className, poppins.className)}> */}
      <body className={cls(inter.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
