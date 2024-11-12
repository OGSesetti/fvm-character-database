const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, default: 'unknown' },
    nationality: { type: String, default: 'unknown'},
    allegiance: { type: String, default: 'unknown'},
    status: { type: String, default: 'unknown'},
    description: { type: String, default: null}
});

const Character = mongoose.model('character', characterSchema); // Character isolla
module.exports = Character;