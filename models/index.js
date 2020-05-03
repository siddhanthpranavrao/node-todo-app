const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/todo-api', {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useFindAndModify   : false,
	useCreateIndex     : true
});

mongoose.Promise = Promise;

module.exports = require('./todo');
