const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
    keyName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now, 
    },
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;