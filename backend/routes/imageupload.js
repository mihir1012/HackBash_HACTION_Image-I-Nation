var express = require('express');
var router = express.Router();
var multer = require('multer');

const uploadimage = require('./filecontroller')
router.post('/upload',multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } })
        .single('image'),
        uploadimage);



module.exports = router;
