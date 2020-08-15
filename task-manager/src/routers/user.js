const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/test', (req,res)=>{
    res.send('From new file')
})



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)

    }
    catch(e) {
        res.status(400).send(e)
    }

})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    }
    catch(e) {
        res.status(500).send()
    }

})

router.patch('/users/:id', async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email', 'password', 'age']
    const isValidaOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidaOperation) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if( !user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
            res.status(400).send(e)
    }
})

router.get('/users/:id', async(req, res) => {
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

})


router.delete('/users/:id', async (req,res)=>{
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

module.exports = router

