const express = require('express');
const model = require('../models/apiKeyModel');
const router = express.Router();

router.get('/getAllKeys', async (req, res) => {
    
    
    try{
       await res.send({ message: 'getAllkey'});
    } catch(error) {
        res.status(500).send(`Could not GET keys: ${error}`);
    }
});

router.get('/getOneKey/:id', async (req,res) => {

    try{
        await res.send({ message: 'getOnekey'});
    } catch(error) {
        res.status(500).send(`Could not GET key: ${error}`);
    }
});

router.post('/postKey', async (req,res) => {

    try{
        await res.send({ message: 'postKey'}); 
    } catch(error) {
        res.status(400).send(`Could not POST key: ${error}`);
    }
});

router.patch('/patchKey/:id', async (req, res) => {

    try{
        await res.send({ message: 'patchKey'});
    } catch(error) {
        res.status(400).send(`Could not PATCH key: ${error}`);
    }
});

router.delete('/deleteKey/:id', async (req, res) => {

    try{
        await res.send({ message: 'deleteKey'});
    } catch(error) {
        res.status(400).send(`Could not DELETE key: ${error}`);
    }
});

// alright now make them actually do what the should be doing 

module.exports = router;