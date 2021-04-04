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
              <Link href="/" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
            <div className="headerUserArea">
              { CurrentUser ? (
                  <div className="imgCircle mla hrefBox" style={{ backgroundImage: `url(${baseUrl}${CurrentUser.picture})`}}>
                    <Link as={`/wanted/u/${CurrentUser.username}`} href="/wanted/u/[username]" passHref>
                      <a className="hrefBoxIn"></a>
                    </Link>
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
          <div className="headerCon2 w100 alCen flexNormal">
            <div className="hrefBox flexCen">
              <b>みんなの欲しいもの</b>
              <Link href='/wanted' passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
            <div className="ml20 hrefBox flexCen">
              <b>グローバル検索</b>
              <Link href='/' passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Header;