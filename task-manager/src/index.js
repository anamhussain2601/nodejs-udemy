const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const bcrypt = require('bcrypt')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
