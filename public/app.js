todosApi = axios.create({
	baseURL : 'http://localhost:3000/api'
});

async function getTodoList() {
	const response = await todosApi.get('/todos');
	const todos = response.data;
	return todos;
}

async function createTodo() {
	const userInput = $('#todoInput').val();
	const response = await todosApi.post('/todos', {
		name : userInput
	});
	$('#todoInput').val('');
	const todo = response.data;
	// const todo = [ ...todos ].pop(); //Get the last element of the list
	addTodo(todo);
}

async function deleteTodo(todoId) {
	await todosApi.delete(`/todos/${todoId}`);
}

async function updateTodo(todoId, completed) {
	await todosApi.put(`/todos/${todoId}`, {
		completed : !completed
	});
}

function createTodos(todos) {
	todos.forEach(addTodo);
}

function addTodo({ name, completed, _id }) {
	const newTodo = $(
		`<li data-id=${_id} class="task">${name}<span>X</span></li>`
	);
	if (completed) {
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
}

$(document).ready(async () => {
	const todos = await getTodoList();
	createTodos(todos);
	$('#todoInput').keypress(event => {
		if (event.which === 13) {
			createTodo();
		}
	});

	$('.list span').on('click', function(e) {
		const todoId = $(this).parent().attr('data-id');
		$(this).parent().remove();
		deleteTodo(todoId);
	});

	$('.list li').on('click', function(e) {
		const todoId = $(this).attr('data-id');
		const completed = $(this).attr('class');
		if (completed.includes('done')) {
			$(this).removeClass('done');
		} else {
			$(this).addClass('done');
		}
		updateTodo(todoId, completed.includes('done'));
	});
});
