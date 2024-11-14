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
const port = 8081;
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

//Get all characters into JSON in alphabetic order.
async function getAll(){
    try{
        const allCharacters = await Character.find().sort({name:1});
        console.log('All characters:', allCharacters);
        return allCharacters;
        //res.json(allCharacters);
//json mutta samalla pitäisi returnata? muuta.
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


function createCharacterList(characters){
    let htmlList = '';
    characters.forEach(character =>{
        htmlList += `<li>${character.name}</li>`
    })

}

async function updateCharacterPage(){
//    const htmlPath = path.join(__dirname, 'public', 'characters.html')
    const characters = await getAll();
    const characterList = createCharacterList(characters);
    const updatedHtml = html.replace('<!-- character-list -->', `<ul>${characterList}</ul>`);
};


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});


//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API

app.get('/characters', function(req, res){
    characterList = getAll();
    res.send(characterPageFilePath);

});

app.get('/api/character/getall', function(req,res){
    console.log('jee');
    allCharacters = getAll();
    res.json(allCharacters);
});

app.get('/api/character/:id', function(req,res){
    console.log('jee');
});

app.post('/api/character/add', function(req,res){
    console.log('jee');
});

app.put('/api/character/update/:id', function(req,res){
    console.log('jee');
});

app.post('/api/character/add', function(req,res){
    console.log('jee');
});


//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API//API























/* Not in use. Going to get repurposed later
app.get('/newmessage', function(req, res){

    fs.readFile(listFilePath, 'utf8', (err,data)=>{
        if (err) {
            console.error('Cannot read file:', err);
            return res.status(500).send('Server error');
        }

    fs.readFile(characterPageFilePath, 'utf8', (err,page)=>{
        if (err) {
            console.error('Cannot read HTML-file:', err);
            return res.status(500).send('Server error');
        }

    let html = listParser(page, data);

    let form = `
        <form id="messageForm" action = "newmessage" method="POST" class="pure-form pure-form-stacked">
        <label for ="username">Username:</label>
        <input type = "text" name = "username" id="username" required>

        <label for ="country">Country:</label>
        <input type = "text" name = "country" id="country" required>

        <label for ="message">Message:</label>
        <input type = "text" name = "message" id="message" required>

        <button type ="submit" id="submitButton" class ="pure-button-primary">Submit</button>
        <button type ="button" id="ajaxSubmitButton" class = "pure-button-secondary">Submit with a cool AJAX-call</button>
        </form>
        `;

        html = html.replace('<!-- form placement -->', form);
        res.send(html);

});
});
});
*/

app.listen(port, () =>{
    console.log('Server running on http://localhost:', port);
});