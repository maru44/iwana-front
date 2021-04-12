import { NextPage } from "next";
import Link from 'next/link';

import HeadCustom from "../../../components/HeadCustom";
import Header from "../../../components/Header";
import Footer from '../../../components/Footer';

const Temp: NextPage = () => {
    return (
      <div>
        <HeadCustom></HeadCustom>
        <Header></Header>
        <div className="content">
          <main>
            <div className="mainZone mla mra">
              <div className="pt30">
                <h1 className="h2Size">仮登録が完了しました</h1>
                <p className="pt10">
                  本登録用のURLが記載されたメールを送信しました。<br/>
                  24時間以内にURLにアクセスして本登録を完了してください。
                </p>
              </div>
            </div>
          </main>
        </div>
        <Footer></Footer>
      </div>
    )
}

export default Temp;
