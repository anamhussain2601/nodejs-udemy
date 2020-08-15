const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


router.get('/test1', (req,res)=>{
    res.send('From a  new file')
})


router.post('/tasks', async(req, res) => {

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

module.exports = router

