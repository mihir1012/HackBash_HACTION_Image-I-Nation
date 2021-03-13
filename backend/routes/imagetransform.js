var express = require('express');
var router = express.Router();
const fs = require('fs')
const download = require('download')
const files = require('../models/fileurl')
var url = require('url');


router.get('/', async (req, res, next) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query.height)
    console.log(query.width)
    fs.unlinkSync("temp/Index_mcwc.pdf")
    const image = await download("https://thebigbang.s3.ap-south-1.amazonaws.com/604d2243aafbfa26063d8b28/Index_mcwc.pdf",
        'temp/')
    //ops

    res.send({"imageurl": "http://localhost:3000/Index_mcwc.pdf"})
})
module.exports = router;
