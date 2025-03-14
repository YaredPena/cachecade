const express = require('express');
const router = express.Router();


router.get('/getAllApis', async (req, res) => {
    try{
        await res.send('getAll endpoint');
    } catch(error) {
        console.error(error);
    }
});

// i haven't made an id yet...
router.get('/getOneApi/:id', async (req, res) => {
    try{
        await res.send('getById endpoint');
    } catch(error) {
        console.error(error);
    }
});

router.post('/postApi', async (req, res) => {
    try{
       await res.send('Post endpoint');
    } catch(error) {
        console.error(error);
    } 
});

router.patch('/patchApi/:id', async (req, res) => {
    try{
        await res.send('Patch endpoint');
    } catch(error) {
        console.error(error);
    }
});

router.delete('/deleteApi/:id', async (req, res) => {
    try{
        await res.send('Delete endpoint');
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;