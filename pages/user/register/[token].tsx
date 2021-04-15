import { NextPage, GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'node:querystring';
import { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';

import Footer from "../../../components/Footer";
import HeadCustom from "../../../components/HeadCustom";
import Header from "../../../components/Header";

import { useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../../../states/CurrentUser';

import { fetchCurrentUser } from "../../../helper/HelperUser";
import { baseUrl } from '../../../helper/Helper';

interface Props {
    data: {[key: string]: any};
}

const UserComplete: NextPage<Props> = (props) => {

    const setCurrentUser = useSetRecoilState(CurrentUserState);
    const router = useRouter();
    
    const cookies = parseCookies();
    const tk = cookies['iwana_user_token'];
    if (props.data['status'] === 200) {
        async () => {
            const res = await fetchCurrentUser(tk);
            const CurrentUser = await res.json();
            setCurrentUser(CurrentUser);
        }
    }

    useEffect(() => {
        router.push('/wanted');
    })
    
    return (
        <div>
            <HeadCustom></HeadCustom>
            <Header></Header>
            <main className="">
              <div className="content flexCol alCen jsCen errorMain textCen">
                <h1>{ props.data['status'] }</h1>
                <div className="mt30 preWrap">
                    <p>{ props.data['message'] }</p>
                </div>
              </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

// ssr query params
interface Params extends ParsedUrlQuery {
    token: string,
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (ctx) => {
    const token = ctx.params.token;
    const res = await fetch(`${baseUrl}/api/user/register/${token}`);
    const ret = await res.json();

    // setCookie(null, 'iwana_user_token', ret['access']);
    // setCookie(null, 'iwana_refresh', ret['refresh']);

    return { props: {data: ret}};
}

export default UserComplete;