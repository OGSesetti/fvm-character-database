import React, { useEffect, useState } from 'react';
import { ApiProvider } from '../ApiContext';
import { useApiUrl } from '../ApiContext';
import Header from '../Header.jsx'
import HomeButton from '../Homebutton.jsx'
import '../styles/Characters.css';
import CharacterForm from '../CharacterForm.jsx';

function Characters() {
    const apiUrl = useApiUrl();
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState('characters');
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const mode = selectedCharacter ? 'edit' : 'add';


    const fetchCharacters = async() => {
        try {
            //console.log('API URL :', apiUrl);
            const response = await fetch(`${apiUrl}getall`); //ei /getall
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setCharacters(data);
            console.log("Characters fetched")
            setLoading(false);
        } catch (error) {
            setError(error.message, '-Characters.jsx');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => { //getall is always done when the page loads
        if (page === 'characters') {
            fetchCharacters();
        }
    }, [page, apiUrl]);


    //loading screen is a nice thing to have with the super slow render.com servers
    if (loading) {
        return <div>
            Render.com is really slow. Please give it a second.
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


    //Form-related code
    const handleAddNew = () => {
        setSelectedCharacter(null);
        setFormMode('add');
        setShowForm(true);
    };

    const handleEdit = () => {
        setFormMode('edit');
        setShowForm(true);
    };

    const addCharacterToList = (newCharacter) => {
        setCharacters((prev) => [...prev, newCharacter]);
    };

    const handleDelete = async () => {
        if (!selectedCharacter) return;
        try {
            await fetch(`${apiUrl}delete/${selectedCharacter.id}`, {
                method: 'DELETE'
            });
            setCharacters((prev) =>
                prev.filter((character) => character.id !== selectedCharacter.id)
            )
            setSelectedCharacter(null);

        } catch (error) {
            console.error("Error deleting character:", error);
        }
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
                <div>
                    <button onClick={handleAddNew}>Add New</button>
                </div>
            </div>

            {showForm && (
                <div className="characterForm">
                    <CharacterForm 
                        mode={mode} 
                        selectedCharacter={selectedCharacter} 
                        setShowForm={setShowForm} 
                        setCharacters={setCharacters} 
                        fetchCharacters={fetchCharacters}
                        apiUrl={apiUrl}/>
                </div>
            )}

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
