const mongoose = require('mongoose');
const express = require('express');
var DaySchema = mongoose.model('Day');

exports.getWater =  async (req,res) => {

    const data = await DaySchema.find({ userId: req.user._id });
    res.send(data);

};

exports.postWater = async (req,res)=>{

    const {day} = req.body;

    if(!day){
        return res.status(422).send({error:  'Musisz podac swoje dane.'})
    }
    try{
        if(day.liquid == 'tee'){
            day.drunkwater *= 0.9;
        }
        else if(day.liquid == 'cofee'){
            day.drunkwater *= 0.8;
        }
        else if(day.liquid == 'carbonated'){
            day.drunkwater *= 0.89;
        }
        else if(day.liquid == 'beer'){
            day.drunkwater *= 0.9;
        }
        const data = new DaySchema({day, userId: req.user._id});
        await data.save();
        res.send(data);
    }
    catch(err){
        return res.status(422).send({error: err.message});
    }
};

exports.putWater = async (req,res) =>{ 
    if(!req.body){
        return res.status(422).send({error:  'Musisz podac swoje dane.'})
    }

    DaySchema.findByIdAndUpdate({_id: req.params.id},req.body, function(err,Day){
        if(err){
            return res.status(404).send({error:  'Nie znaleziono uytkownika o tym id.'})
        }
        var count;
        if(req.body.day.liquid == 'tee'){
            count = req.body.drunkwater * 0.9;
        }
        else if(req.body.liquid == 'cofee'){
            cont = req.body.drunkwater * 0.8;
        }
        else if(req.body.liquid == 'carbonated'){
            count = req.body.drunkwater * 0.89;
        }
        else if(req.body.liquid == 'beer'){
            count = req.body.drunkwater *= 0.9;
        }
        var drunk = req.body.day.drunkwater + Day.day.drunkwater;
        Day.day.drunkwater = drunk;
        res.send(Day);

    })

};

exports.deleteWater =  async (req,res) =>{ 

    DaySchema.findByIdAndRemove({_id: req.params.id}).then((Day) => {
        res.send(Day);
    })

};