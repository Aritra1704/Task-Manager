const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/accounts')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
    
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)

    // })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send( )
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try { 
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // try {
    //     const user = await User.find({})
    //     res.status(201).send(user)
    // } catch(e) {
    //     res.status(500).send(e)
    // }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         res.status(201).send(user)
//     } catch(e) {
//         res.status(500).send(e)
//     }

//     // User.findById(_id).then((user) => {
//     //     if(!user) {
//     //         return res.status(404).send()
//     //     }
            
//     //     res.status(200).send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
//     console.log(req.params)
// }) 

router.patch('/users/me', auth, async (req, res) => {
    //To validate if the req param is available in the object
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if(!user) {
        //     return res.status(404).send()
        // }

        return res.send(user)
    } catch (e) {
        return res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user)
        //     return res.status(404).send()
        
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        return res.send(req.user)
    } catch (e) {
        return res.status(500).send()
    }
})

// router.get('/test', (req, res) => {
//     res.send('From a new file')
// })

const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize: 1000000 // 1 MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload either jpg, jpeg or png files'))

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.status(200).send()
    } catch(e) {
        return res.status(500).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.param.id)
        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        return res.status(404).send()
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router
