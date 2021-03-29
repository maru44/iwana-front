import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import Link from 'next/link';
import useSWR from 'swr';

const backEndUrl = 'http://localhost:8000';

export const topImageStyle = img => {
    const dict = {
        backgroundImage: `${backEndUrl}/media/${img}`,
    }

    return dict;
}

const WantedDetail = ({ wanted }) => {

    //const wanted = props.wanted;
    //console.log(props);
    console.log(wanted);

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
                      <div className="frameContain w100" style={topImageStyle( wanted.picture )}></div>
                    </div>
                    <div className="mt20 flexNormal spBw alFlBot">
                      <div className="flex1 flexNormal alCen hrefBox">
                        <div className="imgCircle" style={topImageStyle( wanted.user.picture )}></div>
                        <div className="ml10 flex1 ovHide">
                          <h2 className="whNormal h3Size">{ wanted.user }</h2>
                        </div>
                      </div>
                      <div>
                         <small>{ wanted.posted }</small>
                      </div>
                    </div>
                    <div className="platArea mt15 flexNormal flexWrap alCen">
                      <div className="mr20 mt5">希望プラットフォーム: </div>
                      <div className="mt5">
                      {/*
                        { wanted.plat && wanted.plat.map(
                             (p, index) => <span key={index}>{ p.name }</span>
                        )}
                      */}
                      </div>
                    </div>
                    <div className="mt10 flexNormal flexWrap">
                      <div className="mr20 mb5">価格目安: </div>
                      <div className="">{ wanted.wante_price } 円</div>
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

export async function getServerSideProps(ctx) {
    const { slug } = ctx.query;
    const res = await fetch(`http://localhost:8000/api/wanted/${slug}`);
    const wanted = await res.json();
  
    return { props: { wanted } }
}

export default WantedDetail;