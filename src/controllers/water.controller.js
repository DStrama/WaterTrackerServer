const mongoose = require('mongoose');
const DaySchema = mongoose.model('Day');

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
        let count;

        if(data.day.drunkwater <= 0 ){
            return res.status(422).send({error:  'Niepoprawne dane.'})
        }
        if(!data.day.liquid || data.day.liquid === 'water' ){
            count = data.day.drunkwater;
        }
        else if(data.day.liquid === 'mineral water'){
            count = data.day.drunkwater * 0.93;
        }
        else if(data.day.liquid === 'tea'){
            count = data.day.drunkwater * 0.85;
        }
        else if(data.day.liquid === 'coffee'){
            count = data.day.drunkwater * 0.8;
        }
        else if(data.day.liquid === 'soda'){
            count = data.day.drunkwater * 0.6;
        }
        else if(data.day.liquid === 'beer'){
            count = data.day.drunkwater * (-0.6);
        }
        else if(data.day.liquid === 'strong alcohol'){
            count = data.day.drunkwater * -3.5;
        }
        else if(data.day.liquid === 'wine'){
            count = data.day.drunkwater * -1.6;
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
        let count;
        if(!req.body.day.liquid || req.body.day.liquid === 'water' ){
            count = req.body.day.drunkwater;
        }
        else if(req.body.day.liquid === 'mineral water'){
            count = req.body.day.drunkwater * 0.93;
        }
        else if(req.body.day.liquid === 'tea'){
            count = req.body.day.drunkwater * 0.85;
        }
        else if(req.body.day.liquid === 'coffee'){
            count = req.body.day.drunkwater * 0.8;
        }
        else if(req.body.day.liquid === 'soda'){
            count = req.body.day.drunkwater * 0.6;
        }
        else if(req.body.day.liquid === 'beer'){
            count = req.body.day.drunkwater * -0.6;
        }
        else if(req.body.day.liquid === 'strong alcohol'){
            count = req.body.day.drunkwater * -3.5;
        }
        else if(req.body.day.liquid === 'wine'){
            count = req.body.day.drunkwater * -1.6;
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
