const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/views`));
app.use(express.static(`${__dirname}/public`));
app.use(
	bodyParser.urlencoded({
		extended : true
	})
);

const todoRoutes = require('./routes/todos');

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
	console.log(`Server is listening on Port ${port}`);
});
