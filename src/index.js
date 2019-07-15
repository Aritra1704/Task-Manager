const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// app.use((req, res, next) => {
//     if(req.method == 'GET') {
//         res.send('GET requestes are disabled')
//     } else {
//         next()
//     }
//     // console.log(req.method, req.path)
//     // next()
// })

// app.use((req, res, next) => {
//     res.status(503).send('The site is under maintenance')
// })

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000 // 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }

//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {// Set of arguments necessary so that express undertands the error is handled properly
//     res.status(400).send({ error: error.message })
// })



// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })
// app.use(router)



// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5d299b9b6b3da05948502ab5')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5d2998d915c17d16ac445ecb')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()