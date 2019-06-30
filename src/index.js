const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
    
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)

    // })
})

app.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.status(201).send(user)
    } catch(e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        res.status(201).send(user)
    } catch(e) {
        res.status(500).send(e)
    }

    // User.findById(_id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send()
    //     }
            
    //     res.status(200).send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    console.log(req.params)
}) 

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)

    // })
})

app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
    console.log(req.params)
}) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
