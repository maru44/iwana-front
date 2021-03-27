import Link from 'next/link';
import useSWR from 'swr';

import HeadCustom from './components/HeadCustom';
import WantedElement from './components/WantedElement';

const baseUrl = "http://localhost:8000/";

const WantedList = (props) => {
    
    // const localUrl = 'http://localhost:8000/api/wanted';
    const localUrl = `${baseUrl}api/wanted`;
    console.log(localUrl);

    async function fetchTalk (url) {
        const res = await fetch(url);
        return res.json();
    }

    const initialWanted = props.wanteds;

    const { data, error } = useSWR(
        localUrl, fetchTalk, { initialData: initialWanted }
    )

    return (
        <>
          <HeadCustom></HeadCustom>
          <main>
              <div className="mainZone mla mra">
                <div className="pt20">
                    {data && data.map( w => <WantedElement {...w} key={w}/>)}
                </div>
              </div>
          </main>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${baseUrl}api/wanted`);
    const wanteds = await res.json();

    return { props: { wanteds } }
}

export default WantedList;