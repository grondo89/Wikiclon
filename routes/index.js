const express = require('express');
const router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');
var bodyParser = require('body-parser')

router.use('/wiki', wikiRouter)
router.use('/user', userRouter)


router.get('/', function (req, res) {
   console.log('llegaste al main');
    res.render( 'index');
  });




module.exports = router