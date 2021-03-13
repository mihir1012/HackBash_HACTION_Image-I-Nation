const fs = require('fs')
const aws = require('aws-sdk')
const file = require('../models/fileurl')
const mongoose = require('mongoose')
function uploadimage(req, res) {
    aws.config.setPromisesDependency();
    aws.config.update({
        accessKeyId: process.env["ACCESSKEYID"],
        secretAccessKey: process.env["SECRETACCESSKEY"],
        region: "ap-south-1"
    });
    const s3 = new aws.S3();
    var params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `${req.body.user_id}/${req.file.originalname}`
    };

    s3.upload(params, async (err, data) => {
        if (err) {
            console.log('Error occured while trying to upload to S3 bucket', err);
        }
        if (data) {
            fs.unlinkSync(req.file.path);
            const locationUrl = data.Location;
            console.log(locationUrl)
            await
                new file({
                    _id: new mongoose.Types.ObjectId,
                    user_id: req.body.user_id,
                    urls: locationUrl
                })
                    .save().then((data) => {
                        console.log(data)
                    res.send(data)
                })
        }
    })
}

module.exports = uploadimage
