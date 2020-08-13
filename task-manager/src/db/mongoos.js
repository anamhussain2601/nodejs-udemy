const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
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
