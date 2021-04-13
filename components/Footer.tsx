import Link from 'next/link';

import 'emoji-mart/css/emoji-mart.css';
import { NextPage } from 'next';
// import { copyFile } from 'node:fs';

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Footer: NextPage = () => {
    return (
        <div>
          <footer>
            <div className="footerCon flexNormal">
              <div className="footerCopy pt20">
                <h5>2021 Maru-t</h5>
              </div>
              <div className="footerInq mla pt20">
                <Link href="/inquiry">
                  <h5 className="hrefBox">お問い合わせ</h5>
                </Link>
            </div>
            </div>
          </footer>
        </div>
    )
}

export default Footer;