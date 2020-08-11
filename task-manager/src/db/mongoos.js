const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})


//defining a model
const User = mongoose.model('User',{
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

//creating an instance of the above model
const me = new User({
   name: '   Monica',
   age: 24,
   email: 'MONICA@gmail.com',
   password: 'abcdef0123!'
})


//saving the instance to the db 
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error!', error)
})


//****************************************** */
//defining a Task model
// const User = mongoose.model('Task',{
//     name: {
//         type : String
//     },
//     age: {
//         type: Number
//     }
// })

// //creating an instance of the above model
// const me = new User({
//     description: 'Jane',
//     completed: false
// })


// //saving the instance to the db 
// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!', error)
// })