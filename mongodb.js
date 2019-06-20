//CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

//Destructuring mongoDB
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    //   //Delete Method  Are you Aditya?
    db.collection('tasks').deleteOne({
        description: 'Are you Aditya?'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
    // db.collection('tasks').deleteOne({
    //     _id: new ObjectID('5cea6568243fd0517c05fb94')
    // }).then((result) => {
    //     console.log(result.deletedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // db.collection('users').deleteMany({
    //     age: 30
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    //   // Update method
    // const updateManyPromise = db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // })

    // updateManyPromise.then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5cea622f0895745070c776c7')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    //     // $set: {
    //     //     name: 'Ranjan'
    //     // }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').findOne({_id: new ObjectID("5cea6272311ad25154ec7986")}, (error, user) => {
    //     if(error)
    //         console.log('Unable to connect to database')

    //     console.log(user)
        
    // })
    // db.collection('users').findOne({name: 'Bhuto', age: 1}, (error, user) => {
    //     if(error)
    //         console.log('Unable to connect to database')

    //     console.log(user)
    
    // })

    // db.collection('users').find({age: 30}).toArray((error, users) => {
    //     if(error)
    //         console.log('Unable to connect to database')

    //     console.log(users)
    // })

    // db.collection('users').find({age: 30}).count((error, users) => {
    //     if(error)
    //         console.log('Unable to connect to database')

    //     console.log(users)
    // })

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Bhuto',
    //     age: 30
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('UNable to insert result!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Ranjan',
    //         age: 29
    //     },
    //     {
    //         name: 'Jeet',
    //         age: 28
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert users!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Are you Aritra?',
    //         completed: true
    //     },
    //     {
    //         description: 'Are you Aditya?',
    //         completed: false
    //     },
    //     {
    //         description: 'Are you Jeet?',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert the datas')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID("5cea6568243fd0517c05fb94")}, (error, task) => {
    //     if(error)
    //         console.log('Unable to connect to db')

    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error)
    //         console.log('Unable to connect to db')

    //     console.log(tasks)
    // })
})