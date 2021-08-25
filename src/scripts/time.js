// the current year

var d = new Date()
export var year = d.getFullYear()


// a switch statement that gets the current time and returns morning, afternoon, or evening

var hours = d.getHours()

export function getMessage() {
    switch (true) {
        case hours > 17:
            return "Good Evening 🌙"
        case hours > 12:
            return "Good Afternoon ☀️"
        case hours > 6:
            return "Good Morning ☕"
        default:
            return "Good Evening 🌙"
    }
}

// export default [ year, getMessage() ]