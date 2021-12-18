// returns a message based on the current time
function getMessage(hour) {
    if (hour < 12) {
        return 'Good Morning ☕'
    } else if (hour < 17) {
        return 'Good Afternoon ☀️'
    } else {
        return 'Good Evening 🌙'
    }
}

module.exports = getMessage