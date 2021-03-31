import '../styles/globals.css';
import { useState, useEffect } from 'react';
import GlobalContext from './states/GlobalContext';
import getCookie from './components/Helper';

/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
*/

function MyApp({ Component, pageProps }) {
  // default is null
  // if logined -> current user is object
  const [currentUser, setUser] = useState(0);

  const token_ = getCookie('iwana_user_token');

  return (
    <GlobalContext.Provider value={{currentUser, setUser}}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  )
}

export default MyApp
