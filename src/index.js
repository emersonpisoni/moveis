import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Login } from './Login';
import { Detail } from './Pages/Detail/Detail';
import { Profile } from './Pages/Profile/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/app' element={<App />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/detail' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
