import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import HeadCustom from "../../../components/HeadCustom";
import Header from "../../../components/Header";
import RuleModal from "../../../components/RuleModal";
import Footer from "../../../components/Footer";

import { fetchRegist, getJwtToken, registed } from "../../../helper/HelperUser";
import { MessageArea } from "../../../components/Message";

const Register: NextPage = () => {
  const [accept, setAccept] = useState(false);
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState<string>(null);
  const router = useRouter();

  const changeAccept = (e: any) => {
    if (e.target.checked) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  };

  const registerStart = async (e: any) => {
    e.preventDefault();
    const ret = await fetchRegist(e);
    if (ret && ret["status"] === 200) {
      try {
        const getJwt = await getJwtToken(
          {
            username: e.target.username.value,
            password: e.target.password.value,
          },
          null
        );
        const deactivate = await registed();
        await router.push("/user/register/temp/");
      } catch {
        setMess("ユーザーの作成に失敗しました。");
        // @TODO user 作成失敗後の処理も後で追加
      }
    } else {
      console.log(ret);
      setMess("ユーザーの作成に失敗しました。");
    }
  };

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <HeadCustom></HeadCustom>
      <Header></Header>
      <div className="content">
        <main>
          <div className="mainZone mla mra">
            <div className="pt30">
              <h1 className="h2Size">会員登録</h1>
              <MessageArea mess={mess}></MessageArea>
              <form className="pt10" onSubmit={registerStart} method="POST">
                <div className="field">
                  <label htmlFor="id_username">ユーザー名</label>
                  <input
                    type="text"
                    name="username"
                    maxLength={24}
                    autoFocus
                    required
                    id="id_username"
                  />
                </div>
                <div className="field mt10">
                  <label htmlFor="id_email">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    maxLength={254}
                    required
                    id="id_email"
                  />
                </div>
                <div className="field mt10">
                  <label htmlFor="id_password">パスワード</label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    required
                    id="id_password"
                  />
                </div>
                <div className="field mt10">
                  <label htmlFor="id_password2">確認用パスワード</label>
                  <input
                    type="password"
                    name="password2"
                    autoComplete="new-password"
                    required
                    id="id_password2"
                  />
                </div>
                <div className="mt30">
                  <div>
                    <input
                      id="kiyakuInput"
                      onClick={changeAccept}
                      className="mr20"
                      type="checkbox"
                    />
                    <a className="active" id="kiyakuOpen" onClick={openModal}>
                      利用規約
                    </a>
                    に同意します。
                  </div>
                  {accept ? (
                    <button
                      className="pt5 mt20 pb5 wM500px btFormat1 btNormal"
                      id="regiSub"
                      type="submit"
                    >
                      会員登録
                    </button>
                  ) : (
                    <button
                      className="pt5 mt20 pb5 wM500px btFormat1 btNormal"
                      id="regiSub"
                      type="submit"
                      disabled
                    >
                      会員登録
                    </button>
                  )}
                </div>
              </form>
              <h4 className="mt20 textCen wM500px">---- ログイン ----</h4>
              <div className="mt10">
                <button className="pt5 pb5 wM500px btFormat1 btNormal hrefBox">
                  ログイン
                  <Link href="/user/login/" passHref>
                    <a className="hrefBoxIn"></a>
                  </Link>
                </button>
              </div>
              {/*
                    <h4 className="mt30 textCen wM500px">---- Social Login ----</h4>
                    <div className="mt10">
                      <button className="googleLogin btNormal wM500px hrefBox pt5 pb5">
                        Googleでログイン
                        <Link href={`${baseUrl}/auth/login/google-oauth2/`} prefetch={false}>
                          <a className="hrefBoxIn"></a>
                        </Link>
                      </button>
                    </div>
              */}
            </div>
            <RuleModal open={open} closeFunc={closeModal}></RuleModal>
          </div>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Register;
