import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateModel from './components/CreateModel';
import LoginPage from './components/LoginPage';
import Navbar from './components/CustomNavbar';
import RegisterPage from './components/RegisterPage';
import PrivateRouter from './components/PrivateRouter';
import { AuthProvider } from './components/AuthContext';
import ExplorePage from './components/ExplorePage';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route exact path="/" element={<App />} />
            <Route path = "/createmodel" element={<CreateModel/>} />
          </Route>
          <Route path = "/login" element = {<LoginPage />} />
          <Route path = "/register" element = {<RegisterPage/>}/>
          <Route path = "/explore" element = {<ExplorePage/>}/>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
