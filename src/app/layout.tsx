import type { Metadata } from "next";
// import { Inter, Geologica } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "./_providers/app-provider";
import { SITE_NAME } from "@/shared/data/seo.data";
import { cls } from "@/shared/lib/classes.lib";
import Script from "next/script";
import { Html } from "next/document";

// const geologica = Geologica({ 
//   subsets: ["latin", "cyrillic"], 
//   variable: '--geologica-font',
//   weight: ['400', '500', '600', '700'],
// });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--inter-font'});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Платформа для поиска оптовых поставщиков и покупателей, маркетплейс для бизнеса, B2B площадка',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/logo.png',
                href: '/logo.png',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/logo.png',
                href: '/logo.png',
            },
        ]
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <link rel="icon" href="/favicon.ico" />
        {/* <body className={cls(geologica.className, inter.className)}> */}
        <body className={cls(inter.className)}>

            {/* Yandex.Metrika counter */}
            <Script id="yandex-metrika-init" strategy="afterInteractive">
                {`
                    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                        ym(93744111, "init", {
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                    });
                `}
            </Script>
            {/* /Yandex.Metrika counter */}

            {/* Google.Metrika counter */}
            <Script id="google-metrika-init" strategy="afterInteractive">
                {`
                    (function (w, d, s, l, i) {
                        w[l] = w[l] || []; w[l].push({
                            'gtm.start':

                            new Date().getTime(), event: 'gtm.js'
                        }); var f = d.getElementsByTagName(s)[0],

                            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =

                            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);

                    })(window, document, 'script', 'dataLayer', 'GTM-5665HK79');
                `}
            </Script>
            {/* /Google.Metrika counter */}


            {/* Facebook.Metrika counter */}
            <Script id="facebook-metrika-init" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '531193806300696');
                    fbq('track', 'PageView');
                `}
            </Script>
            {/* /Facebook.Metrika counter */}

            {/* YANDEX && GOOGLE && FACEBOOK Metrika noscript */}
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/93744111" style={{ position: 'absolute', left: '-9999px' }} alt="" />\
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5665HK79" height="0" width="0" style={{ display: "none", visibility: "hidden"}}></iframe>
                    <img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=531193806300696&ev=PageView&noscript=1"/>
                </div>
            </noscript>
            {/* /YANDEX && GOOGLE Metrika noscript */}

            <Providers>
                {children}
            </Providers>
        </body>
        </html>
  );
}
