var     mongoose = require('mongoose'),
        fs = require('fs'),
        path = require('path')
mongoose.connect('mongodb://localhost/basic_mongoose')

var models_path = path.join(__dirname, './../models')
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >=0){
        require(models_path + '/' +file);
    }
})