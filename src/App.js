import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import router from './router'
import NavBar from './Components/NavBar'

function App() {
  return (
    <HashRouter>
      <NavBar />
      {router}
    </HashRouter>
  );
}

export default App;
