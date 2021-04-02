import Link from 'next/link';

const Header = () => {
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
              <div className="circle mla hrefBox flexCen pl5 pr5">
                ログイン
                <Link href="/user/login" passHref>
                  <a className="hrefBoxIn"></a>
                </Link>
              </div>
            </div>
          </div>
        </header>
    )
}

export default Header;