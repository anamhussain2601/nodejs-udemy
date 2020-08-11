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

    const updatePromise = db.collection('users').updateOne({
        _id: new Object('5f3171b866a195171d11c658')
    },{
        $set:{
            name: 'Joe'
        }
    })

    updatePromise.then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})