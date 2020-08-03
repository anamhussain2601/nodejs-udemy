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
    db.collection('users').insertOne({
        name : 'John',
        age :'26'
    },(error,result) => {
        if(error) {
            return console.log('Unable to inser user')
        }
        console.log(result.ops)
    })
})