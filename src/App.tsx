import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import Login from './mainPage/loginPage/Login';
import Nav from './Nav';
import Register from './mainPage/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
