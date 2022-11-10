import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Login } from './Login';
import { Detail } from './Pages/Detail/Detail';
import { Profile } from './Pages/Profile/Profile';
import { Register } from './Pages/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='app' element={<App />} />
        <Route path='profile' element={<Profile />} />
        <Route path='detail' element={<Detail />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
