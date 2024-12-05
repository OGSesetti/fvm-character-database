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
const Character = require('../models/characterSchema') //Character isolla
const port = 3000;
const { MongoClient } = require("mongodb");
const cors = require('cors');
require('dotenv').config();

var adminRights = false;
app.use(cors());
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
app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.use(express.urlencoded({ extended: true }));

//Server searches for .env file. If one is found, it attempts login as admin
//API key system would probably also be worth doing
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

connectToDatabase();

//Automatically disconnects database when program closes.
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log("SIGINT detected. Database disconnected. Exiting.");
    process.exit(0);
})

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