import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { LoadingProvider } from './components/Loader/LoadingContext';
import { Login } from './Login';
import { Detail } from './Pages/Detail/Detail';
import { Profile } from './Pages/Profile/Profile';
import { Register } from './Pages/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <HashRouter>
        <Routes>
          <Route exact path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='/' element={<App />} />
          <Route path='profile' element={<Profile />} />
          <Route path='detail' element={<Detail />} />
        </Routes>
      </HashRouter>
    </LoadingProvider>
  </React.StrictMode>
);
