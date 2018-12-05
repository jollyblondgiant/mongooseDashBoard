var     Snake = require('../models/animal'),
        mongoose = require('mongoose'),
        Snake = mongoose.model('Snake')
module.exports = {
    index: function(req, res){
        Snake.find({}, function(err, snakes){
            // console.log(snakes)
            res.render('index', {'snakes':snakes});
    
        })
    },
    new: function(req, res){
        res.render('new')
    },
    create: function(req, res){
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
    },
    edit: function(req, res){
        Snake.find({_id: req.params.id }, function(err, snakes){
            res.render("edit", {'snakes':snakes})
        })
    },
    destroy: function(req, res){
        Snake.remove({_id: req.params.id }, function(err){
            res.redirect('/')
        })
    }, 
    view: function(req, res){
        Snake.findOne({_id:req.params.id} , function(err, snake){
            snake.name = req.body.name;
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
    }
}