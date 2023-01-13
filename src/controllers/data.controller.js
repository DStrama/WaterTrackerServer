const mongoose = require('mongoose');
const UserData = mongoose.model('UserData');

exports.getData = async (req, res) => {

    const data = await UserData.find({ userId: req.user._id });

    res.send(data);
};

exports.putData = async (req, res) => {

    UserData.findByIdAndUpdate({_id: req.params.id},req.body, async function(err, User){

        if(err){
            return res.status(404).send({error:  'Nie znaleziono uzytkownika o tym id.'})
        }

        User.userData.requiredwater = req.body.userData.requiredwater;
        /*
        useless code bellow

        User.userData.sex = User.userData.sex;
        User.userData.weight = User.userData.weight;
        User.userData.physicalactivity = User.userData.physicalactivity;
         */

        await User.save();
        res.send(User);
    })


};

exports.postData = async (req, res) => {

    const { userData } = req.body;

    if(!userData) {
        return res.status(422).send({error:  'Musisz podac swoje dane.'})
    }

    try{
        if(userData.sex === "male") {
            userData.requiredwater = parseInt((userData.weight*0.67*2.20462262) * 29.5735296);
        }
        if (userData.sex === "female") {
            userData.requiredwater = parseInt((userData.weight*0.67*2.20462262) * 29.5735296);
        }
        if(userData.physicalactivity){
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