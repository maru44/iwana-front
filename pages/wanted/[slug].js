import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import Link from 'next/link';
import useSWR from 'swr';

const backEndUrl = 'http://localhost:8000';

const WantedDetail = props => {

    //const wanted = props.wanted;
    //console.log(props);

    async function fetcher (url) {
      const res = await fetch(url);
      return res.json();
    }

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
                </div>
              </main>
            </div>
        </div>
    )
}

export const getServerSideProps = async ctx => {
    const { slug } = ctx.query;
    const res = await fetch(`http://localhost:8000/api/wanted/${slug}`);
    const wanted = await res.json();

    const res2 = await fetch(`http://localhost:8000/api/offering/${slug}`);
    const offers = await res2.json();
  
    return {
      props: {
        wanted: wanted,
        offers: offers,
      }
    }
}

export default WantedDetail;