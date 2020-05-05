require('dotenv').config();
const express = require('express');
const app = express();
const home = require('./Routes/Home.js')
const topquestions = require('./Routes/TopQuestions.js')
const answer = require('./Routes/Answer.js');
const error = require('./Routes/Error.js');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Landing endpoint
app.use("/",home);

//Endpoint for Top 10 questions
app.use("/api",topquestions);

//Endpoint for getting answers
app.use("/api",answer);

//Endpoint for handing undefined paths
app.use("*",error)

app.listen(process.env.port || 3000,() => console.log("Listening to port 3000"));