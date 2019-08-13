const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Artitra',
        email: 'aritra@test.com',
        password: '12346Aa'
    }).expect(201)
})