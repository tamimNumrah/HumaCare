var express =require ('express');
let dbConnect = require("./dbConnect");

var app= express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var port=process.env.port ||3000;

app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
})