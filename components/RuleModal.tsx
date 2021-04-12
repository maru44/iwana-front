import { NextPage } from "next";

interface ModalParams {
    open: boolean,
    closeFunc: any,
}

const RuleModal: NextPage<ModalParams> = (props) => {
    let parentOpen = props.open;
    
    if (parentOpen) {
        return (
            <div>
                <div className="modal" onClick={props.closeFunc}></div>
                <div className="modalConRule modalCon">
                  <div className="modalTitle">
                    <h2>利用規約<span className="floatR closeModal" onClick={props.closeFunc}>×</span></h2>
                  </div>
                  <div className="modalContents mt30">
                    <div>
                      <h3>会員登録について</h3>
                      <p className="mt5">
                        パスワードは各人が大切に保管してください。決して他人に教えたり等しないでください。<br />
                        こちらの独自の裁量で不適切なユーザー名や名前だと判断した場合、ユーザー名や名前の削除、ユーザーの凍結を行います。
                      </p>
                      <h3 className="mt10">利用規約の変更について</h3>
                      <p className="mt5">
                        必要に応じて、通知することなくいつでも規約を変更することがあります。これらの変更後に本サービスを利用した場合、変更した規約に同意したものとみなされます。
                      </p>          
                      <h3 className="mt10">禁止事項</h3>
                      <p className="mt5">このサービスの利用にあたり、以下の項目を禁止します:</p>
                      <ol className="ml30 mt10">
                        <li>サイトからデータまたはその他のコンテンツを体系的に取得し、当サービスからの書面による許可なしに、コンパイル、データベース、またはディレクトリを直接または間接的に作成またはコンパイルする。</li>
                        <li>未承諾の電子メールを送信する目的で電子的またはその他の手段でユーザーのユーザー名や電子メールアドレスを収集したり、自動化された手段または偽装してユーザーアカウントを作成したりするなど、サイトを不正に使用する。</li>
                        <li>コンテンツの使用またはコピーを防止または制限したり、サイトおよび/またはサイトに含まれるコンテンツの使用を制限する機能を含む、サイトのセキュリティ関連機能を回避、無効化、またはその他の方法で妨害すること。</li>
                        <li>サイトの不正なフレーミングまたはサイトへのリンクに従事する。</li>
                        <li>特にユーザーのパスワードなどの重要なアカウント情報を入手しようとする試みにおいて、私たちや他のユーザーをだます、詐欺、または誤解させる。</li>
                        <li>当サービスのサポートサービスを不適切に使用したり、乱用または不正行為の虚偽の報告を提出したりする。</li>
                        <li>スクリプトを使用してコメントやメッセージを送信したり、データマイニング、ロボット、または同様のデータ収集および抽出ツールを使用したりするなど、システムの自動使用に従事する。</li>
                        <li>サイト、またはサイトに接続されているネットワークまたはサービスに干渉し、混乱させ、または過度の負担をかけること。</li>
                        <li>別のユーザーまたはユーザーになりすまそうとしたり、別のユーザーのユーザー名を使用したりすること。</li>
                        <li>ユーザーを販売または譲渡する。</li>
                        <li>他の人に嫌がらせ、虐待、または危害を加えるために、サイトから取得した情報を使用する。</li>
                        <li>当サービスと競争するためのあらゆる努力の一環としてサイトを使用する、または収益を生み出すあらゆる努力または営利事業のためにサイトおよび/またはコンテンツを使用する。</li>
                        <li>サイトを構成する、またはサイトの一部を構成するソフトウェアを解読、逆コンパイル、逆アセンブル、またはリバースエンジニアリングすること。</li>
                        <li>サイトまたはサイトの一部へのアクセスを防止または制限するために設計されたサイトの対策を迂回する試み。</li>
                        <li>サイトの一部をあなたに提供することに従事している当サービスの従事者に嫌がらせ、迷惑、脅迫、または脅迫すること。</li>
                        <li>サイトのソフトウェアをコピーまたは改変すること。これには、Python、HTML、JavaScript、またはその他のコードが含まれますが、これらに限定されません。</li>
                        <li>ウイルス、トロイの木馬、または他のコンテンツのアップロードまたは送信（またはアップロードまたは送信の試み）、大文字の過剰な使用およびスパム行為（繰り返しテキストの継続的な投稿）を含み、当事者のサイトの中断のない使用および楽しむことを妨げる、またはサイトの使用、特徴、機能、操作、またはメンテナンスを変更、障害、混乱、変更、または妨害すること。</li>
                        <li>標準の検索エンジンまたはインターネットブラウザーの使用、使用、起動、開発、または配布の結果である場合を除き、サイトにアクセスするスパイダー、ロボット、チートユーティリティ、スクレーパー、オフラインリーダーなどの自動システム、または無許可のスクリプトやその他のソフトウェアを使用または起動する。</li>
                        <li>私たちおよびサイトの過度の非難、妨害、またはその他の傷害。</li>
                        <li>法や規制に抵触すること。</li>
                      </ol>
                      <h3 className="mt10">投稿のガイドライン</h3>
                      <p className="mt5">ユーザーが以下の規約のいずれかに違反した場合、事前の通知なしに、投稿されたデータを削除し、サービスの使用を制限し、ユーザーの登録を削除することがあります。<br /><br />
                        投稿に関する禁止事項は以下です。</p>
                      <ol className="ml30 mt10">
                        <li>不快で冒涜的な表現、暴力的な表現、人種差別的な表現、攻撃的で憎悪をふくんだ言葉;</li>
                        <li>宗教、人種、性別、年齢、性的嗜好、障害に基づく差別的な表現;</li>
                        <li>違反行為への言及;</li>
                        <li>虚偽または誤解を招く投稿;</li>
                      </ol>
                      <h3 className="mt10">プライバシーポリシー</h3>
                      <p className="mt5">レコメンドのために活動記録を取得する可能性があります。<br />
                        ユーザー情報が第三者に提供されたり、悪意を持って使用されることはありません。
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
    return <></>;
}

export default RuleModal;