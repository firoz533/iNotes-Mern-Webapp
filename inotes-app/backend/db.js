const mongoose = require('mongoose');

const mongoURI ='mongodb://localhost:27017/inotebook';
// const mongoURI ='mongodb+srv://Intruder:intruder_MongoDB@inotes.awdrbde.mongodb.net/?retryWrites=true&w=majority&appName=iNotes';

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
    console.log('Connected');
}

module.exports = connectToMongo;