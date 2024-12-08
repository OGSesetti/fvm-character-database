import React, { useEffect, useState } from 'react';
import { ApiProvider } from '../ApiContext';
import { useApiUrl } from '../ApiContext';
import Header from '../Header.jsx'
import HomeButton from '../Homebutton.jsx'
import '../styles/Characters.css';

function Characters() {
    const apiUrl = useApiUrl();
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState('characters');
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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
                setError(error.message, '-Characters.jsx');
            } finally {
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


    const handleCharacterClick = (character) => {
        setSelectedCharacter(character);
    };

    return (
        <div className='characterContainer'>
        <div className='characterList'>
            <h1>Characters</h1>
            <ul>
                {characters.map((character) => (
                    <li key={character._id} onClick={() => handleCharacterClick(character)}>{character.name}</li>
                ))}
            </ul>
        </div>

    {selectedCharacter && (
        <div className="characterDetail">
        <h2>{selectedCharacter.name}</h2>

        <h3>Age:</h3>
        <p>{selectedCharacter.age}</p>

        <h3>Nationality:</h3>
        <p>{selectedCharacter.nationality}</p>

        <h3>Allegiance: </h3>
        <p>{selectedCharacter.allegiance}</p>

        <h3>Status:</h3>
        <p>{selectedCharacter.status}</p>

        <h3>Description:</h3>
        <p>{selectedCharacter.description}</p>

        </div>
    )}
    </div>
    );
}
    
    export default Characters;
