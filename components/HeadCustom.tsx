import Head from 'next/head';
import Link from 'next/link';
import { headData } from '../types/any';

const defaultHeadData: headData = {
    title: 'iwana | 商品を見つけよう/提案しよう',
    ogtypeWebsite: 'website',
    ogimage: 'https://ogp-builder.com/Suo2gx/https://iwana.link/',
    ogtitle: '逆フリマプラットフォーム | もう商品を探さない!!',
    ogdescription: '逆フリマプラットフォーム！Iwanaで商品を探そう/提案しよう',
    seodescription: '逆フリマプラットフォーム！Iwanaで商品を探そう/提案しよう',
}

const HeadCustom = (headData: headData) => {

    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{headData.title}</title>
            {/* Global site tag (gtag.js) - Google Analytics */}
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-C5EW2JNG4R"></script>
              
            {/* GA end */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:type" content={headData.ogtypeWebsite ? headData.ogtypeWebsite : defaultHeadData.ogtypeWebsite} />
            <meta property="og:description" content={headData.ogdescription ? headData.ogdescription : defaultHeadData.ogdescription } />
            <meta property="og:url" content="https://iwana.link/" />
            <meta property="og:title" content={headData.ogtitle? headData.ogtitle : defaultHeadData.ogtitle } />
            <meta property="og:image" content={headData.ogimage ? headData.ogimage : defaultHeadData.ogimage } />
            <meta name="description" content={headData.seodescription ? headData.seodescription : defaultHeadData.seodescription } />
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="og:site_name" content="Iwana" />
        </Head>
    )
}

export default HeadCustom;