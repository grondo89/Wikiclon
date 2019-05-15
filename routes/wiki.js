const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

// router.post('/', function(req,res){
//     console.log(req.body)
//     res.json(req.body)
//     })

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
  // agregá definiciones para  `title` y `content`
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  // Asegurate que solo redirigimos **luego** que nuestro save esta completo!
  // nota:  `.save` devuelve una promesa o puede tomar un callback.
  console.log(req.body)
  page.save()
  .then(savedPage => {
    console.log(savedPage)  
    res.status(200)})
    res.redirect('/')
  });

module.exports = router