const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

router.get('/add', function(req,res){
    res.render( 'addpage')
    ;
})

  router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ 
      where: { 
        urlTitle: req.params.urlTitle 
      } 
    })
    .then(function(foundPage){
      res.render('wikipage', { Page: foundPage, showForm: true });
    })
    .catch(next);
  });  

// res.render( 'index', { tweets: tweets, showForm: true } );  
 
router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.authorName,
    },
    defaults: { 
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);

  // Asegurate que solo redirigimos **luego** que nuestro save esta completo!
  // nota:  `.save` devuelve una promesa o puede tomar un callback.
  
  // page.save()
  //   .then(savedPage => {
  //     console.log(savedPage)
  //     res.redirect(savedPage.route); // route virtual FTW
  // })
  // .catch(next);
  // 
});

module.exports = router