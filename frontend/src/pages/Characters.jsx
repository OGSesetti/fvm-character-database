import React, {useEffect, useState} from 'react';
//import {ApiProvider} from '../ApiContext';
import {useApiUrl} from '../ApiContext';
//import Header from '../Header.jsx'
//import HomeButton from '../Homebutton.jsx'
import '../styles/Characters.css';
import CharacterForm from '../CharacterForm.jsx';
import CharacterDetails from '../CharacterDetails.jsx';

function Characters() {
    const apiUrl = useApiUrl();
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page] = useState('characters');
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    
    const fetchCharacters = async () => {
        try {
            //console.log('API URL :', apiUrl);
            const response = await fetch(`${apiUrl}getall`); //ei /getall
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setCharacters(data);
            console.log("Characters fetched")
            if (selectedCharacterId) {
                const character = data.find(c => c._id === selectedCharacterId);
                setSelectedCharacter(character);
            }
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
        setSelectedCharacterId(character._id);
        console.log('selectedCharacterId: ', selectedCharacterId);
};


//Form-related code
const handleAddNew = () => {
    setSelectedCharacter(null);
    setFormMode('add');
    setShowForm(true);
};

const handleEdit = () => {
    if (selectedCharacter) {
        setFormMode('edit');
        setShowForm(true);
    }
};

const addCharacterToList = (newCharacter) => {
    setCharacters((prev) => [...prev, newCharacter]);
};

const handleDelete = async (characterId) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
        try {
            const response = await fetch(`${apiUrl}delete/${selectedCharacter._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete character");
            }

            setCharacters((prevCharacters) =>
                prevCharacters.filter((character) => character.id !== characterId)
            );
            setSelectedCharacter(null);
            await fetchCharacters();
        } catch (error) {
            console.error("Error deleting character:", error);
        }
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
                    mode={formMode}
                    selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                    setShowForm={setShowForm}
                    setCharacters={setCharacters}
                    fetchCharacters={fetchCharacters}
                    apiUrl={apiUrl} />
            </div>
        )}

        {selectedCharacter && (
            <CharacterDetails
                character={selectedCharacter}
                onEdit={handleEdit}
                onDelete={() => handleDelete(selectedCharacter._id)}
            />
        )}
    </div>
);
}

export default Characters;
