var express = require('express');
var router = express.Router();
var multer = require('multer');
const files = require('../models/fileurl')

const uploadimage = require('./filecontroller')
router.post('/upload', multer({dest: 'temp/', limits: {fieldSize: 8 * 1024 * 1024}})
        .single('image'),
    uploadimage);

router.get('/:user_id',async (req, res, next) => {
    const data = await files.find({user_id : req.params.user_id})
    console.log(data);
    res.send(data);
})

module.exports = router;
