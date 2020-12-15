const mongoose = require("mongoose")
const Schema = mongoose.Schema

const imageSchema = new mongoose.Schema({
    originalname: String,
    mimetype: String,
    filename: String,
    path: String,
    description: String,
    uuid: String,
    number: {
        type: Number,
        default: 0.00
    }
})

const Image = mongoose.model('Image', imageSchema);

exports.Image = Image
