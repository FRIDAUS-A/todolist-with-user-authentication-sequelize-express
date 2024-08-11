const express = require('express')
const router = express.Router()
const { authenticationMiddleWare } = require('../middleware/auth')

const { 
	createTask, 
	getAllTasks, 
	getTask, 
	deleteTask,
	updateTask,
	getAllDeletedTasks,
	recoverDeletedTask,
	recoverAllDeletedTasks,
	deleteAllFinally,
	deleteTaskFinally} = require('../controllers/todo.controller')


router.route('/').post(authenticationMiddleWare, createTask).get(authenticationMiddleWare, getAllTasks).get(authenticationMiddleWare,getAllDeletedTasks).patch(authenticationMiddleWare,recoverAllDeletedTasks).delete(authenticationMiddleWare, deleteAllFinally)


router.route('/:todo_id').get(authenticationMiddleWare, getTask).patch(authenticationMiddleWare, updateTask).delete(authenticationMiddleWare, deleteTask).patch(authenticationMiddleWare, recoverDeletedTask).delete(authenticationMiddleWare, deleteTaskFinally)


module.exports = router