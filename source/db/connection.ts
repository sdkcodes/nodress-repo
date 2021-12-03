let mongoose = require('mongoose');

//todo get db password and name from environment
const uri = "mongodb+srv://sdk:omoelu@cluster0.2ny0b.mongodb.net/addresses_db?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export let client = mongoose.connection;

client.on('error', console.error.bind(console, 'Error connecting to database'));

