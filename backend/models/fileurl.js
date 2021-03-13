const mongoose = require('mongoose');

const files = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    urls: {
        type: String
    }
})

module.exports = mongoose.model("files",files)
