import { NextPage, GetServerSideProps } from "next";
import { ParsedUrlQuery } from 'node:querystring';
import { parseCookies, setCookie } from 'nookies';

import Footer from "../../../components/Footer";
import HeadCustom from "../../../components/HeadCustom";
import Header from "../../../components/Header";

import { fetchCurrentUser } from "../../../helper/HelperUser";

import { useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../../../states/CurrentUser';

const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
    data: any;
}

const UserComplete: NextPage<Props> = (props) => {

    const setCurrentUser = useSetRecoilState(CurrentUserState);

    console.log(props.data);
    const cookies = parseCookies();
    const tk = cookies['iwana_user_token'];
    if (props.data['status'] === 200) {
        async () => {
            const res = await fetchCurrentUser(tk);
            const CurrentUser = await res.json();
            setCurrentUser(CurrentUser);
        }
    }
    
    return (
        <div>
            <HeadCustom></HeadCustom>
            <Header></Header>
            <div className="content">
                <main>
                  <div className="mainZone mla mra"></div>
                </main>
            </div>
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
    const res = await fetch(`${backEndUrl}/api/user/register/${token}`);
    const ret = await res.json();

    // setCookie(null, 'iwana_user_token', ret['access']);
    // setCookie(null, 'iwana_refresh', ret['refresh']);

    return { props: {data: ret}};
}

export default UserComplete;