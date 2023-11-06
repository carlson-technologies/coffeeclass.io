// returns a message based on the current time
export function getMessage(hour: number): string {
  if (hour < 12) {
    return 'Good Morning ☕'
  } else if (hour < 17) {
    return 'Good Afternoon ☀️'
  } else {
    return 'Good Evening 🌙'
  }
}
