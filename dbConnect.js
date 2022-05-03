//const { MongoClient, ServerApiVersion } = require('mongodb');
var mongoose = require('mongoose');
//Database connection

const uri = "mongodb+srv://admin:admin@cluster0.t53lw.mongodb.net/humaCare?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const client = mongoose.connection;
client.on('connected', () => {
    console.log('Database Connected');
});

client.on('disconnected', () => {
    console.log('Database disconnected');
});
client.on('error', console.error.bind(console, 'connection error:'));

exports.mongoose = client;