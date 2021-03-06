const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


