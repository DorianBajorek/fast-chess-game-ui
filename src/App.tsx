import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './mainPage/loginPage/Login';
import Register from './mainPage/loginPage/Register';
import Nav from './Nav';
import { UserData } from './mainPage/loginPage/UserData';
import TablePlayers from './game/TablePlayers';
import Game from './game/Game';
import Profile from './mainPage/loginPage/Profile';

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
    <UserData>
      <Router>
        <div style={appStyles} className="App">
          <Nav />
          <main style={mainStyles}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/table" element={<TablePlayers />} />
              <Route path="/game" element={<Game />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserData>
  );
}

export default App;
