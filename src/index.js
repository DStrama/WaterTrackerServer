require('./models/User');
require('./models/UserData');
require('./models/Day');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication');
const data = require('./routes/data');
const water = require('./routes/water');
const requireAuth = require('./middle/requireAuth');
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use('/user',authentication);
app.use(data);
app.use(water);

const mongoDB_URL = 'mongodb+srv://admin:passwordpassword@cluster0-q7ka1.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}); 

mongoose.connection.on('connected', () =>{
    console.log('connected positively')
});

mongoose.connection.on('error', (err) => {
    console.error('error accured', err);
});

app.listen( port, () => {
    console.log(`server running on port ${port}`); 
});


// app.get('/', requireAuth,(req, res) => {

//     res.send(`Your email: ${req.user.email}`);

// });
