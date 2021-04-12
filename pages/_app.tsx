import '../styles/globals.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useSetRecoilState, RecoilRoot } from 'recoil';
import { parseCookies } from 'nookies';

import { CurrentUserState } from '../states/CurrentUser';
import { fetchCurrentUser } from '../helper/HelperUser';

const AppInt = (): null => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);

  useEffect(() => {
    (async function () {
      try {
        const cookies = parseCookies();
        const tk = cookies['iwana_user_token'];
        const CurrentUser = await fetchCurrentUser(tk);
        setCurrentUser(CurrentUser);
      } catch {
        setCurrentUser(null);
      }
    })();
  }, [])

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <AppInt />
    </RecoilRoot>
  )
}

export default MyApp;
