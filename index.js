const express = require('express')
// import connectDb from './config/db.js'
const activityRoute = require("./component/activities/activityRoute");
const todoRoute = require('./component/todos/todoRoute');
// import todoRoute from "./component/todo/routes/todoRoute.js";
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 3030 

app.use(express.json())
app.use('/todolist.api.devcode.gethired.id', activityRoute, todoRoute)
// app.use('/todolist.api.devcode.gethired.id')

app.listen(PORT, ()=>{
    // connectDb
    console.log(`app running at http://localhost:${PORT}`)
})