import { updateProfile } from '../../components/Helper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import HeadCustom from '../../components/HeadCustom';
import Header from '../../components/Header';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useRequireLogin } from '../../hooks/useRequireLogin';

// for logout
import { useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../../states/CurrentUser';
import { fetchCurrentUser } from '../../components/Helper';

export const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Profile: NextPage = () => {

    const { isAuthChecking, CurrentUser } = useCurrentUser();
    
    useRequireLogin();

    const user = CurrentUser;
    const router = useRouter();

    // logout
    const setCurrentUser = useSetRecoilState(CurrentUserState);
    const logout = () => {
      destroyCookie(null, 'iwana_user_token');
      setCurrentUser(null);
      router.push('/');
    }

    // update profile
    const updating = (e: any) => {
      e.preventDefault();
      updateProfile(e, CurrentUser);
    }

    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header></Header>
          <div className="content">
            <main>
              <div className="mainZone mla mra">
                <div className="pt20">
                  <h1 className="h3Size">プロフィール変更</h1>
                  <form onSubmit={updating} className="mt20" method="POST" encType="multipart/form-data">
                    <div className="field">
                      { isAuthChecking && "取得中" }
                      { CurrentUser &&
                        <div>
                          <div className="field">
                            <label htmlFor="id_name">表示名</label>
                            <input name="name" type="text" id="id_name" defaultValue={user.name}>
                            </input>
                          </div>
                          <div className="field mt20">
                            <label htmlFor="id_intro">プロフィール画像</label>
                            <div className="frame"
                             style={{ backgroundImage: `url(${backEndUrl}${user.picture})`,
                               width: `200px`, height: `200px`, paddingTop: 0 }}></div>
                            <input type="file" name="picture" className="mt10" accept="image/*"></input>
                          </div>
                          <div className="field mt20">
                            <label htmlFor="id_intro">紹介文</label>
                            <textarea id="id_intro" name="intro" rows={5} defaultValue={user.intro}></textarea>
                          </div>
                        </div> }
                    </div>
                    <div className="mt30">
                      <button type="submit" className="btFormat1 pt5 pb5 btNormal wM500px">
                        変更する
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt20">
                  <div className="flexNormal">
                    <a onClick={} className="pt10 pb10 mt5 actve logoutStart">
                      ログアウト
                    </a>
                  </div>
                  <div onClick={} className="modal off"></div>
                  <div className="modalConLogout off modalCon">
                    <div>
                      <h3>ログアウトしますか？</h3>
                    </div>
                    <div className="mt25 flexNormal spBw">
                      <button onClick={logout} className="w48 h50px btFormat1 flexCen hrefBox">
                        <b>ログアウト</b>
                      </button>
                      <button onClick={} className="w48 h50px closeModal flexCen btNegative hrefBox">
                        <b>キャンセル</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
    )
}

export default Profile;