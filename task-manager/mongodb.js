// CRUD operations

const mongodb = require('mongodb')
const MongoClient =  mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'tast-manager'

MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error, client)=>{
    if( error ) {
        return console.log('Unable to connect to database!')
    }

    console.log('Connected Correctly!')
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name : 'John',
    //     age :'26'
    // },(error,result) => {
    //     if(error) {
    //         return console.log('Unable to inser user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Chandler',
    //         age: '30'
    //     },
    //     {
    //         name: 'Momica',
    //         age: '29'
    //     }
    // ],(error, result)=>{
    //     if(error) {
    //         return console.log('Unable to insert docunments')
    //     }
    //     console.log(result.ops)
    // })


    db.collection('tasks').insertMany([
        {
            description: 'task1',
            completed: true            
        },
        {
            description: 'task2',
            completed: true      
        },
        {
            description: 'task3',
            completed: false      
        }

    ], (error, result)=>{
        if(error){
            return console.log('Unabke to insert task')
        }

        console.log(result.ops)
    })
})