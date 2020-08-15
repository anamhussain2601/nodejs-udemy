const express = require('express')
require('./db/mongoos')   // simply runs and make sure that mongoose connect to th db.
const User = require('./models/user')
const Task = require('./models/task')
const { restart } = require('nodemon')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)

    }
    catch(e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    }
    catch(e) {
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.patch('/users/:id', async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email', 'password', 'age']
    const isValidaOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidaOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if( !user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
            res.status(400).send(e)
    }
})

app.get('/users/:id', async(req, res) => {
    const _id = req.params.id


    try {
        const user = await User.findById(_id)
        if( !user ) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e) {
        res.status(500).send()
    }
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)

    // }).catch(() => {
    //     res.status(500).send()
    // })
})


app.delete('/users/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)

    }catch(e) {
        res.status(500).send()
    }
})

app.post('/tasks', async(req, res) => {

    try {
        const tasks =  await Task.find({})
        res.send(tasks)
    }
    catch(e) {
        res.status(500).send()
    }
    // const task = new Task(req.body)

    // task.save().then(() => {
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
