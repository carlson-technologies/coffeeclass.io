export const GA_TRACKING_ID : string = 'G-YRZVCRL57W'

declare global {
    interface Window {
        gtag: any
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event =  (action : string, category : string, label : string, value : number) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}