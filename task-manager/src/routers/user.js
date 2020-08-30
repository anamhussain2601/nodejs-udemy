const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

const multer = require('multer')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

// router.get('/users', auth, async (req,res)=>{
//     try{    
//         const users = await User.find({})
//         res.send(user)

//     }catch(e){
//         res.status(500).send()
//     }
// })

router.post('/user/logout', auth, async(res,req)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
    }catch(e){
        res.status(500).send()
    }
})


router.post('/user/logoutAll', auth, async(res,req)=>{
    try{
        req.user.tokens = []

        await req.user.save()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload and image'))
        }

        cb(undefined, true)
    }
})


router.post('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
    // try{
    //     res.send()
    // }catch(e){
    //     req.status(400).send()
    // }

    req.user.avatar = req.file.buffer
    await req.user.save()

    res.send()
},(error, req,res,next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
},(error, req,res,next) => {
    res.status(400).send({error: error.message})
})


router.get('/users/:id/avatar', async (req,res) => {
    try{

        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)


    }catch(e){
        res.status(404).send()
    }
})



module.exports = router