const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


router.get('/test1', (req,res)=>{
    res.send('From a  new file')
})


router.post('/tasks',auth, async(req, res) => {

    const task  = new Task({
        ...req.body,
        owner: req.user._id
    })


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

router.patch('/task/:id', async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidaOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidaOperation) {
        return res.status(400).send({error : 'Invalid Updates'})
    }

    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((updates)=>{
            task[update] = req.body(update)
        })

        await task.save()

        if(!task){
            return res.status(404).send
        }

    }catch(e){
        res.status(500).send()
    }
})

module.exports = router

