export default function TimeAgo(date: any): string {

    // if the date is in the future, return 'just now'
    if (date > new Date()) {
        return 'just now'
    }

    // if the date is in the past, return the time ago. Anything over 1 month ago will return the date in the format Month D, Yr
    const seconds = Math.floor((new Date().getTime() - date) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (seconds < 60) {
        if (seconds == 1) {
            return '1 second ago'
        } else {
            return `${seconds} seconds ago`
        }
    } else if (minutes < 60) {
        if (minutes == 1) {
            return '1 minute ago'
        } else {
            return `${minutes} minutes ago`
        }
    } else if (hours < 24) {
        if (hours == 1) {
            return '1 hour ago'
        } else {
            return `${hours} hours ago`
        }
    }
    else if (days < 30) {
        if (days == 1) {
            return '1 day ago'
        } else {
            return `${days} days ago`
        }
    }
    else {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
}