const mongoose = require('mongoose');
const express = require('express');
const requireAuth = require('../middle/requireAuth');
const WaterTrack = mongoose.model('WaterTrack');


const router = express.Router();

// to require all router to be sign in we have to do this

router.use(requireAuth);

router.get('/days', async (req, res) =>{
    const days = await WaterTrack.find({ userId: req.user._id });

    res.send(days);

});


router.post('/days', async (req, res) => {

    const { userData, days} = req.body;

    if( !userData || !days){
        return res.status(422).send({error:  'Musisz podac swoje dane lub wypełnić pierwszy dzień'})
    }
    
    try{
        const watertrack = new WaterTrack({userData, days, userId: req.user._id});
        await watertrack.save();
        res.send(watertrack);
    }
    catch(err){
        return res.status(422).send({error: err.message});
    }
});

module.exports = router;