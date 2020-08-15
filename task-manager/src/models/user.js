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
        unique: true, //  guarantees uniqueness
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

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email : email})

    if(!user) {
        throw new Error ('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error ('Unable to login')
    }

    return user
}


//Hash the plain text password befor saving
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