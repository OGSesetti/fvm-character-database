import React, { useState, useEffect } from "react";
import './styles/Characters.css';

function CharacterForm({ mode, selectedCharacter, setSelectedCharacter, setShowForm, setCharacters, fetchCharacters, apiUrl }) {
    const [formData, setFormData] = useState({
        name: selectedCharacter?.name || "",
        age: selectedCharacter?.age || "",
        nationality: selectedCharacter?.nationality || "",
        allegiance: selectedCharacter?.allegiance || "",
        status: selectedCharacter?.status || "",
        description: selectedCharacter?.description || "",
    });


    //unknown ei täyty itsestään, koska tietojen täytyy olla valmiiksi määriteltyjä. Korjaa serveripuolella
    useEffect(() => {
        if (mode === 'edit' && selectedCharacter) {
            setFormData({
                name: selectedCharacter.name || "",
                age: selectedCharacter.age || "",
                nationality: selectedCharacter.nationality || "",
                allegiance: selectedCharacter.allegiance || "",
                status: selectedCharacter.status || "",
                description: selectedCharacter.description || "",
            });
        }
    }, [mode, selectedCharacter]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        const finalFormData = {
            name: formData.name || "unknown",
            age: formData.age || "unknown",
            nationality: formData.nationality || "unknown",
            allegiance: formData.allegiance || "unknown",
            status: formData.status || "unknown",
            description: formData.description || "unknown",
        };

        event.preventDefault();
        let updatedCharacter = null;
        if (mode === 'add') {
            try {
                const response = await fetch(`${apiUrl}add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalFormData),
                });
                if (!response.ok) {
                    throw new Error('Failed to add character');
                }
                const newCharacter = await response.json();
                setShowForm(false);
                await fetchCharacters();
                setSelectedCharacter(null);
            } catch (error) {
                console.error('Error adding character:', error);
            }

        } else if (mode === 'edit') {
            try {
                const response = await fetch(`${apiUrl}update/${selectedCharacter._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(finalFormData),
                });

                if (!response.ok) {
                    throw new Error('Failed to update character');
                }

                updatedCharacter = await response.json();
                console.log('Updated character: ', updatedCharacter);

                //setSelectedCharacter(updatedCharacter);

                setCharacters((prevCharacters) => {
                    const updatedList = prevCharacters.map((character) =>
                        character._id === updatedCharacter._id ? updatedCharacter : character
                    );
                    console.log('Updated list: ', updatedList)
                    return updatedList;
                });

                setShowForm(false);
                
                //setSelectedCharacter(updatedCharacter); Ei toimi
                await fetchCharacters();

            } catch (error) {
                console.error('Error updating character:', error);
            } finally{
                await fetchCharacters();
            }
        }

    };



    return (
        <div className="modal-overlay">
            <div className="form-container">
                <button className="close-btn" onClick={() => setShowForm(false)}>X</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name (required)</label>
                        <input
                            type="text"
                            id="nameInput"
                            name="name"
                            value={formData.name}
                            onChange={handleChange || ""}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="ageInput"
                            name="age"
                            value={formData.age || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationalityInput"
                            name="nationality"
                            value={formData.nationality || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="allegiance">Allegiance</label>
                        <input
                            type="text"
                            id="allegianceInput"
                            name="allegiance"
                            value={formData.allegiance || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            id="statusInput"
                            name="status"
                            value={formData.status || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="descriptionInput"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <button type="submit">{mode === 'add' ? 'Add Character' : 'Update Character'}</button>
                        <button type="cancel" onClick={() => setShowForm(false)}>Cancel</button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default CharacterForm;