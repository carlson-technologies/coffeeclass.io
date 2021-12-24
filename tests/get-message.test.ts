const { getMessage } = require('../src/scripts/get-message.ts')

test('Hour 8 (8am) returns Good Morning ☕', () => {
    expect(getMessage(8)).toBe('Good Morning ☕')
})

test('Hour 12 (12pm) returns Good Afternoon ☀️', () => {
    expect(getMessage(12)).toBe('Good Afternoon ☀️')
})

test('Hour 17 (5pm) returns Good Evening 🌙', () => {
    expect(getMessage(17)).toBe('Good Evening 🌙')
})

export { }