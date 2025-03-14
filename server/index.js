require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes');
const APP_PORT = process.env.APP_PORT || 7050

app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`engine is running! http://localhost:${APP_PORT}`);
});

// connect to mongo or establisht he connection with mongoose

app.use('/api', routes);
