const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt = require('jsonwebtoken')
const myFunction = async () => {
    
    const token = jwt.sign({ _id: 'abc123' },'thisismynewcourse', {expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token,'thisismynewcourse')
    console.log(data)
}

myFunction()

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
