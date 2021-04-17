import "../styles/globals.css";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { useSetRecoilState, RecoilRoot } from "recoil";
import { parseCookies } from "nookies";

import { CurrentUserState } from "../states/CurrentUser";
import { fetchCurrentUser } from "../helper/HelperUser";
import * as gtag from "../helper/gtag";
import { useRouter } from "next/router";

const AppInt = (): null => {
  const setCurrentUser = useSetRecoilState(CurrentUserState);

  useEffect(() => {
    (async function () {
      try {
        const cookies = parseCookies();
        const tk = cookies["iwana_user_token"];
        const CurrentUser = await fetchCurrentUser(tk);
        setCurrentUser(CurrentUser);
      } catch {
        setCurrentUser(null);
      }
    })();
  }, []);

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (gtag.existsGaId) {
      const handleRouteChange = (path: string) => {
        gtag.pageview(path);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <AppInt />
    </RecoilRoot>
  );
}

export default MyApp;
