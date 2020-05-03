const Todo = require('../models');

exports.getTodos = async (req, res) => {
	try {
		const todos = await Todo.find({});
		res.json(todos);
	} catch (err) {
		res.send(err);
	}
};

exports.createTodo = async (req, res) => {
	try {
		const createdTodo = await Todo.create(req.body);
		res.json(createdTodo);
	} catch (err) {
		res.send(err);
	}
};

exports.getTodo = async (req, res) => {
	try {
		const foundTodo = await Todo.findById({
			_id : req.params.todoId
		});
		res.json(foundTodo);
	} catch (err) {
		res.send(err);
	}
};

exports.updateTodo = async (req, res) => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(
			{
				_id : req.params.todoId
			},
			req.body,
			{
				new : true
			}
		);
		res.json(updatedTodo);
	} catch (err) {
		res.send(err);
	}
};

exports.deleteTodo = async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndRemove({
			_id : req.params.todoId
		});
		res.json(deletedTodo);
	} catch (err) {
		res.send(err);
	}
};

module.exports = exports;
