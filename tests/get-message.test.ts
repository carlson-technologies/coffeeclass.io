const getMessageTest = require('../src/scripts/get-message.ts')

test('Hour 8 (8am) returns Good Morning ☕', () => {
    expect(getMessageTest(8)).toBe('Good Morning ☕')
})

test('Hour 12 (12pm) returns Good Afternoon ☀️', () => {
    expect(getMessageTest(12)).toBe('Good Afternoon ☀️')
})

test('Hour 17 (5pm) returns Good Evening 🌙', () => {
    expect(getMessageTest(17)).toBe('Good Evening 🌙')
})