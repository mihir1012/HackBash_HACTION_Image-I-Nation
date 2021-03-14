var express = require('express');
var router = express.Router();
const fs = require('fs')
const download = require('download')
const files = require('../models/fileurl')
var url = require('url');
const sharp = require('sharp');


router.get('/', async (req, res, next) => {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query.height)
    console.log(query.width)
    //fs.unlinkSync("temp/Index_mcwc.pdf")
    const image = await download(query.url,
        'temp/')
    //ops

 if(Boolean(query.resize)==true){
     sharp(image)
     .resize(parseInt(query.height), parseInt(query.width),{
         fit: 'fill'
     })
     .toFile('temp/image.jpg', (err, info) => { console.log("error") });
    }

  

if(Boolean(query.resize)==true){
    sharp(image)
  .resize(parseInt(query.height), parseInt(query.width))

  .toFile('temp/image.jpg', (err, info) => { console.log("error") });
}


module.exports = router;
