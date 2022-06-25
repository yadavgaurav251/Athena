const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

const uri="";// connect with db
try{
    mongoose.connect(
        uri,{useNewUrlParser:true,useUnifiedTopology:true},
        ()=>console.log("mongoose is connected"));
}
catch(err){
    console.log(err);
}
//mongoose.connect('mongodb://localhost/xharktank');

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    }
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('connected to database');
})

app.use(express.json());
app.use('/', routes);

// error handling middleware

app.use(function (err, req, res, next) {
    res.status(422).send({
        error: err.message
    });
})

app.listen(process.env.port || 8081, function () {
    console.log('now listening for requests');
});
