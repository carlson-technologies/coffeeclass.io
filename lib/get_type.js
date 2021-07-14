// A switch function that returns a string representing the post type

export default function get_type(post_type) {
    switch (post_type) {
        case 'tutorial':
            return '/tutorials/'
        case 'snippet':
            return '/snippets/'
        case 'learn':
            return '/learn/'
    }
}