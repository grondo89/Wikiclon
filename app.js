const express = require( 'express' );
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const morgan = require('morgan')
const nunjucks = require( 'nunjucks' )
var lodash = require('lodash')
var fs = require('fs')
var models = require('./models');


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
//app.use(morgan('combined', { stream: accessLogStream }))
nunjucks.configure('views')
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html


// var models = require('./models');
// ... otras cosas
models.User.sync({})
.then(function () {
    return models.Page.sync({force: true})
})
.then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

