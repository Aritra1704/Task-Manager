const { calculatetip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculatetip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with defsult tip', () => {
    expect(calculatetip(10)).toBe(12.5)
})

test('Should fahrenheit to celsius', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Should celsius to fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })


test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})