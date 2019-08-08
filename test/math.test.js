const { calculatetip } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculatetip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with defsult tip', () => {
    expect(calculatetip(10)).toBe(12.5)
})