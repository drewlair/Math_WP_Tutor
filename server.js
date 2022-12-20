require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require('cors');
app.set("view engine","ejs");

var dbQuestions = [];


let client = new MongoClient("mongodb+srv://doadmin:QqIJSz763s42G509@db-mongodb-nyc1-45406-08357d8a.mongo.ondigitalocean.com/admin?tls=true&authSource=admin");
app.use(cors());


const database = client.db("questions");
const questions = database.collection("discussions");
var index = 0;
app.get("/response", async (req, res) => {
 
    const cursor = questions.find();
    await cursor.forEach(element =>{
        
        dbQuestions.push(element)
        

    })
    
    
    console.log(dbQuestions[index])
    res.json(dbQuestions[index])
    index = index + 1
    console.log(index)
});





app.listen("8000")
