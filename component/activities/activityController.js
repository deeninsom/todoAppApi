const { Activities } = require('../../models');

class Activity {
    async getActivity(req, res) {
        try {
            const activity = await Activities.findAll()
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
            const activity = await Activities.findOne({
                where: {
                    activity_id: req.params.id
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
            const { tittle, email } = req.body
            if (req.body.tittle === '') {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "title cannot be null",
                })
            }
            const activity = await Activities.create({
                tittle: tittle,
                email: email
            })
            res.status(201).json({
                status: "Success",
                message: "Success",
                data: activity
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: error.message });
        }
    }
    async updateActivity(req, res) {
        let id = req.params.id
        const activity = await activityModel.findOne({
            where: {
                activity_id: req.params.id
            }
        })
        if (!activity) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
        try {
            const { tittle, email } = req.body
            await activityModel.update(
                {
                    tittle: tittle,
                    email: email
                }, {
                where: {
                    activity_id: req.params.id
                }
            })
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
        const activity = await activityModel.findOne({
            where: {
                activity_id: req.params.id
            }
        })
        if (!activity) return res.status(404).json({ status: 'Not Found', message: `Activity with ID ${id} Not Found` })
        try {
            await activityModel.destroy({
                where: {
                    id: activity.id
                }
            })
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

module.exports = new Activity()