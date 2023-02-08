const { Op } = require("sequelize");
const { todos } = require('../../models');



class TodoList {
    async getTodoList(req, res) {
        const querry = req.query.activity_group_id || ""
        try {
            const todoList = await todos.findAll({
                where: {
                    [Op.or]: [{activity_group_id:{
                        [Op.like] : '%'+ querry
                    }}]
                },
            })
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
    async getTodoListById(req, res) {
        let id = req.params.id
        try {
            const todoList = await todos.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!todoList) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
    async postTodoList(req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title cannot be null",
                })
            }
            else if (!req.body.activity_group_id) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "activity_group_id cannot be null",
                })
            }
            const todoList = await todos.create(req.body)
            return res.status(201).json({
                status: "Success",
                message: "Success",
                data: todoList
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
    async updateTodoList(req, res) {
        let id = req.params.id
        try {
            await todos.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const todoList = await todos.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!todoList) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            const data = req.body
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: data
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
    async deleteTodoList(req, res) {
        let id = req.params.id
        try {
            const data = await todos.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!data) return res.status(404).json({ status: 'Not Found', message: `Todo with ID ${id} Not Found` })
            let dataBody = req.body
            return res.status(200).json({
                status: "Success",
                message: "Success",
                data: dataBody
            })
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = new TodoList()