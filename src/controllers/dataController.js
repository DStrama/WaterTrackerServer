const mongoose = require('mongoose');
const express = require('express');
var UserData = mongoose.model('UserData');
var DaySchema = mongoose.model('Day');

exports.getData = async (req, res) =>{

    const data = await UserData.find({ userId: req.user._id });

    res.send(data);
};

exports.postData = async (req, res) =>{

    const {userData} = req.body;

    if( !userData) {
        return res.status(422).send({error:  'Musisz podac swoje dane.'})
    }

    try{
        if(userData.sex == "male"){
            userData.requiredwater = parseInt((userData.weight*0.67*2.20462262) * 29.5735296);
        }
        else if (userData.sex == "female"){
            userData.requiredwater = parseInt((userData.weight*0.67*2.20462262) * 29.5735296);
        }
        if(userData.physicalactivity == true){
            userData.requiredwater =  parseInt(userData.requiredwater + 15*29.5735296);
        }

        const data = new UserData({userData, userId: req.user._id});
        await data.save();
        res.send(data);
    }
    catch(err){
        return res.status(422).send({error: err.message});
    }
};