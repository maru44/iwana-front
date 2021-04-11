import { useRouter } from 'next/router';

import HeadCustom from '../components/HeadCustom';
import Header from '../components/Header';
import DelWantedComponent from '../components/DelWantedComponent';
import { fetchInquiry } from '../components/Helper';
import Footer from '../components/Footer';

import { headData } from '../types/any';

const Inquiry = () => {
    const router = useRouter();
    const headData: headData = {
      ogtypeWebsite: 'article',
      ogtitle: `Iwana - お問い合わせ`,
      ogdescription: `Iwanaへのお問い合わせ、ご要望はこちらからお願いいたします。`,
      title: `Iwana - お問い合わせ`,
    }

    const postInq = async (e: any) => {
        e.preventDefault();
        const ret = await fetchInquiry(e);
        if (ret && ret['status'] === 200) {
            router.push('/');
        }
    }

    return (
        <div>
          <HeadCustom {...headData}></HeadCustom>
          <Header></Header>
          <div className="content">
            <main>
              <div className="mainZone mla mra">
                <div className="pt30">
                  <h1 className="h2Size">お問い合わせ</h1>
                  <p className="pt20">お問い合わせやご要望はこちらからお願いいたします。</p>
                  <div className="mt20">
                    <form method="post" onSubmit={ postInq }>
                      <div className="field">
                        <label htmlFor="id_name">お名前</label>
                        <input type="text" required maxLength={36} id="id_name" name="inq_name" />
                      </div>
                      <div className="field mt10">
                          <label htmlFor="id_mail">メールアドレス</label>
                          <input type="email" required id="id_mail" name="inq_mail" />
                      </div>
                      <div className="field mt10">
                        <label htmlFor="id_cat">項目</label>
                        <input type="text" id="id_cat" name="inq_category" maxLength={36} placeholder="任意" />
                      </div>
                      <div className="field mt10">
                        <label htmlFor="id_content">内容</label>
                        <textarea rows={5} required id="id_content" name="inq_content"></textarea>
                      </div>
                      <div className="field mt20">
                          <button type="submit" className="btNormal btFormat1 btSize1">送信</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <Footer></Footer>
        </div>
    )
}

export default Inquiry;