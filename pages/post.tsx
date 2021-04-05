import {  GetServerSideProps, NextComponentType, NextPage } from 'next';
import HeadCustom from './components/HeadCustom';
import Header from './components/Header';
import { postWanted } from './components/Helper';

import { useCurrentUser } from './hooks/useCurrentUser';
import { useRequireLogin } from './hooks/useRequireLogin';

interface Props {
    wanted?: {
        slug: string,
        want_name?: string,
        want_price?: number,
        picture?: string,
        plat: { [key: number]: object },
        want_intro?: string,
        is_gotten: boolean,
        user: { [key: number]: object },
        is_accept_offiial?: boolean,
    },
}

const PostPage: NextPage<Props> = (props) => {
    const { isAuthChecking, CurrentUser } = useCurrentUser();
    const user = CurrentUser;
    
    useRequireLogin();

    const wanted = props.wanted;

    console.log(wanted);

    const checkAll = (e) => {
        e.preventDefault();
        const allSelect = e.target.children;
        for (let i = 0; i < allSelect.length; i++) {
            // console.log(allSelect[i].children[0].value);
            // console.log(allSelect[i].children[0].checked);
            allSelect[i].children[0].checked = true;
        }
    }

    const submitWanted = (e) => {
        e.preventDefault();
        // console.log(e.target.want_name.value);
        // console.log(e.target.want_price.value);
        // console.log(e.target.wanted_plat);
        const platSelects = e.target.plat;
        let arrPlat = [];
        for (let i = 0; i < platSelects.length; i++) {
            if (platSelects[i].checked) {
                arrPlat.push(platSelects[i].value);
            }
        }
        postWanted(e, arrPlat, user);
    }

    return (
        <div>
            <HeadCustom></HeadCustom>
            <Header></Header>
            <div className="content">
              <main>
                <div className="mainZone mla mra">
                  <div className="mt20">
                    <h1 className="h2Size">{wanted ? '欲しいものを更新する' : '欲しいものを作成する' }</h1>
                    <div className="mt20">
                        <form className="field">
                          <label htmlFor="id_want_name">欲しいもの</label>
                          <input type="text" required id="id_want_name" name="want_name" maxLength={36} form="postData" defaultValue={wanted ? wanted.want_name : undefined }></input>
                        </form>
                        <form className="field mt20">
                          <label htmlFor="id_want_price">価格目安</label>
                          <input type="number" id="id_want_price" name="want_price" form="postData" defaultValue={wanted ? wanted.want_price : null}></input>
                        </form>
                        <div className="field mt20">
                          <label htmlFor="id_want_plat">プラットフォーム指定</label>
                          <div className="mt10">
                            <input type="submit" form="want_plat" name="plat_all" id="plat_all" value="全て"></input>
                            <label htmlFor="plat_all"></label>
                            <form onSubmit={checkAll} className="flexNormal mt5 alCen" id="want_plat">
                              <div className="mr20">
                                <input id="plat_mercari" name="plat" form="postData" value="Mercari" type="checkbox" />
                                <label htmlFor="plat_mercari">Mercari</label>
                              </div>
                              <div className="mr20">
                                <input id="plat_rakuma" name="plat" form="postData" value="Rakuma" type="checkbox" />
                                <label htmlFor="plat_rakuma">Rakuma</label>
                              </div>
                              <div className="mr20">
                                <input id="plat_yahoo" name="plat" form="postData" value="Yahoo" type="checkbox" />
                                <label htmlFor="plat_yahoo">Yahoo</label>
                              </div>
                            </form>
                          </div>
                          <form className="field mt20">
                            <label htmlFor="id_picture">画像</label>
                            <input form="postData" id="id_picture" type="file" name="picture" className="mt5" accept="image/*"></input>
                          </form>
                          <form className="field mt20">
                            <label htmlFor="id_want_intro">説明</label>
                            <textarea form="postData" name="want_intro" cols={40} rows={10} maxLength={800} id="id_want_intro"></textarea>
                          </form>
                        </div>
                        <form onSubmit={submitWanted} id="postData" className="field mt30">
                          <button type="submit" className="btFormat1 btNormal wM500px pt5 pb5">送信</button>
                        </form>
                    </div>
                  </div>
                </div>
              </main>
            </div>
        </div>
    )
}

export default PostPage;