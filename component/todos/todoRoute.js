const express  =  require('express');
const todoController = require('./todoController');
const todoRoute = express.Router()

todoRoute.get('/todo-items', todoController.getTodoList)
todoRoute.get('/todo-items/:id', todoController.getTodoListById)
todoRoute.post('/todo-items', todoController.postTodoList)
todoRoute.patch('/todo-items/:id', todoController.updateTodoList)
todoRoute.delete('/todo-items/:id', todoController.deleteTodoList)

module.exports =  todoRoute
