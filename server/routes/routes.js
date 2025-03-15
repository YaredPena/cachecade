const express = require('express');
const Model = require('../models/apiKeyModel');
const router = express.Router();

/* I just wanted to test something
const testKey = [
    {   id: 1, 
        name: 'testkey', 
        key: 'asohfirbevneonvoirenvaoer'
    }
]

*/

router.get('/getAllKeys', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    } catch(error) {
        res.status(500).send(`Could not GET keys: ${error}`);
    }
});


// great for Me if I ever wanna find it by id and not by name.
router.get('/getOneKey/:id', async (req,res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch(error) {
        res.status(500).send(`Could not GET key: ${error}`);
    }
});

router.get('/getKeyByName/:name', async (req, res) => {
    try{
        const data = await Model.findOne({ keyName: req.params.name });
        res.status(200).json(data);
    } catch(error) {
        res.status(400).send(`Could not find ${name}`);
    }
});

// req.body. ==> as we're making a request (req), we're stitching for example the keyname to a body to be a response for something later.
router.post('/postKey', async (req,res) => {
    const key = new Model({
        keyName: req.body.keyName,
        apiKey: req.body.apiKey,
        description: req.body.description,
        updatedAt: req.body.updatedAt,
        createdAt: req.body.createdAt
    });

    const existingApiKey = await Model.findOne({ apikey: req.body.apikey });

    if(existingApiKey) {
        return res.status(400).send(`This api key already exists in the system.`);
    }


    try{
        const saveKey = await key.save();
        res.status(200).json(saveKey)
    } catch(error) {
        res.status(400).send(`Could not POST key: ${error}`);
    }
});

// here's we're assigning id to be a parameter in our request this means we find things using their id
// so that we can update that key with a new one (should our old key expire.. I haven't met a service that expires api keys though)
router.patch('/patchKey/:id', async (req, res) => {
    const id = req.params.id;
    const updatedKey = req.body;
    const options = { new: true };
        
    const result = await Model.findByIdAndUpdate(
        id, 
        updatedKey, 
        options
    )   

    try{
        await res.send(result);
    } catch(error) {
        res.status(400).send(`Could not PATCH key: ${error}`);
    }
});

// we're find the api key by id here and deleting based off of that. 
// then we're sending that the {key.title} <-- this is dynamic has been deleted to the console.
router.delete('/deleteKey/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const key = await Model.findByIdAndDelete(id)
        res.send(`${key.title} is deleted..`)
    } catch(error) {
        res.status(400).send(`Could not DELETE key: ${error}`);
    }
});

module.exports = router;