const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();


router.post('/signup',async (req, res) => {

    const { email, password} = req.body;

    try{
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({ userId: user._id },'secret key');
        res.send({token});
    }
    catch(err){
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req,res) =>{
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(422).send({error: 'Nie podano hasła lub adresu email'});
    }
    //using await because findOne take some time have to connect with mongoDB
    const user = await User.findOne({ email });
    if(!user){
        return res.status(422).send({error: 'Nie znaleziono adresu email lub podano błędne hasło'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id}, 'secret key');
        res.send({token});
    }
    catch(err){
        console.log(err);
        return res.status(422).send({error: 'Niepoprawny adres email lub hasło'})
    }

});


module.exports = router;