import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../Header.jsx'

function Home(){
  const [page, setPage] = useState("home");
    
return (
    <div>
    {page === "home" && (
      <div>
      <Header></Header>
      <ul>
        <li>
        <Link to="/Games" onClick={() => setPage("Games")}>Games</Link>
        </li>
        <li>
        <Link to="/characters" onClick={() => setPage("characters")}>Characters</Link>
        </li>
        <li>
        <Link to="/Factions" onClick={() => setPage("Factions")}>Factions</Link>
        </li>

      </ul> 
      </div>
    )}
</div>
  );
}
export default Home;
