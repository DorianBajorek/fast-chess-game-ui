import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
  token: '',
  updateToken: (token: string) => {},
  userName: '',
  updateUserName: (userName: string) => {},
  logout: () => {}
});

export const UserData: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const updateUserName = (newUserName: string) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  const logout = () => {
    setToken('');
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  return (
    <UserContext.Provider value={{ token, updateToken, userName, updateUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
