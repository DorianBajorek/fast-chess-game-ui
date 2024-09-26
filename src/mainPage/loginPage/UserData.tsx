import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
  token: '',
  updateToken: (token: string) => {},
  userName: '',
  updateUserName: (userName: string) => {},
  email: '',
  updateEmail: (email: string) => {},
  rank: '',
  updateRank: (email: string) => {},
  logout: () => {}
});

export const UserData: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');
  const [email, setEmail] = useState<string>(() => localStorage.getItem('email') || '');
  const [rank, setRank] = useState<string>(() => localStorage.getItem('rank') || '');

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const updateUserName = (newUserName: string) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  const updateEmail = (newEmail: string) => {
    setEmail(newEmail);
    localStorage.setItem('email', newEmail);
  };

  const updateRank= (newRank: string) => {
    setRank(newRank);
    localStorage.setItem('rank', newRank);
  };

  const logout = () => {
    setToken('');
    setUserName('');
    setEmail('');
    setRank('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('rank');
  };

  return (
    <UserContext.Provider value={{ token, updateToken, userName, updateUserName, email, updateEmail, rank, updateRank, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
//809