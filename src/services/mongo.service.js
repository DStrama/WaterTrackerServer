const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const mongoOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connection.once('connected', () => {
    console.log('connected positively');
});

mongoose.connection.on('error', (err) => {
    console.error('error occurred', err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, mongoOptions);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}