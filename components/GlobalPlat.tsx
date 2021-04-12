import { NextPage } from 'next';
import Link from 'next/link';

interface Plat {
  [key: string]: any,
}

const globalPlatName: Plat = {
    "mercari": "メルカリ",
    "rakuma": "ラクマ",
    "yahoo": "Yahoo オークション",
}

export const GlobalPlat = (data: any) => {

    const imgStyle = {
        backgroundImage: `url(${data.image})`,
    };

    const soldStyle = {
        backgroundColor: 'rgba(255, 255, 255, .6)',
    }

    return (
        <div className="alCen hrefBox mt5 scrapeTable mb20">
            <div className="frameContain" style={imgStyle}></div>
            <div className="w100 f14px noWrap ovHide mt5">{ data.name }</div>
            <div className="mla scrapePrice f14px">{ data.price }</div>
            <Link href={ data.href } passHref>
                {data.sold ? (
                  <a target="_new" className="hrefBoxIn flexCen" style={soldStyle}>
                    <p>SOLD OUT</p>
                  </a>
                ): (
                  <a target="_new" className="hrefBoxIn flexCen"></a>
                )
                }
            </Link>
        </div>
    )
}

interface Props {
  kind: string,
  datas: [key: number],
}

export const GlobalArea: NextPage<Props> = ({ kind, datas }) => {
    return (
      <div className="mt60 pb10">
        <h2 className="h3Size">{ globalPlatName[kind] }</h2>
        <div className={`${kind}Area anyPlatArea`}>
          {datas && datas.map((data, index) => <GlobalPlat {...data} key={`${kind}_${index}`}></GlobalPlat>)}
        </div>
      </div>
    )
}

interface Mess {
  mess: string;
}

export const MessageArea: NextPage<Mess> = ({ mess }) => {
    return (
        <div className="w100 mt60">
          <div className="mb10 aMess">
            <p>{ mess }</p>
          </div>
        </div>
    )
}

export default GlobalArea;