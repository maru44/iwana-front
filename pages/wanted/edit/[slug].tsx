import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import { Wanted } from '../../../types/any';

import Post from '../../../components/Post';
import Error from '../../../components/Error';

import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { useRequireLogin } from '../../../hooks/useRequireLogin';

export const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Props {
  wanted: Wanted,
  statusCode: number,
}

interface Params extends ParsedUrlQuery {
  slug: string,
}

const Edit: NextPage<Props> = props => {
    const status = props.statusCode;
    if (status !== 200) {
      return (
        <Error status={status}></Error>
      )
    }

    const { isAuthChecking, CurrentUser } = useCurrentUser();
    const user = CurrentUser;

    const wanted = props.wanted;

    return (
        <>
          <Post user={user} wanted={wanted}></Post>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (ctx) => {
    const slug = ctx.params.slug;
    const res = await fetch(`${backEndUrl}/api/wanted/${slug}`);
    const wanted = await res.json();
    const status = res.status;
  
    return {
      props: {
        wanted: wanted,
        statusCode: status,
      }
    }
}

export default Edit;
