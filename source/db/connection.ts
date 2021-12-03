let mongoose = require('mongoose');

let host = process.env.DB_HOST;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let database = process.env.DB_DATABASE;

const uri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

export let client = mongoose.connection;

client.on('error', console.error.bind(console, 'Error connecting to database'));

