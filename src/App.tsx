import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './mainPage/loginPage/Login';
import Register from './mainPage/loginPage/Register';
import Nav from './Nav';
import { TokenProvider } from './mainPage/loginPage/TokenStore';
import TablePlayers from './game/TablePlayers';

const appStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  minHeight: '100vh',
};

const mainStyles = {
  flexGrow: 1,
};

function App() {
  return (
    <TokenProvider>
      <Router>
        <div style={appStyles} className="App">
          <Nav />
          <main style={mainStyles}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/table" element={<TablePlayers />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TokenProvider>
  );
}

export default App;
