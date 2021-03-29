import Link from 'next/link';

const WantedElement = wanted => {
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
              {wanted.plat.map( p => <span>{ p.name }</span>)}
            </div>
          </div>
          <div className="ml10 mr10">
            <div className="is_gotten">
                {wanted.is_gotten ? '&#10004;' : ''}
            </div>
          </div>
          {/*
            <a class="hrefBoxIn" href="{% url 'detail' post.slug %}"></a>
          */}
          <Link as={`/wanted/${wanted.slug}`} href="/wanted/[slug]" passHref>
            <a class="hrefBoxIn" href="{% url 'detail' post.slug %}"></a>
          </Link>
        </article>
      </div>
    )
}

export default WantedElement;