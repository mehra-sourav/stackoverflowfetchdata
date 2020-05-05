const express = require('express');
const router = express.Router();
const axios = require('axios');
const URL = `https://api.stackexchange.com/2.2`;

router.get('/topquestions', (req,res) => {
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

module.exports = router;