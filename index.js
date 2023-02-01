const express = require('express')

const activityRoute = require("./component/activities/activityRoute");
const todoRoute = require('./component/todos/todoRoute');

require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 3030 

app.use(express.json())
app.use('/todolist.api.devcode.gethired.id', activityRoute, todoRoute)


app.listen(PORT, ()=>{
    // connectDb
    console.log(`app running at http://localhost:${PORT}`)
})