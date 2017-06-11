const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('Cart', {
		quantity: {
		type: Sequelize.INTEGER
	}
},{
	hooks:{
		beforeCreate: function(cart){
			console.log('getting ready to create')
		}
	}
})
