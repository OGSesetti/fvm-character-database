import React from 'react';

function HomeButton({setPage}){

    return(
        <button onClick={() => setPage("home")}>Return</button>
    );
}
export default HomeButton