require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d164c76833b2f46bcc80f2b').then((task) => {
//     console.log(task)

//     return Task.countDocuments( {completed: false })
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5d0b0e37dfa3983d24e3ad97').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
