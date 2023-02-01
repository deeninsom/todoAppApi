const { Op } = require("sequelize");
const { Activities, Todos } = require('../../models');



class TodoList {
    async getTodoList(req, res) {
        const querry = req.query.activity_group_id || " "
        try {
            const todoList = await Todos.findAll({
                include: {
                    model: Activities,
                    as: 'Activities'
                }
            })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
    async getTodoListById(req, res) {
        try {
            let id = req.params.id
            const todoList = await Todos.findOne({
                where: {
                    todo_id: req.params.id
                }
            })
            if (!todoList) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    async postTodoList(req, res) {
        try {
            if (req.body.tittle === '') {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title cannot be null",
                })
            }
            const { tittle, priority, activity_group_id, is_active } = req.body
            const todoList = await Todos.create({
                tittle: tittle,
                priority: priority,
                is_active: is_active,
                activity_group_id: activity_group_id
            })
            res.status(201).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: error.message });
        }
    }
    async updateTodoList(req, res) {
        let id = req.params.id
        try {
            const { tittle, priority, activity_group_id } = req.body
            const todoList = await Todos.update(
                {
                    tittle: tittle,
                    priority: priority,
                    activity_group_id: activity_group_id
                }, {
                where: {
                    todo_id: req.params.id
                }
            })
            if (!todoList) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: {
                    tittle: tittle,
                    priority: priority,
                    activity_group_id: activity_group_id
                }
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
    async deleteTodoList(req, res) {
        let id = req.params.id
        try {
            const todoList = await Todos.destroy({
                where: {
                    todo_id: req.params.id
                }
            })
            if (!todoList) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: []
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = new TodoList()