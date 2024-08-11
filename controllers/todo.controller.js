const { v4: uuidv4 } = require('uuid')
const Todo = require('../models/todo.model')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')



const createTask = async (req, res) => {
	const { customer_id } = req.customer
	const { todo_name, todo_description } = req.body

	const task = await Todo.create({
		todo_id: uuidv4(),
		customer_id: customer_id,
		todo_name: todo_name,
		todo_description: todo_description
	})
	task.save()
	res.status(StatusCodes.CREATED).json({
		status: "success",
		message: "created successfully",
		task: task
	})
}

const getAllTasks = async (req, res) => {
	const { customer_id } = req.customer

	tasks = await Todo.findAll({
		where: {
			customer_id: customer_id,
			is_deleted: false
		}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		tasks
	})
}

const getTask = async (req, res) => {
	const { customer_id } = req.customer
	console.log(req.customer)
	const { todo_id: todo_id } = req.params

	const task = await Todo.findOne({
		where: {
			todo_id: todo_id, customer_id: customer_id
		}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		task: task
	})
}

const updateTask = async (req, res) => {
	const { customer_id } = req.customer
	const { todo_id: todo_id } = req.params

	let payLoad = req.body
	payLoad.updated_at = Date.now()

	await Todo.update(payLoad, {
		where: {
			todo_id: todo_id, customer_id: customer_id
		}
	})

	const task = await Todo.findOne({
		where: {
			customer_id: customer_id, 
			todo_id: todo_id
		}
	})
	res.status(StatusCodes.OK).json({
		status: "success",
		task: task 
	})
}

const deleteTask = async (req, res) => {
	const { customer_id } = req.customer
	const { todo_id: todo_id } = req.params

	task = await Todo.update({
		is_deleted: true
	}, {
		where: {
			customer_id: customer_id,
			todo_id: todo_id
		}
	})
	res.status(StatusCodes.OK).json({
		status: "success",
		message: "Added to the recylcle bin"
	})
}

const getAllDeletedTasks = async (req, res) => {
	const { customer_id } = req.customer

	const deletedTasks = await Todo.findAll({
		where: {
			customer_id: customer_id,
			is_deleted: true
		}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		message: "All deleted tasks",
		deletedTasks: deletedTasks
	})
}

const recoverDeletedTask = async (req, res) => {
	const { customer_id } = req.customer
	const { todo_id: todo_id } = req.params

	const task = await Todo.update({
		is_deleted: false
	}, {
		where: {
			todo_id: todo_id,
			customer_id: customer_id
		}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		message: "recovered successfully",
		recoveredTask: recoveredTask
	})
}


const recoverAllDeletedTasks = async (req, res) => {
	await Todo.update({
		is_deleted: false,
		where: {
			customer_id: customer_id
		}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		message: "Recovered All deleted Tasks"
	})
}


const deleteTaskFinally = async (req, res) => {
	const { customer_id } = req.customer
	const { todo_id: todo_id } = req.params

	await Todo.destroy({
		where: { 
			customer_id: customer_id,
			todo_id: todo_id,
			is_delete: true
		}
	})
	res.status(StatusCodes.OK).json({
		status: "success",
		message: "Task is Finally deleted in the Recycle Bin"
	})
}


const deleteAllFinally = async (req, res) => {
	const { customer_id } = req.customer

	await Todo.destroy({
		where: { 
			customer_id: customer_id,
			is_delete: true
		}
	})
	res.status(StatusCodes.OK).json({
		status: "success",
		message: "All Tasks in the Recycle BIN are Deleted Finally"
	})
}

module.exports = {
	createTask,
	getAllTasks,
	getTask,
	updateTask,
	deleteTask,
	getAllDeletedTasks,
	recoverDeletedTask,
	recoverAllDeletedTasks,
	deleteTaskFinally,
	deleteAllFinally
}