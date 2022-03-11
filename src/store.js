import React from 'react';

const initialState = {
    username: null,
    token: null,
    isLoading: false,
    status: '',
}

export const GlobalContext = React.createContext();

function GlobalStore({ children }) {
    const [global, setGlobal] = React.useState(initialState);

    return (
        <GlobalContext.Provider value={[global, setGlobal]}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStore;