import '../styles/globals.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useSetRecoilState, RecoilRoot } from 'recoil';
import getCookie from './components/Helper';
import { parseCookies } from 'nookies';

import { CurrentUserState } from './states/CurrentUser';
import { fetchCurrentUser } from './components/Helper';

const AppInt = () => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);

  useEffect(() => {
    (async function () {
      try {
        const tk = getCookie('iwana_user_token');
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
