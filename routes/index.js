const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

const wikiRouter = require('./wiki');
const userRouter = require('./user');
var bodyParser = require('body-parser')

router.use('/wiki', wikiRouter)
router.use('/users', userRouter)

router.get('/', function (req, res) {
  console.log('llegaste al main');
  Page.findAll()
    .then(pagesFind => {
      // console.log(Page.urlTitle)
      //  console.log(pagesFind)
      res.render('index', { pages: pagesFind });
    })
    .catch(err => { return err });

  ;
});




module.exports = router