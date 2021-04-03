import { getCsrfOfDjango, getJwtToken } from '../components/Helper';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import { useRequireAnonymous } from '../hooks/useRequireAnonymous';

const isBrowser = () => typeof window !== 'undefined';

const fetchLogin = async e => {

  e.preventDefault();

  const target = e.target;
  let nextPage = null;
  
  const postData = {
    "username": target.username.value,
    "password": target.password.value,
  }

  if (target.next.value !== null || target.next.value !== "") {
      nextPage = target.next.value;
  }

  const data = await getJwtToken(postData, nextPage);

  setCookie(null, 'iwana_user_token', data['token'], {
    maxAge: 365 * 24 * 60 * 60,
  });

  return data;
}

const Login = () => {

    useRequireAnonymous();
    
    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header></Header>
          <div className="content">
            <main>
              <div className="mainZone mla mra">
                <div className="pt40">
                  <h3>ログイン</h3>
                  <form onSubmit={fetchLogin}>
                    <input type="hidden" name="next"/>
                    <div className="field">
                      <label htmlFor="id_uername">ユーザー名</label>
                      <input type="text" maxLength={24} required id="id_username" name="username" />
                    </div>
                    <div className="mt10 field">
                      <label htmlFor="id_password">パスワード</label>
                      <input type="password" name="password" autoComplete="current-password" required id="id_password" />
                    </div>
                    <div className="mt10">
                      <button className="pt5 pb5 wM500px btFormat1 btNormal" type="submit">
                        ログイン
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
    )
}

export default Login;