const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const character = require('./models/characterSchema')
const port = 8081;

require('dotenv').config();
//console.log(process.env);

const uri = 'mongodb://localhost:27017/characters';
mongoose.connect(uri)
    .then(() => console.log('Connection to database successful'))
    .catch((error) => console.error('Cannot connect to database', error));

app.use(express.json());




app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const listFilePath = path.join(__dirname, 'data', 'guestlist.json');
const guestBookPageFilePath = path.join(__dirname, 'public', 'pages', 'guestbook.html');























function listParser(html, list){
   
    try {
        guests = JSON.parse(list);

    } catch (parseErr) {
        console.error('Cannot parse data:', parseErr);
        return res.status(500).send('Invalid JSON format');
        }
    
    guests.forEach(guest =>{
        html = html.replace('<!-- guestlist -->', `<tr>
        <td>${guest.username}</td>
        <td>${guest.country}</td>
        <td>${guest.message}</td>
        <td>${guest.timestamp}</td>
        </tr><!-- guestlist -->`);
    });
    return(html);
};





app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});



app.get('/guestbook', function(req, res){

    fs.readFile(listFilePath, 'utf8', (err,data)=>{
        if (err) {
            console.error('Cannot read file:', err);
            return res.status(500).send('Server error');
        }
        fs.readFile(guestBookPageFilePath, 'utf8', (err,page)=>{
            if (err) {
                console.error('Cannot read file:', err);
                return res.status(500).send('Server error');
            }
    html = listParser(page, data);
    res.send(html);
});
});   
});  

app.get('/newmessage', function(req, res){

    fs.readFile(listFilePath, 'utf8', (err,data)=>{
        if (err) {
            console.error('Cannot read file:', err);
            return res.status(500).send('Server error');
        }

    fs.readFile(guestBookPageFilePath, 'utf8', (err,page)=>{
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

app.post('/newmessage', function(req, res){
  
    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date().toISOString()
    };

    fs.readFile(listFilePath, 'utf8', (err, data) => {
        if (err){
            console.error('Tiedoston lukeminen epäonnistui:', err);
            return res.status(500).send('Tiedoston lukeminen epäonnistui.');
        };

        const guests = JSON.parse(data);
        guests.push(newMessage);
        
        fs.writeFile(listFilePath, JSON.stringify(guests, null, 2), (err) => {
            if (err) {
                console.error('Tiedostoon kirjoittaminen epäonnistui:', err);
                return res.status(500).send('Tiedostoon kirjoittaminen epäonnistui.');
            };
            res.redirect('/guestbook');
        });

    });

});


app.post('/ajaxmessage', function(req, res){

    const newMessage = {
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        timestamp: new Date().toISOString()
    };

    fs.readFile(listFilePath, 'utf8', (err, data) => {
        if (err){
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file.');
        };

        const guests = JSON.parse(data);
        guests.push(newMessage);

        fs.writeFile(listFilePath, JSON.stringify(guests, null, 2), (err) => {
            if (err) {
                console.error('Writing failed:', err);
                return res.status(500).json('Writing failed.');
            }

            res.status(200).json({ message: 'Message added successfully', guests: guests });
        });
    });
    });


app.listen(port, () =>{
    console.log('Server running on http://localhost:', port);
});