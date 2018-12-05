const mongoose = require('mongoose')
var SnakeSchema = new mongoose.Schema({
    image: String,
    name: {type: String, required: true, minlength: 2, maxlength: 20},
    info: String
})
mongoose.model('Snake', SnakeSchema)