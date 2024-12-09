function CharacterDetails({ character, onEdit, onDelete }) {
    return (
        <div className="characterDetail">
            <h2>{character.name}</h2>

            <div className="detailsPageButtons">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
            </div>


            <h3>Age:</h3>
            <p>{character.age}</p>

            <h3>Nationality:</h3>
            <p>{character.nationality}</p>

            <h3>Allegiance: </h3>
            <p>{character.allegiance}</p>

            <h3>Status:</h3>
            <p>{character.status}</p>

            <h3>Description:</h3>
            <p>{character.description}</p>

        </div>
    );
}
export default CharacterDetails;