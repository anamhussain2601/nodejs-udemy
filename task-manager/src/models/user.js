const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.includes('password')) {
                throw new Error('Invalid Password')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if(value<0) {
                throw new Error('Age must be a positive number!')
            }
        }
    }
})

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('just befre saving')
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User