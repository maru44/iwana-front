import Head from 'next/head';
import Link from 'next/link';
import { headData } from '../types/any';

const defaultHeadData: headData = {
    title: 'Iwana | 欲しいものが見つかるサイト',
    ogtypeWebsite: 'website',
    ogimage: 'https://ogp-builder.com/Suo2gx/https://iwana.link/',
    ogtitle: 'Iwana | 欲しいものが見つかるサイト',
    ogdescription: '欲しいものが見つかるサイト Iwanaで欲しいものを手に入れよう。欲しいものを提示しオファーをもらおう。フリマプラットフォームを横断した検索機能を使って商品探しを効率化しよう。',
    seodescription: '欲しいものが見つかるサイト Iwanaで欲しいものを手に入れよう。欲しいものを提示しオファーをもらおう。フリマプラットフォームを横断した検索機能を使って商品探しを効率化しよう。',
}

const HeadCustom = (headData: headData) => {

    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{headData.title ? headData.title: defaultHeadData.title}</title>
            {/* Global site tag (gtag.js) - Google Analytics */}
              <script async src="https://www.googletagmanager.com/gtag/js?id="></script>
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