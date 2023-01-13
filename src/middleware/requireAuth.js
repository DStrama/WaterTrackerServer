const mongoose = require('mongoose');
 const jwt = require('jsonwebtoken');
 const User = mongoose.model('User');

 module.exports = (req, res, next) => {

 const {authorization} = req.headers;

 if( !authorization ){
     return res.status(401).send({error: 'brak tokena'})
 }

 const token = authorization.replace('Bearer ','');

 jwt.verify(token, 'secret key', async (err, payload)=>{
     if(err){
         return res.status(401).send({ error: 'token nie jest poprawny'})
     }

     const { userId } = payload;

     req.user = await User.findById(userId);
     next();

 });
 };