require('dotenv').config();
require('./models/User');
require('./models/UserData');
require('./models/Day');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);

const { PORT = 3000 } = process.env;

const { mongoConnect } = require('./services/mongo.service');
const authentication = require('./routes/authentication.router');
const data = require('./routes/data.router');
const water = require('./routes/water.router');


app.use(bodyParser.json());
app.use(authentication);
app.use(data);
app.use(water);


(async () => {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}...`);
    });
})();