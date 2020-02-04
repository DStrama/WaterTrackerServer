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
        const data = new DaySchema({day, userId: req.user._id});
        var count;
        if(!data.day.liquid || data.day.liquid == 'water' ){
            count = data.day.drunkwater;
        }
        else if(data.day.liquid == 'tea'){
            count = data.day.drunkwater * 0.9;
        }
        else if(dataday.liquid == 'coffee'){
            count = dataday.drunkwater * 0.8;
        }
        else if(data.day.liquid == 'carbonated'){
            count = data.day.drunkwater * 0.89;
        }
        else if(data.day.liquid == 'alcohol'){
            count = data.day.drunkwater * 0.9;
        }
        data.day.liquid = 'water';
        data.day.drunkwater = count;
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

    DaySchema.findByIdAndUpdate({_id: req.params.id},req.body, async function(err,Day){
    
        if(err){
            return res.status(404).send({error:  'Nie znaleziono uytkownika o tym id.'})
        }
        var count;
        if(!req.body.day.liquid || req.body.day.liquid == 'water' ){
            count = req.body.day.drunkwater;
        }
        else if(req.body.day.liquid == 'tea'){
            count = req.body.day.drunkwater * 0.9;
        }
        else if(req.body.day.liquid == 'coffee'){
            count = req.body.day.drunkwater * 0.8;
        }
        else if(req.body.day.liquid == 'carbonated'){
            count = req.body.day.drunkwater * 0.89;
        }
        else if(req.body.day.liquid == 'alcohol'){
            count = req.body.day.drunkwater * 0.9;
        }
        Day.day.liquid = 'water';
        Day.day.drunkwater = Day.day.drunkwater + count;
        await Day.save();
        res.send(Day);

    })

};

exports.deleteWater =  async (req,res) =>{ 

    DaySchema.findByIdAndRemove({_id: req.params.id}).then((Day) => {
        res.send(Day);
    })

};