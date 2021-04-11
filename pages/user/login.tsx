import { fetchCurrentUser, getCsrfOfDjango, getJwtToken } from '../../components/Helper';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

import HeadCustom from '../../components/HeadCustom';
import Header from '../../components/Header';
import { useSetRecoilState } from 'recoil';

import { useRequireAnonymous } from '../../hooks/useRequireAnonymous';
import { CurrentUserState } from '../../states/CurrentUser';
import Footer from '../../components/Footer';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {

    useRequireAnonymous();
    // login function
    const setCurrentUser = useSetRecoilState(CurrentUserState);
    const router = useRouter();

    const fetchLogin = async (e: any) => {
      e.preventDefault();
      const target = e.target;
      let nextPage: string = null;
  
      const postData = {
        "username": target.username.value,
        "password": target.password.value,
      }

      if (router.query.next) {
        nextPage = router.query.next.toString();
      }

      const data = await getJwtToken(postData, nextPage);

      // const CurrentUser = await fetchCurrentUser(data['token']);
      const CurrentUser = await fetchCurrentUser(data['access']);
      setCurrentUser(CurrentUser);

      /*
      if (data.token) {
        if (nextPage) {
          router.push(nextPage);
        } else {
          router.push('/');
        }
      }
      */
    }
    
    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header></Header>
          <div className="content">
            <main>
              <div className="mainZone mla mra">
                <div className="pt40">
                  <h1 className="h2Size">ログイン</h1>
                  <form onSubmit={fetchLogin} className="pt10">
                    <div className="field">
                      <label htmlFor="id_uername">ユーザー名</label>
                      <input type="text" maxLength={24} required id="id_username" name="username" />
                    </div>
                    <div className="mt10 field">
                      <label htmlFor="id_password">パスワード</label>
                      <input type="password" name="password" autoComplete="current-password" required id="id_password" />
                    </div>
                    <div className="mt30">
                      <button className="pt5 pb5 wM500px btFormat1 btNormal" type="submit">
                        ログイン
                      </button>
                    </div>
                  </form>
                  <h4 className="mt20 textCen wM500px">---- 会員登録はこちら ----</h4>
                  <div className="mt10">
                    <button className="pt5 pb5 wM500px btNormal btFormat1 hrefBox">
                      会員登録
                      <Link href="/user/register" passHref>
                        <a className="hrefBoxIn"></a>
                      </Link>
                    </button>
                  </div>
                  <h4 className="mt30 textCen wM500px">---- Social Login ----</h4>
                  <div className="mt10">
                    <button className="googleLogin btNormal wM500px hrefBox pt5 pb5">
                      Googleでログイン
                      <Link href={`${baseUrl}/auth/login/google-oauth2/`} prefetch={false}>
                        <a className="hrefBoxIn"></a>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <Footer></Footer>
        </div>
    )
}

export default Login;