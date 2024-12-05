import React, { useEffect, useState } from 'react';
import { ApiProvider } from '../ApiContext';
import { useApiUrl } from '../ApiContext';
import Header from '../Header.jsx'
import HomeButton from '../Homebutton.jsx'

function Characters() {
    const apiUrl = useApiUrl();
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState('characters');

    useEffect(() => {
        async function fetchCharacters() {
            try {
//                console.log('API URL :', apiUrl);
                const response = await fetch(`${apiUrl}getall`); //ei /getall
                if (!response.ok) {
                    throw new Error('Network error');
                }
                const data = await response.json();
                setCharacters(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        if (page === 'characters') {
            fetchCharacters();
        }
    }, [apiUrl]);

    if (loading) {
        return <div>
            Loading...
        </div>
    }
    if (error) {
        return <div>
            Error: {error}
        </div>
    }



    return (
        <div>
            <Header />
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default Characters;
