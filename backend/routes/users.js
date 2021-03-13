var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const users = require('../models/users')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    const data = await users.findOne({});
    console.log(data);
    res.send(data);
});
router.get('/:id', async function (req, res, next) {
    const data = await users.findOne({_id: req.params.id});
    console.log(data);
    res.send(data);
});
router.post('/register', async function (req, res, next) {
    const u = new users({
        _id : new mongoose.Types.ObjectId,
        email : req.body.email,
        password: req.body.password,
    }).save().then(data=> {
        //console.log(data);
        res.send(data);
    })
});
router.post('/login', async  function (req, res, next) {
    const data  = await users.findOne({email: req.body.email,password: req.body.password});
    if(data){
        console.log(data)
        res.send(data)
    }else {
        res.send({"message":"Invalid username and/or password"});
    }
})
module.exports = router;
