import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext({
    token: '',
    updateToken: (token: string) => {},
});

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState('');

    const updateToken = (newToken: string) => {
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, updateToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
