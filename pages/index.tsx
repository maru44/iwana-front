import { GetServerSideProps, NextComponentType, NextPage } from "next";

import { useState } from "react";

import HeadCustom from "../components/HeadCustom";
import Header from "../components/Header";
import { GlobalArea } from "../components/GlobalPlat";
import Footer from "../components/Footer";
import { MessageArea } from "../components/Message";

import { Search, SearchList } from "../types/any";
import { baseUrl } from "../helper/Helper";

const scrapeEndPoint = `${baseUrl}/api/scrape/`;

type searchResult = SearchList;

const fetchScrape = async (e: any) => {
  e.preventDefault();

  const target = e.target;

  if (target.keyword.value == null || target.keyword.value == "") {
    const res = "need";
    return res;
  }

  const res = await fetch(
    `${scrapeEndPoint}?keyword=${target.keyword.value}&sold=${target.sold.value}&category=${target.category.value}`
  );
  let ret = await res.json();

  if (ret["mercari"] == [] && ret["rakuma"] == [] && ret["yahoo"] == []) {
    ret = "条件に合致する商品がありませんでした。";
    return ret;
  }

  return ret;
};

// component
export const Home: NextPage = () => {
  const [mess, setSearch] = useState<string>(null);
  const [data, setData] = useState<searchResult>(null);

  const searching = async (e: any) => {
    setSearch("検索中です。検索には5秒前後の時間がかかります。");
    const dd = await fetchScrape(e);
    typeof dd == "string" ? setSearch(dd) : setData(dd), setSearch(null);
  };

  return (
    <div>
      <HeadCustom></HeadCustom>
      <Header what={2}></Header>
      <div className="content">
        <main>
          <div className="mainZone mla mra">
            <div className="pt30">
              <h1 className="h2Size">商品検索</h1>
              <p className="pt10">
                ここではメルカリ、ラクマ、ヤフオクで一斉検索ができます。
                <br />
                yahooオークションの絞り込みは未実装です。
              </p>
            </div>
            <form onSubmit={searching} className="mb60">
              {/*<input type="hidden" name="csrfmiddlewaretoken" value={ csrftoken } />*/}
              <div className="pt40 field">
                <label htmlFor="globalStr">
                  検索ワード<span className="ml20 colorR">***</span>
                </label>
                <input
                  name="keyword"
                  type="text"
                  id="globalStr"
                  placeholder="キーワード"
                  required
                />
              </div>
              <div className="mt15 field">
                <label htmlFor="sold_select">販売状況</label>
                <select id="sold_select" name="sold">
                  <option value="0" selected>
                    全て
                  </option>
                  <option value="2">販売中</option>
                  <option value="1">売り切れ</option>
                </select>
              </div>
              <div className="mt15 field">
                <label htmlFor="category_select">カテゴリ</label>
                <select id="category_select" name="category">
                  <option value="0" selected>
                    ---------
                  </option>
                  <option value="1">レディース</option>
                  <option value="2">メンズ</option>
                  <option value="3">ベビー・キッズ</option>
                  <option value="4">インテリア・住まい・小物</option>
                  <option value="5">本・音楽・ゲーム</option>
                  <option value="6">おもちゃ・ホビー・グッズ</option>
                  <option value="7">コスメ・美容</option>
                  <option value="8">楽器</option>
                  <option value="9">チケット</option>
                  <option value="10">スマホ・家電・カメラ</option>
                  <option value="11">スポーツ・レジャー</option>
                  <option value="12">自動車・バイク</option>
                  <option value="13">ハンドメイド</option>
                  <option value="14">食料品</option>
                  <option value="15">飲み物</option>
                  <option value="16">酒</option>
                  <option value="17">その他</option>
                </select>
              </div>
              <button
                id="globalBtn"
                type="submit"
                className="mt30 btFormat1 btNormal wM500px flexCen pt5 pb5"
              >
                検索
              </button>
            </form>
            <MessageArea mess={mess}></MessageArea>
            {data && data.mercari && (
              <GlobalArea kind="mercari" datas={data.mercari}></GlobalArea>
            )}
            {data && data.rakuma && (
              <GlobalArea kind="rakuma" datas={data.rakuma}></GlobalArea>
            )}
            {data && data.yahoo && (
              <GlobalArea kind="yahoo" datas={data.yahoo}></GlobalArea>
            )}
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
