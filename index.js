require('dotenv').config()

// async errors
require('express-async-errors')
const express = require('express')

const app = express()

app.use(express.json())
// DB
const sequelize  = require('./config/sequelize')
const port = process.env.PORT
// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// router
routerCustomers = require('./routes/customer.route')
routerTodos = require('./routes/todo.route')

// routes
app.get('/', (req, res) => {
	res.send('<h1>Working fine</h1>')
})
app.use('/api/v1/customers',routerCustomers)
app.use('/api/v1/todos', routerTodos)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		try {
			await sequelize.authenticate()
		} catch (err) {
			console.log(err)
		}
		await sequelize.sync()
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()