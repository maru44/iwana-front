import { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';

import HeadCustom from '../../components/HeadCustom';
import WantedElement from '../../components/WantedElement';
import Header from '../../components/Header';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ParsedUrlQuery } from 'node:querystring';

interface Props {
    wanteds: { [key: number]: any[]}
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

    const { data, error } = useSWR(
        localUrl, fetchTalk, { initialData: initialWanted }
    )

    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header></Header>
          <main>
              <div className="mainZone mla mra">
                <div className="pt20">
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

    const res = await fetch(`${baseUrl}/api/wanted/${username}`);
    const wanteds = await res.json();

    const user = wanteds;

    return {
        props: {
            wanteds: wanteds,
            user: user,
        }
    }
}

export default WantedList;
