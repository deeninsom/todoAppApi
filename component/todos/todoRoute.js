const express  =  require('express');
const todoController = require('./todoController');
const todoRoute = express.Router()
const cacheService = require("express-api-cache");
const cache = cacheService.cache;

todoRoute.get('/todo-items',cache("10 minutes"), todoController.getTodoList)
todoRoute.get('/todo-items/:id', todoController.getTodoListById)
todoRoute.post('/todo-items', todoController.postTodoList)
todoRoute.patch('/todo-items/:id', todoController.updateTodoList)
todoRoute.delete('/todo-items/:id', todoController.deleteTodoList)

module.exports =  todoRoute
