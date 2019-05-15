
var fs = require('fs')

const express = require( 'express' );
const app = express()
app.use(express.static('public'))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes');
app.use('/', routes);

const morgan = require('morgan')
app.use(morgan('combined', { stream: accessLogStream }))

const nunjucks = require( 'nunjucks' )
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views')

var server = app.listen(3000);
console.log('Estas escuhando en el puerto 3000')
