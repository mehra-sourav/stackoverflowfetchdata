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
            .catch(error => res.send(error));
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
            .catch(error => res.send(error));
    }
});

app.get("/api/answer",(req,res) => {
    var {questionid:questionID} = req.body;
    // console.log("Question ID:",questionid);
    if(questionID)
    {
        var finalRes = {};
        axios.get(`${URL}/questions/${questionID}`,{
                params:{
                    filter:"withbody",
                    site:"stackoverflow",
                    key:process.env.SECRET_KEY
                }
            })
            .then(response => {
                // console.log("Question response:",response.data)
                finalRes['question_body'] = response.data.items[0].body;
                finalRes['has_accepted_answer_id'] = response.data.items[0].is_answered? true: false;

                //If the question has an accepted answer, then return that answer's body
                if(response.data.items[0].accepted_answer_id)
                {
                    var answerID = response.data.items[0].accepted_answer_id;
                    axios.get(`${URL}/answers/${answerID}`,{
                        params:{
                            filter:"withbody",
                            site:"stackoverflow",
                            key:process.env.SECRET_KEY,
                        }
                    })
                    .then(resp => {
                        finalRes['answer_body'] = resp.data.items[0].body;
                        // console.log(finalRes);
                        res.send(finalRes);
                    })
                    .catch(error => res.send(error));
                }
                else //If the question has not been answered, then return all the answers ordered by maximum votes
                {
                    // var page = 1;
                    // var has_more = true;
                    var answerArr = [];
                    
                    axios.get(`${URL}/questions/${questionID}/answers/`,{
                            params:{
                                order:"desc",
                                sort:"votes",
                                // page:9,
                                pagesize:100,
                                filter:"withbody",
                                site:"stackoverflow",
                                key:process.env.SECRET_KEY,
                            }
                        })
                        .then(resp => {
                            // var answerArr = [];
                            // has_more = resp.data.has_more;
                            resp.data.items.forEach(item =>  answerArr.push(item.body));
                            finalRes['answer_array'] = answerArr;
                            // console.log(answerArr.length);
                            res.send(finalRes);
                        })
                        .catch(error => res.send(error));
                }
            })
            .catch(error => res.send(error));
    }
    else
    {
        res.send("No question ID provided");
    }
});








app.listen(process.env.port || 3000,() => console.log("Listening to port 3000"));