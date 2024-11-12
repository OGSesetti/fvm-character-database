const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Character = require('./models/characterSchema') //Character isolla
const port = 8081;
const { MongoClient } = require("mongodb");
require('dotenv').config();

//Password is stored in a .env file
const password = process.env.password;


if (Character){
    console.log('Importing of Character schema succesfull;', Character);
}
else{
    console.log('Failed to import Character schema')
}
//console.log('Password:', password);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const uri = `mongodb+srv://ses:${password}@foodvman.zocy6.mongodb.net/?retryWrites=true&w=majority&appName=foodvman`;
let db;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const listFilePath = path.join(__dirname, 'data', 'guestlist.json');
const characterPageFilePath = path.join(__dirname, 'public', 'pages', 'characters.html');


//Database stays connected until the program closes
async function connectToDatabase() {
    if (!db){
        try{
            await mongoose.connect(uri, clientOptions)
            await mongoose.connection.db.admin().command({ ping: 1 });
            console.log("Connection to database successfull.");
            db = 'foodvman';
        }
        catch(error){
            console.error('Error connecting to database.')

        }       
    }
}

/*Temporary attempt at creating the database
async function createFirstItem(){
    try{
        const newCharacter = new Character({name: 'Dirk Tendick'}); //Character isolla!!!
        saveCharacter(newCharacter);

    } catch(error){'Failed to create first item', error}

} */


async function saveCharacter(newCharacter) {
    //console.log('Attempting to save character to database:', newCharacter);
    try{
        await newCharacter.save();
        console.log('Character added', newCharacter);
        }
        catch(error){
            console.error('Failed to save character to database:', error);
        }
}


//Possibly redundant. Check later.
async function disconnectFromDatabase() {
    await mongoose.disconnect();
    console.log('Process over. Disconnected from database.');
}

//Get all character information into one variable.
async function getAll(){
    try{
    const allCharacters = await Character.find();
    console.log('All characters:', allCharacters);
    return(allCharacters);
}   catch(error) {
    console.error('Error retrieving character data:', error);
}
}


///////////////////////////////////////////////////////////////////////////////////////////

//.catch(console.dir);
connectToDatabase();
//getAll();





///////////////////////////////////////////////////////////////////////////////////////////


//Automatically disconnects database when program closes.
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log("SIGINT detected. Database disconnected. Exiting.");
    process.exit(0);
})




app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});



app.get('/characters', function(req, res){
    characterList = getAll();
});  


// Not in use. Going to get repurposed later
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


app.listen(port, () =>{
    console.log('Server running on http://localhost:', port);
});