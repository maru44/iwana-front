import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import Link from 'next/link';
import useSWR from 'swr';

export const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const WantedDetail = props => {

    //const wanted = props.wanted;
    //console.log(props);

    async function fetcher (url) {
      const res = await fetch(url);
      return res.json();
    }

    // const backEndUrl = process.env.BACKEND_URL;

    const wanted = props.wanted;

    const initialOffers = props.offers;
    const { data, error } = useSWR(
      `${backEndUrl}/api/offering/${wanted.slug}`, fetcher, { initialData: initialOffers }
    )

    return (
        <div>
            <HeadCustom></HeadCustom>
            <Header></Header>
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
                      </div>
                      <div>
                         <small>{ wanted.posted }</small>
                      </div>
                    </div>
                    <div className="platArea mt15 flexNormal flexWrap alCen">
                      <div className="mr20 mt5">希望プラットフォーム: </div>
                      <div className="mt5">
                        { wanted.plat && wanted.plat.map(
                             (p, index) => <span key={index}>{ p.name }</span>
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
                  {/* offer */}
                  <div className="mt40 offerZone">
                    <h2 className="h3Size">オファー</h2>
                    <div className="mt10 field">
                      {wanted.is_gotten ? (
                        <h4 className="textCen have">入手済み</h4>
                      ) : (
                        <div className="notHave">
                          <label htmlFor="id_offer_url">メッセージまたはリンク</label>
                          <div className="flexNormal">
                            <input type="text" name="offer" id="id_offer_url" className="w70 wM1200px" />
                            <div id="offeringBtn" className="ml10 btNormal btFormat1 flexCen border1 pl10 pr10">送信</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt20 offerList">
                      {data && data.map(
                        (offer, index) =>  (
                          <div className="flexNormal mb10 alCen" key={index}>
                            {offer.user && (
                              <div className="mr10  hrefBox">
                                {/* if offer user is_auth */}
                                <div className="offerUserArea">
                                  <div className="imgCircle mla mra w30px h30px" 
                                    style={{ backgroundImage: `url(${backEndUrl}${offer.user.picture})` }}>
                                  </div>
                                </div>
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

export const getServerSideProps = async ctx => {
    const { slug } = ctx.query;
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