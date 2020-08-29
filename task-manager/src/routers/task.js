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
        // const tasks =  await Task.find({})
        await task.save()
        res.status(201).send(task)
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

//Get /tasks?completed=true
//Get /tasks?limit=10&skip=0
//Get /tasks?sortBy=createdAt_asc

//asc = 1 and desc = -1
router.get('/tasks', auth, async (req, res)=>{

    const match= {}
    const sort= {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        console.log(parts)
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort:{
                //     // createdAt: -1
                //     // completed: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/tasks/:id', auth, async (req, res)=>{
    const _id =  req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if(!task) {
            return res.status(404).send
        }

        res.send(task)
    }catch(e) {
        res.send(500).send()
    }
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

