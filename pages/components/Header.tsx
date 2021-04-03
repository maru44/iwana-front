import Link from 'next/link';
import { userInfo } from 'node:os';

import { useCurrentUser } from '../hooks/useCurrentUser';

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Header = () => {
    const { isAuthChecking, CurrentUser } = useCurrentUser();

    return (
        <header>
          <div className="headerCon w100 alCen flexNormal">
            <div className="headerTop hrefBox">
              Iwana
              <Link href="/wanted" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
            <div className="headerUserArea">
              { CurrentUser ? (
                  <div className="imgCircle mla hrefBox" style={{ backgroundImage: `url(${baseUrl}${CurrentUser.picture})`}}>
                    <a href="" className="hrefBoxIn"></a>
                  </div>
                ) : (
                <div className="halfCircle mla hrefBox flexCen pl5 pr5">
                  ログイン
                  <Link href="/user/login" passHref>
                    <a className="hrefBoxIn"></a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
    )
}

export default Header;