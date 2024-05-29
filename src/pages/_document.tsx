import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    let GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.png" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function (w, d, s, l, i) {
                                w[l] = w[l] || []; w[l].push({
                                    'gtm.start':
                                        new Date().getTime(), event: 'gtm.js'
                                }); var f = d.getElementsByTagName(s)[0],
                                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                                        'https://www.googletagmanager.com/gtm.js?id=' + '${GTM_ID}' + dl; f.parentNode.insertBefore(j, f);
                            })(window, document, 'script', 'dataLayer', '${GTM_ID}');
                        `,
                    }}
                />
            </Head>
            <body className="bg-dark min-h-screen overflow-x-hidden font-red_hot_display">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}