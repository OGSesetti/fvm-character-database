import React, { Children, useEffect, useState } from 'react';
import './App.css';
import Header from './Header.jsx'
import HomeButton from './Homebutton.jsx'
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { createContext, useContext } from 'react';
import { ApiProvider } from './ApiContext';
import CharacterForm from './CharacterForm.jsx';
import CharacterDetails from './CharacterDetails.jsx';
import HomePage from "./pages/Home.jsx";
import GamesPage from "./pages/Games.jsx";
import CharactersPage from "./pages/Characters.jsx";
import FactionsPage from "./pages/Factions.jsx";
import { PageProvider, usePage } from './PageContext.jsx';

function App() {
  return (
    <PageProvider>
      <MainContent />
    </PageProvider>
  );
}

  function MainContent(){
    const { page, setPage } = usePage();

    const renderView = () => {
      if (page === 'home') return <HomePage setPage={setPage} />;
      if (page === 'characters') return <CharactersPage />;
      if (page === 'games') return <GamesPage />;
      if (page === 'factions') return <FactionsPage />;
      return <h1>404 - Page Not Found</h1>;
    };





  return (
      <div>
        {renderView()}
      </div>
  );
}

export default App;