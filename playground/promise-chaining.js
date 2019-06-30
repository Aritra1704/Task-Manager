require('../src/db/mongoose')
const User = require('../src/models/user')

//5d16480079d9f354b4869a29
// User.findByIdAndUpdate('5d164716da8bda49fcaec704', { age: 1 }).then((user) => {
//     console.log(user)

//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e )
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5d164716da8bda49fcaec704', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})