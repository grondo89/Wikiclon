var lodash = require('lodash')

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, 
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false,
    },
    content: {
        type: Sequelize.STRING, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
     }
    },
    { 
    getterMethods: {
        route() {
            return "/wiki/" + this.title;
        }
    }
});
var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false
    }
});

Page.belongsTo(User, { as: 'author' });

function generateUrlTitle (title) {
    if (title) {
      // Remueve todos los caracteres no-alfanuméricos 
      // y hace a los espacios guiones bajos. 
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generá de forma aleatoria un string de 5 caracteres
      return Math.random().toString(36).substring(2, 7);
    }
  }

Page.beforeValidate('myHookAfter', (Page, options) => {
    Page.urlTitle = generateUrlTitle(Page.title)
    console.log("Sanitizamos el URL!!")
  });

module.exports = {
  Page: Page,
  User: User
};