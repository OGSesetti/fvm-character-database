import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeButton(){
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    };

    return(
        <button onClick={goHome}>Return</button>
    );
}
export default HomeButton