const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

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

const bCrypt = require('bcryptjs')
const myfunc = async () => {
    const password = '123456Aa'
    const hashPass = await bCrypt.hash(password, 8)

    console.log(password)
    console.log(hashPass)

    const isMatch = await bCrypt.compare(password, hashPass)
    console.log(isMatch)
}

myfunc()
