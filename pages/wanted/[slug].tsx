import Link from 'next/link';
import useSWR from 'swr';
import { useState } from 'react';
import { AppContext } from 'next/app';
import {  GetServerSideProps, NextComponentType, NextPage } from 'next';

import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';
import { headData } from '../types/any';
import { gottenChange } from '../components/Helper';

import { useCurrentUser } from '../hooks/useCurrentUser';
import { ParsedUrlQuery } from 'node:querystring';

import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

export const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
  wanted: {
    slug: number,
    want_name: string,
    want_intro: string,
    want_price: number,
    plat: { [key: number]: any}
    user: any,
    posted: string,
    is_gotten: boolean,
    picture: string,
  },
  offers: { [key: number]: any}
}

// SSR return value
interface SSRProps {
  wanted: { [key: string]: any },
  offers: { [key: number]: any },
}

// ssr query params
interface Params extends ParsedUrlQuery {
  slug: string,
}

const WantedDetail: NextPage<Props> = props => {

    const { isAuthChecking, CurrentUser } = useCurrentUser();

    async function fetcher (url: string) {
      const res = await fetch(url);
      return res.json();
    }

    const wanted = props.wanted;

    const [ is_gotten, SetGotten ] = useState(wanted.is_gotten);

    const initialOffers = props.offers;
    const { data, error } = useSWR(
      `${backEndUrl}/api/offering/${wanted.slug}`, fetcher, { initialData: initialOffers }
    )

    const headData: headData = {
      ogtypeWebsite: 'article',
      ogtitle: `${wanted.want_name} | 欲しいものページ`,
      ogimage: `${backEndUrl}${wanted.picture}`,
      ogdescription: `${wanted.want_name}を欲しがっています。`,
      title: `Iwana - ${wanted.want_name}`,
    }

    const gottenChangeStart = async (e: any) => {
      if (wanted.user.pk === CurrentUser.pk) {
        const which = await gottenChange(e);
        SetGotten(which);
      }
    }

    return (
        <div>
            <HeadCustom {...headData}></HeadCustom>
            <Header what={1}></Header>
            <div className="content">
              <main>
                <div className="mainZone mla mra">
                  <div className="pt20 detPost">
                    <h1 className="brAll h2Size">{ wanted.want_name }</h1>
                    
                    <div className="mt20">
                      <div className="frameContain w100" style={{ backgroundImage: `url(${backEndUrl}${wanted.picture})`}}></div>
                    </div>
                    <div className="mt20 flexNormal spBw alFlBot">
                      <div className="flex1 flexNormal alCen hrefBox">
                        <div className="imgCircle" style={{ backgroundImage: `url(${backEndUrl}${wanted.user.picture})`}}></div>
                        <div className="ml10 flex1 ovHide">
                          <h2 className="whNormal h3Size">{ wanted.user.username }</h2>
                        </div>
                        <Link as={`/wanted/u/${wanted.user.username}`} href="/wanted/u/[username]" passHref>
                          <a className="hrefBoxIn"></a>
                        </Link>
                      </div>
                      <div>
                         <small>{ wanted.posted }</small>
                      </div>
                    </div>
                    <div className="platArea mt15 flexNormal flexWrap alCen">
                      <div className="mr20 mt5">希望プラットフォーム: </div>
                      <div className="mt5">
                        { wanted.plat && wanted.plat.map(
                             (p: any, index: number) => <span className={p.slug} key={index}>{ p.name }</span>
                        )}
                      </div>
                    </div>
                    <div className="mt10 flexNormal flexWrap">
                      <div className="mr20 mb5">価格目安: </div>
                      <div className="">{ wanted.want_price } 円</div>
                    </div>
                    <div className="mt30">
                      <p className="brAll">{ wanted.want_intro }</p>
                    </div>
                  </div>
                  {/* only owner */}
                  { !isAuthChecking && CurrentUser && CurrentUser.pk === wanted.user.pk && (
                    <div className="mt40 flexNormal spBw">
                      <div className="w30 btNormal btnEl pt10 pb10 flexCen gottenBtn"
                       onClick={gottenChangeStart} data-wanted={ wanted.slug }>
                        {is_gotten ? '入手済み' : '未入手'}
                        <span className="is_gotten ml10">
                          {is_gotten ? (
                            <Emoji emoji="confetti_ball" size={20}></Emoji>
                          ) : ''}
                        </span>
                      </div>
                      <div className="w30 btNormal btFormat1 pt10 pb10 flexCen hrefBox">
                        編集<span className="ml10"><Emoji emoji="black_nib" size={20}></Emoji></span>
                        {/*<a href="{% url 'update' post.slug %}" className="hrefBoxIn"></a>*/}
                      </div>
                      <div className="w30 btNormal btFormat1 pt10 pb10 flexCen delWantedBtn" data-wanted={ wanted.slug }>
                        削除<span className="ml10"><Emoji emoji="wastebasket" size={20}></Emoji></span>
                      </div>
                    </div>
                  )}
                  {/* offer */}
                  <div className="mt40 offerZone">
                    <h2 className="h3Size">オファー</h2>
                    <div className="mt10 field">
                      {is_gotten ? (
                        <h4 className="textCen have">入手済み</h4>
                      ) : (
                        <div className="notHave">
                          <label htmlFor="id_offer_url">メッセージまたはリンク</label>
                          <div className="flexNormal">
                            <input type="text" name="offer" id="id_offer_url" className="w70 wM1200px" />
                            <div id="offeringBtn" className="ml10 btNormal btFormat1 flexCen pl10 pr10">送信</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* ここあとで子componentにする */}
                    <div className="mt20 offerList">
                      {data && data.map(
                        (offer: any, index: number) =>  (
                          <div className="flexNormal mb10 alCen" key={index}>
                            {offer.user && (
                              <div className="mr10  hrefBox">
                                {/* if offer user is_auth */}
                                <div className="offerUserArea">
                                  <div className="imgCircle mla mra w30px h30px" 
                                    style={{ backgroundImage: `url(${backEndUrl}${offer.user.picture})` }}>
                                  </div>
                                </div>
                                <Link as={`/wanted/u/${offer.user.username}`} href="/wanted/u/[username]" passHref>
                                  <a className="hrefBoxIn"></a>
                                </Link>
                              </div>
                            )}
                            <article className="flex1 aOffer">
                              <div className="ml10">
                                <p className="brAll">{ offer.offer_url }</p>
                              </div>
                              <div className="mt5 textRight">
                                <small>{ offer.posted }</small>
                              </div>
                            </article>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<SSRProps, Params> = async (ctx) => {
    const slug = ctx.params.slug;
    const res = await fetch(`${backEndUrl}/api/wanted/${slug}`);
    const wanted = await res.json();

    const res2 = await fetch(`${backEndUrl}/api/offering/${slug}`);
    const offers = await res2.json();
  
    return {
      props: {
        wanted: wanted,
        offers: offers,
      }
    }
}

export default WantedDetail;