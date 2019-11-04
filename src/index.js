require('./models/User');
require('./models/WaterTrack');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication');
const track = require('./routes/track');
const requireAuth = require('./middle/requireAuth');


const app = express();


app.use(bodyParser.json());
app.use(authentication);
app.use(track);

const mongoDB_URL = 'mongodb+srv://admin:passwordpassword@cluster0-q7ka1.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}); 

mongoose.connection.on('connected', () =>{
    console.log('connected positively')
});

mongoose.connection.on('error', (err) => {
    console.error('error accured', err);
});


app.get('/', requireAuth,(req, res) => {

    res.send(`Your email: ${req.user.email}`);

});


app.listen( 3000, () => {
    console.log('listening on port 3000'); 
});