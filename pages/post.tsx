import {  GetServerSideProps, NextComponentType, NextPage } from 'next';

import Post from '../components/Post';

import { useCurrentUser } from '../hooks/useCurrentUser';
import { useRequireLogin } from '../hooks/useRequireLogin';

const PostPage: NextPage = () => {
    const { isAuthChecking, CurrentUser } = useCurrentUser();
    const user = CurrentUser;
    
    useRequireLogin();

    return (
      <>
        <Post user={user} wanted={null}></Post>
      </>
    )
}

export default PostPage;