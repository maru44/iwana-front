import { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';

import HeadCustom from './components/HeadCustom';
import WantedElement from './components/WantedElement';
import Header from './components/Header';

import { useCurrentUser } from './hooks/useCurrentUser';

interface Props {
    wanteds: { [key: number]: any[]}
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
          <Header what={1}></Header>
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const res = await fetch(`${baseUrl}/api/wanted`);
    const wanteds = await res.json();

    return { props: { wanteds } }
}

export default WantedList;