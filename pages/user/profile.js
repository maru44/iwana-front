import { getCookie, getCsrfOfDjango, getJwtToken } from '../components/Helper';
import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';
import { useCurrentUser } from '../hooks/useCurrentUser';

const baseUrl = "http://localhost:8000/";

const Profile = () => {

    const { isAuthChecking, CurrentUser } = useCurrentUser();

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
                      { !CurrentUser && '非ログイン' }
                      { CurrentUser && CurrentUser }
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        </div>
    )
}

/*
export async function getServerSideProps() {
    const jwt_token = getCookie('iwana_user_token');

    console.log(jwt_token);
    const user = jwt_token;

    //const res = await fetch(`${baseUrl}api/user/profile/${jwt_token}`);
    //const user = await res.json();

    return { props: { user } }
}
*/

export default Profile;