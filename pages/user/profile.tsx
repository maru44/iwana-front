import { getCookie, getCsrfOfDjango, getJwtToken } from '../components/Helper';
import { NextPage } from 'next';

import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import { useCurrentUser } from '../hooks/useCurrentUser';
import { useRequireLogin } from '../hooks/useRequireLogin';

const baseUrl = process.env.BACKEND_URL;

export const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Profile: NextPage = () => {

    const { isAuthChecking, CurrentUser } = useCurrentUser();
    
    useRequireLogin();

    const user = CurrentUser;

    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header></Header>
          <div className="content">
            <main>
              <div className="mainZone mla mra">
                <div className="pt20">
                  <h1 className="h3Size">プロフィール変更</h1>
                  <form className="mt20" method="POST" encType="multipart/form-data">
                    <div className="field">
                      { isAuthChecking && "取得中" }
                      { CurrentUser &&
                        <div>
                          <div className="field">
                            <label htmlFor="id_name">表示名</label>
                              <input type="text" id="id_name" defaultValue={user.name} />
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
                            <textarea id="id_intro" rows={5} defaultValue={user.intro}></textarea>
                          </div>
                        </div> }
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
    )
}

export default Profile;