import React, { useEffect, useState } from "react";
import Header from '../Header.jsx'
import '../styles/Characters.css';

function Home({setPage}){

return (
      <div>
      <Header />
      <ul>
        <li onClick={()=>setPage('games')}>Games</li>
        <li onClick={()=>setPage('characters')}>Characters</li>
        <li onClick={()=>setPage('factions')}>Factions</li>
      </ul> 
</div>
  );
}
export default Home;
