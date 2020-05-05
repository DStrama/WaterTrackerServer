const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
var User = mongoose.model('User');

exports.SignIn = async (req,res) =>{
    
    const { email, password} = req.body;
    const emailToValidate = email;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(emailRegexp.test(emailToValidate) == false ){
        return res.status(422).send({error: 'Podany adress email jest niepoprawny'});
    }
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

};

exports.SignUp = async (req, res) => {

    const { email, password} = req.body;
    const emailToValidate = email;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(emailRegexp.test(emailToValidate) == false ){
        return res.status(422).send({error: 'Podany adress email jest niepoprawny'});
    }

    try{
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({ userId: user._id },'secret key');
        res.send({token});
    }
    catch(err){
        return res.status(422).send(err.message);
    }
};