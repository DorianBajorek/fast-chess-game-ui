import { useState } from 'react';

const useTokenStore = () => {
    const [token, setToken] = useState("");

    const updateToken = (newToken: string) => {
        setToken(newToken);
    };

    return {
        token,
        updateToken,
    };
};

export default useTokenStore;