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

    DaySchema.findByIdAndUpdate({_id: req.params.id},req.body, function(err,Day){
        if(Day.day.liquid == 'tee'){
            req.body.day.drunkwater *= 0.9;
        }
        else if(Day.day.liquid == 'cofee'){
            req.body.day.drunkwater *= 0.8;
        }
        else if(Day.day.liquid == 'carbonated'){
            req.body.day.drunkwater *= 0.89;
        }
        else if(Day.day.liquid == 'beer'){
            req.body.day.drunkwater *= 0.9;
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