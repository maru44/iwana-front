import { NextComponentType, NextPageContext } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from 'emoji-mart';

/*
interface wanted {
  slug: string,
  want_name: string,
  want_intro: string,
  plat: { [key: number]: any[]},
  is_gotten: boolean,
}
*/

interface Props {
  slug: string,
  want_name: string,
  want_intro: string,
  plat: { [key: number]: object},
  is_gotten: boolean,
}

type user_pk = string;

const WantedElement: NextComponentType<NextPageContext, {}, Props> = (wanted) => {

    const [ is_gotten, SetGotten ] = useState(wanted.is_gotten);

    return (
      <div>
        <article className="mb20 aPost flexNormal hrefBox">
          <div className="frameContain" ></div>
          <div className="ml20 flex1">
            <h2 className="postTitle h4Size">{ wanted.want_name }</h2>
            <p className="mt5 postDet">
              { wanted.want_intro }
            </p>
            <div className="platArea">
              {wanted.plat.map( p => <span className={p.slug} key={p.name}>{ p.name }</span>)}
            </div>
          </div>
          <div className="ml10 mr10">
            <div className="is_gotten">
                {is_gotten ? (<Emoji emoji="partying_face" size={32}></Emoji>) : ''}
            </div>
          </div>
          {/*
            <a class="hrefBoxIn" href="{% url 'detail' post.slug %}"></a>
          */}
          <Link as={`/wanted/${wanted.slug}`} href="/wanted/[slug]" passHref>
            <a className="hrefBoxIn"></a>
          </Link>
        </article>
      </div>
    )
}

export default WantedElement;