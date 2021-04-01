import Link from 'next/link';
import useSWR from 'swr';

import HeadCustom from './components/HeadCustom';
import WantedElement from './components/WantedElement';
import Header from './components/Header';

import { useCurrentUser } from './hooks/useCurrentUser';

const baseUrl = "http://localhost:8000/";

const WantedList = (props) => {
    
    // const localUrl = 'http://localhost:8000/api/wanted';
    const localUrl = `${baseUrl}api/wanted`;

    const { isAuthChecking, CurrentUser } = useCurrentUser();
    console.log(CurrentUser);

    async function fetchTalk (url) {
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
                    {data && data.map( w =>
                      <WantedElement {...w} key={ w.slug } />
                    )}
                </div>
              </div>
          </main>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${baseUrl}api/wanted`);
    const wanteds = await res.json();

    return { props: { wanteds } }
}

export default WantedList;