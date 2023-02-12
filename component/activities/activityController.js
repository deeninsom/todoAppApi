const { activities } = require('../../models');


class Activity {
    async getActivity(req, res) {
        try {
            const activity = await activities.findAll()
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: activity
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: error.message });
        }
    }
    async getActivityById(req, res) {
        let id = req.params.id
        try {
            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!activity) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: activity
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
    async postActivity(req, res) {
        try {
            const { title, email } = req.body
            if (!req.body.title) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title cannot be null",
                })
            }
            const activity = await activities.create({
                title: title,
                email: email
            })
            res.status(201).json({
                status: "Success",
                message: "Success",
                data: activity
            })
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: "title cannot be null",
            });
        }
    }
    async updateActivity(req, res) {
        let id = req.params.id
        try {
            if (!req.body.title) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title is required",
                })
            }
             await activities.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const activity = await activities.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!activity) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: activity
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
    async deleteActivity(req, res) {
        let id = req.params.id
        try {
            let data = await activities.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!data) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
            let dataBody = req.body
            res.status(200).json({
                status: "Success",
                message: "Success",
                data : dataBody
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}

module.exports = new Activity()