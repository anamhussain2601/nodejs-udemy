const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

//server is configured to accept and save file that uploaded to it
app.post('/upload',upload.single('upload'), (req,res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


