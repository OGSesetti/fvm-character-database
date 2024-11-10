const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, default: 'unknown', required: false },
    nationality: { type: String, default: 'unknown', required: false },
    allegiance: { type: String, default: 'unknown', required: false },
    status: { type: String, default: 'unknown', required: false },
    description: { type: String, default: null, required: false }
});

const character = mongoose.model('character', characterSchema);
module.exports = user;