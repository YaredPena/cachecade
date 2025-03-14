const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true, 
        trim: true
      },
      key: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
      },
      description: { 
        type: String, 
        default: ''
      },
      expirationDate: { 
        type: Date, 
        default: null
      },

});