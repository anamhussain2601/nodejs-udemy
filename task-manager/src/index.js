const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

const multer = require('multer')
const { restart } = require('nodemon')
const upload = multer({
    dest: 'images',
    limits: {
        // fileSize: 1000000 //megabytes
    },
    fileFilter(req, file ,cb) {

        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a PDF'))
        }
        cb(undefined, true)
        // cb(new Error('file must be PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})

// const errorMiddleware = (req,res, next) => {
//     throw new Error('From my middleware')
// }

//server is configured to accept and save file that uploaded to it
app.post('/upload',upload.single('upload'), (req,res) => {
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


