const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    keyName: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;