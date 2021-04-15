import { NextPage } from 'next';

import { postWanted, updateWanted } from '../helper/HelperWanted';
import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';

import { User, Wanted, Plat } from '../types/any';

import Footer from './Footer';

interface Props {
    wanted: Wanted,
    user: User,
}

const Post: NextPage<Props> = (props) => {
    const wanted = props.wanted;
    const user = props.user;

    const checkAll = (e: any) => {
        e.preventDefault();
        const allSelect = e.target.children;
        for (let i = 0; i < allSelect.length; i++) {
            allSelect[i].children[0].checked = true;
        }
    }

    const submitWanted = (e: any) => {
        e.preventDefault();
        const platSelects = e.target.plat;
        let arrPlat = [];
        for (let i = 0; i < platSelects.length; i++) {
            if (platSelects[i].checked) {
                arrPlat.push(platSelects[i].value);
            }
        }
        postWanted(e, arrPlat, user);
    }

    const editWanted = (e: any) => {
        e.preventDefault();
        const platSelects = e.target.plat;
        let arrPlat = [];
        for (let i = 0; i < platSelects.length; i++) {
            if (platSelects[i].checked) {
                arrPlat.push(platSelects[i].value);
            }
        }
        updateWanted(e, arrPlat, user);
    }

    // let initialPlatList: string[];
    let initialPlatList: string[]  = [];
    if (wanted) {
      const initialPlat: [Plat] = wanted.plat;
      for (let i = 0; i < initialPlat.length; i++) {
        initialPlatList.push(initialPlat[i].name);
      }
    }

    return (
        <div>
            <HeadCustom></HeadCustom>
            <Header></Header>
            <div className="content">
              <main>
                <div className="mainZone mla mra">
                  <div className="pt30">
                    <h1 className="h2Size">{wanted ? '欲しいものを更新する' : '欲しいものを作成する' }</h1>
                    <div className="mt20">
                        <form className="field">
                          <label htmlFor="id_want_name">欲しいもの</label>
                          <input type="text" required id="id_want_name" name="want_name" maxLength={36} form="postData" defaultValue={wanted ? wanted.want_name: undefined }></input>
                        </form>
                        <form className="field mt20">
                          <label htmlFor="id_want_price">価格目安</label>
                          <input type="number" id="id_want_price" name="want_price" form="postData" defaultValue={wanted ? wanted.want_price: undefined }></input>
                        </form>
                        <div className="field mt20">
                          <label htmlFor="id_want_plat">プラットフォーム指定</label>
                          <div className="mt10">
                            <input type="submit" form="want_plat" name="plat_all" id="plat_all" value="全て"></input>
                            <label htmlFor="plat_all"></label>
                              <form onSubmit={checkAll} className="flexNormal mt5 alCen" id="want_plat">
                              <div className="mr20">
                                {wanted && initialPlatList.includes('Mercari') ? 
                                  <input id="plat_mercari" name="plat" form="postData" value="Mercari" type="checkbox" defaultChecked={true} /> :
                                  <input id="plat_mercari" name="plat" form="postData" value="Mercari" type="checkbox" />
                                }
                                <label htmlFor="plat_mercari">Mercari</label>
                              </div>
                              <div className="mr20">
                                {wanted && initialPlatList.includes('Rakuma') ?
                                  <input id="plat_rakuma" name="plat" form="postData" value="Rakuma" type="checkbox" defaultChecked={true} /> :
                                  <input id="plat_rakuma" name="plat" form="postData" value="Rakuma" type="checkbox" />
                                }
                                <label htmlFor="plat_rakuma">Rakuma</label>
                              </div>
                              <div className="mr20">
                                {wanted && initialPlatList.includes('Yahoo') ?
                                  <input id="plat_yahoo" name="plat" form="postData" value="Yahoo" type="checkbox" defaultChecked={true} /> :
                                  <input id="plat_yahoo" name="plat" form="postData" value="Yahoo" type="checkbox" />
                                }
                                <label htmlFor="plat_yahoo">Yahoo</label>
                              </div>
                            </form>
                          </div>
                          <form className="field mt20">
                            {wanted && 
                              <img src={`${wanted.picture}`} className="wM500px" />
                            }
                            <label htmlFor="id_picture">画像</label>
                            <input form="postData" id="id_picture" type="file" name="picture" className="mt5" accept="image/*"></input>
                          </form>
                          <form className="field mt20">
                            <label htmlFor="id_want_intro">説明</label>
                            <textarea form="postData" name="want_intro" cols={40} rows={10} maxLength={800} id="id_want_intro" defaultValue={wanted ? wanted.want_intro: undefined }></textarea>
                          </form>
                        </div>
                        {wanted ? (
                            <form onSubmit={editWanted} id="postData" className="field mt30" data-wanted={ wanted.slug }>
                              <button type="submit" className="btFormat1 btNormal wM500px pt5 pb5">編集する</button>
                            </form>
                        ) : (
                            <form onSubmit={submitWanted} id="postData" className="field mt30">
                              <button type="submit" className="btFormat1 btNormal wM500px pt5 pb5">作成する</button>
                            </form>
                        )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Post;