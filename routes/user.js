const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/:id', function(req, res, next) {
    var userPromise = User.findByPk(req.params.id);
    var pagesPromise = Page.findAll({
      where: {
        authorId: req.params.id
      }
    });
    Promise.all([
      userPromise, 
      pagesPromise
    ])
    .then(function(values) {
      var user = values[0];
      var pages = values[1];
      res.render('user', { user: user, pages: pages });
    })
    .catch(next);
  });

router.get('/', function (req, res, next) {
    User.findAll()
        .then(usersFind => {
            //   console.log(User.name)
            //   console.log(User.email)
            console.log(usersFind)
            //   console.log(User)
            res.render('users', { users: usersFind });
        }).catch(err => { return err });
})

module.exports = router