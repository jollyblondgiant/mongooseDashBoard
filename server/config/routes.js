const   mongoose = require('mongoose'),
        Snake = mongoose.model('Snake'),
        animals = require('../controllers/animals')
module.exports = function(app){
    app.get('/', function(req, res){
        animals.index(req, res)
    })
    app.get('/new', function(req, res){
        animals.new(req, res)
    })
    app.post("/create", function(req, res){
        animals.create(req, res)
    })
    app.get("/edit/:id", function(req, res){
        animals.edit(req, res)
    })
    app.get("/destroy/:id", function(req, res){
        animals.destroy(req, res)
    })
    app.post("/:id", function(req, res){
        animals.view(req, res)
    }) 
}