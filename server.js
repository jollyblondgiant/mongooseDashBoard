var express, app, bodyParser, server, mongoose, session, flash, path


express = require('express');
app = express();
session = require("express-session");
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
path = require('path')
flash = require('express-flash')
app.use(flash());
app.use(session({
    secret:"gnomon",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
//PATHS
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');
server = app.listen(1337)
// MONGOOSE_DB
mongoose = require('mongoose')
mongoose.promise = global.Promise
mongoose.connect('mongodb://localhost/basic_mongoose')
// SCHEMA
var SnakeSchema = new mongoose.Schema({
    image: String,
    name: {type: String, required: true, minlength: 2, maxlength: 20},
    info: String
})
mongoose.model('Snake', SnakeSchema)
var Snake = mongoose.model('Snake')

app.get('/', function(req, res){
    Snake.find({}, function(err, snakes){
        // console.log(snakes)
        res.render('index', {'snakes':snakes});

    })
})

app.get('/new', function(req, res){
    res.render('new')
})

app.post("/create", function(req, res){
    var snake = new Snake
    snake.name = req.body.name
    snake.info = req.body.info
    snake.img = req.body.img
    snake.save(function(err){
        if(err){
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message)
            }
            res.redirect('new')
        }else{
            res.redirect('/')
        }
    })
})

app.get("/edit/:id", function(req, res){
    
    
    Snake.find({_id: req.params.id }, function(err, snakes){
        
        res.render("edit", {'snakes':snakes})

    })
    
})

app.get("/destroy/:id", function(req, res){
    
    
    Snake.remove({_id: req.params.id }, function(err){
        
        res.redirect('/')

    })
    
})

app.post("/:id", function(req, res){
    Snake.findOne({_id:req.params.id} , function(err, snake)
        {snake.name = req.body.name;
        snake.info = req.body.info;
        snake.image  = req.body.img;
        snake.save(function(err, snake){
            if(err){
                for(var key in err.errors){
                    req.flash('registration', err.errors[key].message)
                }
                res.redirect('edit/'+req.params.id)
            }else{
                res.redirect('/')
            }
        })
    })
})  
