require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const database = mongoose.connection;
const routes = require('./routes/routes');
const APP_PORT = process.env.APP_PORT || 7050


const app = express();
app.use(cors());
app.use(express.json());

app.listen(APP_PORT, () => {
    console.log(`engine is running! http://localhost:${APP_PORT}`);
});

mongoose.connect(process.env.DB_URL);

database.on('error', (error) => {
    console.log(`Issue: ${error}`);
});
database.once('connected', () => {
    console.log('Database on!');
});

app.use('/api', routes);
