import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header.jsx'
import HomeButton from './Homebutton.jsx'


// https://fvm-character-database.onrender.com/
function App() {
const serverUrl = process.env.REACT_APP_API_URL;
const localUrl = 'http://localhost:3000/';
const endPoint = 'api/characters/';
const localHost = process.env.REACT_APP_LOCALHOST;
var baseUrl = "";


  if (localHost === 1){
    baseUrl = localUrl
  }
  else{
    baseUrl = serverUrl
  }

  const apiUrl = new URL(endPoint, baseUrl).href

   

  const [page, setPage] = useState("home");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
      async function fetchCharacters() {
      const response = await fetch(`${apiUrl}/characters`);
      const data = await response.json();
      setCharacters(data);
    };

    if (page === 'characters'){
      fetchCharacters();
    }
 
  }, [apiUrl, page]);



  return (
    <div>
    {page === "home" && (
      <div>
      <Header/>
      <button onClick={() => setPage("games")}>Games</button>
      <button onClick={() => setPage("characters")}>Characters</button>
      <button onClick={() => setPage("factions")}>Factions</button>
      </div>
    )}

    {page === "games" && (
      <div>
        <Header/>
        <HomeButton setPage={setPage} />
      <h1>Coming soon</h1>
      </div>
    )}

    {page === "characters" && (
      <div>
        <Header/>
        <HomeButton setPage={setPage} />
      <h1>Characters</h1>
      <button onClick={() => setPage("home")}>Home</button>
      {characters.length > 0 ? (
        <ul>
        {characters.map((char) => (
          <li key={char._id}>{char.name}</li>
        ))}
        </ul> ) :(
          <p>Loading characters...</p>
        )}
      </div>
    )}

    {page === "factions" && (
      <div>
        <Header/>
        <HomeButton setPage={setPage} />
      <h1>Coming soon</h1>
      </div>
    )}   

</div>
  );
}
export default App;
