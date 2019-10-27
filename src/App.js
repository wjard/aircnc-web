import React from 'react';

import logo from './assets/logo.svg';
import './App.css';
import Routes from './routes';

function App() {

  return (
    <>
      <div className='change-user'>
        <a
          href='/'
          style={{ display: localStorage.getItem('user_id') ? 'visible' : 'none' }}
          onClick={() => localStorage.clear()}>
          <label>Trocar de usuário</label>
        </a>
      </div>
      <div className="container">
        <a href={localStorage.getItem('user_id') ? '/dashboard' : '/'}>
          <img
            src={logo}
            alt="Aircnc React App">
          </img>
        </a>
        <div className="content">
          <Routes></Routes>
        </div>
      </div>
    </>
  );
}

export default App;
