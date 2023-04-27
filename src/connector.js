
//const mongodb = require('mongodb');

const mongoURI = "mongodb+srv://akashchoudhary8377:<Akash@1234>@instclonewebsite.kaimhep.mongodb.net/test"

let mongoose = require('mongoose');
const { tallySchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
collection_connection = mongoose.model('covidtally', tallySchema)


exports.connection = collection_connection;
