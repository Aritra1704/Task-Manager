const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

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

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })
// app.use(router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

