const { MongoClient, ServerApiVersion } = require('mongodb');
//Database connection

const uri = "mongodb+srv://admin:admin@cluster0.t53lw.mongodb.net/humaCare?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect((err,db) => {
    if(!err){
      console.log('Database Connected')
    }else{
      console.log('[error]',err)
    }
});

exports.mongoClient = client;