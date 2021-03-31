import React from 'react';

const GlobalContext = React.createContext({
    currentUser: null,
    setUser: () => {}
})

export default GlobalContext;