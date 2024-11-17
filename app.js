/*
This code is only for the character database so far.
/character opens the page and /characterAPI is for the HTTP requests
Connecting and disconnecting the database should be automatic

*/

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Character = require('./models/characterSchema') //Character isolla
const port = 3000;
const { MongoClient } = require("mongodb");
require('dotenv').config();

var adminRights = false;

//Password is stored in a .env file
const password = process.env.password;


if (Character){
    console.log('Importing of Character schema successful:', Character);
}
else{
    console.log('Failed to import Character schema')
}
//console.log('Password:', password);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const uri = `mongodb+srv://ses:${password}@foodvman.zocy6.mongodb.net/?retryWrites=true&w=majority&appName=foodvman`;
const guestUri = `mongodb+srv://guest:guest@foodvman.zocy6.mongodb.net/?retryWrites=true&w=majority&appName=foodvman`; //read only
let db;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const listFilePath = path.join(__dirname, 'data', 'guestlist.json'); //obsolete
const characterPageFilePath = path.join(__dirname, 'public', 'pages', 'characters.html');


//Database stays connected until the program closes
async function connectToDatabase() {
    if (!db){
        if (password){
            try{
                await mongoose.connect(uri, clientOptions)
                await mongoose.connection.db.admin().command({ ping: 1 });
                console.log("Password found. Connected to database as admin");
                adminRights = true;
            }
            catch(error){
                console.error('Error connecting to database')
        }}
        else {
            console.log('Password from .env file missing. Logging in as guest')
            try{
                await mongoose.connect(guestUri, clientOptions)
                await mongoose.connection.db.admin().command({ ping: 1 });
                console.log("Connected to database as guest");
            }
            catch(error){
                console.error('Error connecting to database:', error);

}}}}

/*Temporary attempt at creating the database
async function createFirstItem(){
    try{
        const newCharacter = new Character({name: 'Dirk Tendick'}); //Character isolla!!!
        saveCharacter(newCharacter);

    } catch(error){'Failed to create first item', error}

} */

//right now useless
async function saveCharacter(newCharacter) {
    //console.log('Attempting to save character to database:', newCharacter);
    if (adminRights){
        try{
            await newCharacter.save();
            console.log('Character added', newCharacter);
            }
            catch(error){
                console.error('Failed to save character to database:', error);
            }}
    else {
        console.error('Cannot edit data as guest')

    }
    
}


//Possibly redundant. Check later.
async function disconnectFromDatabase() {
    await mongoose.disconnect();
    console.log('Process over. Disconnected from database.');
}

//Not in use. Originally meant it for the front-end, but I will leave that for project 3
async function getAll(){
    try{
        const allCharacters = await Character.find().sort({name:1});
        console.log('All characters:', allCharacters);
        res.json(allCharacters);
}   catch(error) {
        console.error('Error retrieving character data:', error);
        return [];
}
};




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//.catch(console.dir);
connectToDatabase();
//getAll();







//Automatically disconnects database when program closes.
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log("SIGINT detected. Database disconnected. Exiting.");
    process.exit(0);
})

//possible stuff for the future front end
function createCharacterList(characters){
    let htmlList = '';
    characters.forEach(character =>{
        htmlList += `<li>${character.name}</li>`
    })

}
//possible stuff for the future front end
async function updateCharacterPage(){
//    const htmlPath = path.join(__dirname, 'public', 'characters.html')
    const characters = await getAll();
    const characterList = createCharacterList(characters);
    const updatedHtml = html.replace('<!-- character-list -->', `<ul>${characterList}</ul>`);
};

//pages don't work right now because of the fundamental changes to the project
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

app.get('/characters', async (req, res) => {
    characterList = getAll(); //not in use
    res.send(characterPageFilePath);

});

//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API

//get all
app.get('/api/character/getall', async (req,res)=>{
    try{
        const allCharacters = await Character.find().sort({name:1});
        console.log('All characters:', allCharacters);
        res.json(allCharacters);
}   catch(error) {
        res.json({error: "Server error:", details: error.message});
}
});

//get selected character
app.get('/api/character/:id', async (req,res) =>{
    try{
        const character = await Character.findById(req.params.id);
        if (!character){
            return res.json({error: "Character not found:", details: error.message});
            }
            res.json(character);
}
    catch (error){
        res.json({error: "Server error:", details: error.message});
    }
});

//add new character
app.post('/api/character/add', async (req,res)=>{
    try{
        const newCharacter = new Character(req.body);
        await newCharacter.save();
        res.json({status: "New character added", character: newCharacter});
}   catch (error){
    console.error("Server error:", error);
    res.json({error: "Server error:", details: error.message});
} 
});

//update character information
app.put('/api/character/update/:id', async (req,res)=>{
    try{
        const selectedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!selectedCharacter) {
            return res.json({status: "Character was not found in the database"});
    }
    res.json({status: "Character updated"});
} catch (error){
    res.json({error: "Server error:", details: error.message});
    }
});

//delete character
app.delete('/api/character/delete/:id', async (req,res)=>{
    try {
        const selectedCharacter = await Character.findByIdAndDelete(req.params.id); //ehkä isolla??
        if (!selectedCharacter) {
            return res.json({status: "Character was not found in the database"})
        }
        res.json({status: "Character deleted"});
    }catch (error){
        res.json({error: "Server error:", error});
    }
});


//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API



app.listen(port, () =>{
    console.log('Server running on http://localhost:', port);
});