const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 8000

// app.use((req,res,next)=>{
//     if(req.method === 'GET') {
//         res.send('GET request are disabled')
//     }else {
//         next()  // route hanlders work as it is
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently down. check back soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const pet =