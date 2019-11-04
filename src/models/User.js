const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: false,
        required: true
    }
});

//make sure that we allways salt and hash password when create new user 
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    
    bcryptjs.genSalt(10, (err,salt) =>{
        if(err){
            return next(err);
        }
        bcryptjs.hash(user.password, salt, (err, hash) =>{
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
    
});
 
//compare password passed by user with database 
//we use function to refer to the user
 userSchema.methods.comparePassword = function(tryUserPassword) {
    const user = this;

    return new Promise((resolve, reject)=>{
        bcryptjs.compare(tryUserPassword, user.password, (err,isMatch) =>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(flase);
            } 
            resolve(true);
        });

    });
 }


mongoose.model('User', userSchema);