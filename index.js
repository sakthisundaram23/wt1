var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/contact',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database Contact"));
db.once('open',()=>console.log("Connected to Database Contact"))

app.post("/contact",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var comments = req.body.comments;

    var data = {
        "Name": name,
        "E-mail" : email,
        "phone Number": phno,
        "Message" : comments
    }

    db.collection('records').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('contact.html')

})




app.post("/indexform",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var loc = req.body.loc;
    var dropdown = req.body.dropdown;
    var comments = req.body.comments;

    var data = {
        "Name": name,
        "E-mail" : email,
        "phone Number": phno,
        "Location": loc,
        "Service needed": dropdown,
        "Message" : comments
    }

    db.collection('records1').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully to the indexform database");
    });

    return res.redirect('index.html')

})



app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");