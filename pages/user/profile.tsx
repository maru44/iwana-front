import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import HeadCustom from '../../components/HeadCustom';
import Header from '../../components/Header';
import LogoutModal from '../../components/LogoutModal';
import Footer from '../../components/Footer';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useRequireLogin } from '../../hooks/useRequireLogin';

import { updateProfile } from '../../helper/HelperUser';

// for logout
import { useSetRecoilState } from 'recoil';
import { CurrentUserState } from '../../states/CurrentUser';

const Profile: NextPage = () => {

    const { isAuthChecking, CurrentUser } = useCurrentUser();
    
    useRequireLogin();

    const user = CurrentUser;
    const router = useRouter();

    const [open, setOpen] = useState(false);

    // logout
    const setCurrentUser = useSetRecoilState(CurrentUserState);
    const logout = () => {
      destroyCookie(null, 'iwana_user_token');
      destroyCookie(null, 'iwana_refresh');
      setCurrentUser(null);
      router.push('/');
    }

    // update profile
    const updating = (e: any) => {
      e.preventDefault();
      updateProfile(e, CurrentUser);
    }

    const logoutStart = () => {
      setOpen(true);
    }

    const logoutCancel = () => {
      setOpen(false);
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
                             style={{ backgroundImage: `url(${user.picture})`,
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
                    <a onClick={logoutStart} className="pt10 pb10 mt5 actve logoutStart hrefBox">
                      ログアウト
                    </a>
                  </div>
                  <LogoutModal open={open} closeFunc={logoutCancel} logoutFunc={logout}></LogoutModal>
                </div>
              </div>
            </main>
          </div>
          <Footer></Footer>
        </div>
    )
}

export default Profile;