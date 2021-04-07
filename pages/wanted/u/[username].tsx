import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { ParsedUrlQuery } from 'node:querystring';


import HeadCustom from '../../../components/HeadCustom';
import WantedElement from '../../../components/WantedElement';
import Header from '../../../components/Header';
import { headData } from '../../../types/any';

import { useCurrentUser } from '../../../hooks/useCurrentUser';

interface Props {
    wanteds: { [key: number]: any[]},
    user: { [key: string]: any },
}

// SSR return value
interface SSRProps {
  wanteds: { [key: number]: any },
  user: { [key: string]: any },
}
  
// ssr query params
interface Params extends ParsedUrlQuery {
  username: string,
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const WantedList: NextPage<Props> = props => {
    
    const localUrl = `${baseUrl}/api/wanted`;

    const { isAuthChecking, CurrentUser } = useCurrentUser();

    async function fetchTalk (url: string) {
        const res = await fetch(url);
        return res.json();
    }

    const initialWanted = props.wanteds;

    const user = props.user;

    const { data, error } = useSWR(
        localUrl, fetchTalk, { initialData: initialWanted }
    )

    let uname = user.username;
    if (user.name) { uname = user.name};

    // head data for seo
    const headData: headData = {
      ogtitle: `${uname}さんの欲しいものリスト`,
      ogimage: `${baseUrl}${user.picture}`,
      ogdescription: `${uname}さんの欲しいものリスト | Iwanaで欲しいものを手に入れよう。`,
      title: `Iwana - ${uname}さんの欲しいものリスト`,
    }

    return (
        <div>
          <HeadCustom {...headData}></HeadCustom>
          <Header what={1}></Header>
          <main>
              <div className="mainZone mla mra">
                {/* user data */}
                <div className="mt20 flex1 flexNormal alCen userDetArea">
                  <div className="imgCircle" style={{ backgroundImage: `url('${baseUrl}${user.picture}')`}}></div>
                  <div className="ml10 flex1 ovHide">
                    <h1 className="whNormal h3Size">{ uname }</h1>
                  </div>
                  { CurrentUser && CurrentUser.pk == user.pk && (
                    <div className="w20px textCen btnEl ml10 hrefBox">
                      S
                      <Link href="/user/profile" passHref>
                        <a className="hrefBoxIn"></a>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="mt5">
                  <p>{user.intro}</p>
                </div>
                {/* wanteds list */}
                <div className="mt20">
                    {data && data.map( (w: any) =>
                      <WantedElement {...w} key={ w.slug } />
                    )}
                </div>
              </div>
          </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<SSRProps, Params> = async (ctx) => {
    const username = ctx.params.username;

    const res = await fetch(`${baseUrl}/api/wanted/u/${username}`);
    const json_ = await res.json();

    const wanteds = json_['wanteds'];
    const user = json_['user'];

    return {
        props: {
            wanteds: wanteds,
            user: user,
        }
    }
}

export default WantedList;
