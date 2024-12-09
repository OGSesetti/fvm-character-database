import React, { Children, useEffect, useState } from 'react';
import './App.css';
import Header from './Header.jsx'
import HomeButton from './Homebutton.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {createContext, useContext} from 'react';
import {ApiProvider} from './ApiContext';

import Home from "./pages/Home.jsx";
import Games from "./pages/Games.jsx";
import Characters from "./pages/Characters.jsx";
import Factions from "./pages/Factions.jsx";

function App() { //export function???
  //const [page, setPage] = useState("home");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/games" element={<Games />} />
        <Route path="/factions" element={<Factions />} />
      </Routes>
    </Router>
  );
}

export default App;
