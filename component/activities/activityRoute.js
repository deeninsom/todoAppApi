const express  =  require('express');
const activityController = require('./activityController');
const activityRoute = express.Router()

activityRoute.get('/activity-groups', activityController.getActivity)
activityRoute.get('/activity-groups/:id', activityController.getActivityById)
activityRoute.post('/activity-groups', activityController.postActivity)
activityRoute.patch('/activity-groups/:id', activityController.updateActivity)
activityRoute.delete('/activity-groups/:id', activityController.deleteActivity)

module.exports = activityRoute