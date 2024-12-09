import React from "react";
import {usePage} from './PageContext';

function HomeButton(){
    const {setPage} = usePage();
    return(
        <button onClick={()=>setPage('home')}>Return</button>
    );
}
export default HomeButton;