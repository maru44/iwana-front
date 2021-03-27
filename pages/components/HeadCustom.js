import Head from 'next/head';
import Link from 'next/link';

const HeadCustom = headData => {

    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{headData.title}</title>
            {/* Global site tag (gtag.js) - Google Analytics */}
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-C5EW2JNG4R"></script>
              
            {/* GA end */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="Iwana" />
        </Head>
    )
}

export default HeadCustom;