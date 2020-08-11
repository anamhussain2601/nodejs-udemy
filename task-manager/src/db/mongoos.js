const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})


//defining a model
const User = mongoose.model('User',{
    name: {
        type : String
    },
    age: {
        type: Number
    }
})

//creating an instance of the above model
const me = new User({
    name: 'Jane',
    age: 'doe'
})


//saving the instance to the db 
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error!', error)
})