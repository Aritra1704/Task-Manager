const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidUpdate)
        return res.status(400).send()

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task)
            return res.status(404).send()

        return res.status(200).send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task)
            return res.status(404).send()

        return res.send(task)
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = router