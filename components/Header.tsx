import Link from 'next/link';
import { useRef } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface props {
  what?: number,
}

const Header = (props: props) => {
    const { isAuthChecking, CurrentUser } = useCurrentUser();
    const tabList = useRef(null);

    if (props.what) {
      if (tabList.current !== null) {
        tabList.current.children[props.what - 1].classList.add('now');
      }
    }

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
                  <div className="imgCircle mla hrefBox" style={{ backgroundImage: `url(${CurrentUser.picture})`}}>
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
            <div className="circle hrefBox flexCen ml20 toPost">
              <Emoji emoji="pencil" size={24}></Emoji>
              <Link href="/post" passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
          </div>
          <div className="headerCon2 w100 alCen flexNormal" ref={tabList}>
            <div className="hrefBox flexCen">
              <b>みんなの欲しいもの</b>
              <Link href='/wanted' passHref>
                <a className="hrefBoxIn"></a>
              </Link>
            </div>
            <div className="hrefBox flexCen">
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