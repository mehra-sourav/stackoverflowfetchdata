require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const URL = `https://api.stackexchange.com/2.2`;
// const key = `key=${process.env.SECRET_KEY}`


https://api.stackexchange.com/2.2/posts/4689?

app.use(express.urlencoded({extended:true}));
// app.use(express.bodyParser());
app.use(express.json());


//Landing endpoint
app.get("/",(req,res) => {
    res.send(`Hello World. Key:${process.env.SECRET_KEY}`);
});

//Endpoint for Top 10 questions
app.get("/api/topquestions",(req,res) => {
    var tag = req.body.tag
    // console.log("Val of encoded tag",encoded)
    if(tag)
    {
        // console.log("in if")
        axios.get(`${URL}/questions`,{
                params:{
                    pagesize:10,
                    order:"desc",
                    sort:"creation",
                    tagged:tag,
                    site:"stackoverflow",
                    key:process.env.SECRET_KEY
                }
            })
            .then(response => {
                res.send(response.data.items);
            })
    }
    else
    {
        // console.log("in else")
        axios.get(`${URL}/questions`,{
                params:{
                    pagesize:10,
                    order:"desc",
                    sort:"creation",
                    site:"stackoverflow",
                    key:process.env.SECRET_KEY
                }
            })
            .then(response =>{
                    res.send(response.data.items);
            })
            .catch(error => res.send(error))
    }
});



app.listen(process.env.port || 3000,() => console.log("Listening to port 3000"));