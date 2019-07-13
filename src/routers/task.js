const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

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

router.get('/tasks', auth, async (req, res) => {
    try {
        // const task = await Task.find({owner: req.user._id})
        // res.status(201).send(task)
        await req.user.populate('tasks').execPopulate()
        res.status(201).send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({
            _id,
            owner: req.user._id
        })

        if(!task)
            return res.status(404).send()

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

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidUpdate)
        return res.status(400).send()

    try {
        // const task = await Task.findById(req.body.id)
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!task)
            return res.status(404).send()

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        return res.status(200).send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if(!task)
            return res.status(404).send()

        return res.send(task)
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = router