const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());

const APP_PORT = process.env.APP_PORT || 8000

app.listen(APP_PORT, () => {
    console.log(`engine is running! http://localhost:${APP_PORT}`);
});

const database = mongoose.connection;
//mongoose.connect(process.env.DB_URL);

database.on('error', (error) => {
    console.log(`Issue: ${error}`);
});

database.once('connected', () => {
    console.log('database connected');
})

app.use('/api', routes);

// next steps is probably to get MY DATABASE
// then maybe erm....
// connect to a client???

// I highkey don't know what techstack I want to use...

// let's try NEXT.JS
// let's try again with node + express and mongo db
// let's also try making like an actual scope for this project LMAO

/* 

DEV PROCESS: 

I:      connect to server (DONE)
II:     connect to DB/w server ()
III:    develop backend crud endpoints, not just dummy endpoints ()
IV:     connect to client (NEXT.js)
V:      begin working on interactability and UI
VI:     Ig just deploy it using vercel?????????

*/