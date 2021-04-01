import { createContext } from 'react';

const GlobalContext = createContext({
    currentUser: 0,
    setUser: () => {}
})

export default GlobalContext;