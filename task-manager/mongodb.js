// CRUD operations

// const mongodb = require('mongodb')
// const MongoClient =  mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'tast-manager'

const id = new ObjectID()
console.log(id.getTimestamp(), id.id, id.id.length, id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({name: 'Jane'}, (error, user)=>{


    //     if(error) {
    //         console.log('Unable to fetch!')
    //     }
    //     console.log(user)

    // })

    db.collection('users').find({ age: '26' }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: '26' }).count((error, users) => {
        console.log(users)
    })



    db.collection('tasks').findOne({_id: new Object('5f3171320ad87816c52192fc')}, (error, task)=>{
        if(error) {
            console.log('Unable to fetch!')
        }
        console.log(task)

    })
    

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            console.log('Unable to fetch!')
        }
        console.log(tasks,'tasks')
    })

})