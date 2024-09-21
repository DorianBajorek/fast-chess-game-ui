import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './mainPage/loginPage/Login';
import Register from './mainPage/loginPage/Register';
import Nav from './Nav';
import { TokenProvider } from './mainPage/loginPage/TokenStore';
import TablePlayers from './game/TablePlayers';

function App() {
  return (
    <TokenProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/table" element={<TablePlayers />} />
          </Routes>
        </div>
      </Router>
    </TokenProvider>
  );
}

export default App;
