import { NextPage } from 'next';
import HeadCustom from './HeadCustom';
import Header from './Header';

interface Props {
    status: number,
}

interface intKeyObject {
    [key: string]: string;
}

const errorMessageList: intKeyObject = {
    "404": "Not Found" ,
    "403": "アクセス権がありません" ,
}

const Error: NextPage<Props> = props => {
    const status = props.status;
    let message = "エラーが発生しました";
    if (status in errorMessageList) {
        message = errorMessageList[status];
    }
    
    return (
        <div>
          <HeadCustom></HeadCustom>
          <Header what={1}></Header>
            <main className="">
              <div className="content flexCol alCen jsCen errorMain textCen">
                <h1>{ status }</h1>
                <div className="mt30 preWrap">
                    <p>{ message }</p>
                </div>
              </div>
            </main>
        </div>
    )
}

export default Error;