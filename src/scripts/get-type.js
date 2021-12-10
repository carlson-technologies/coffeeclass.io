// A switch function that returns a string representing the post type

export default function getType(post_type) {
    switch (post_type) {
        case 'tutorial':
            return '/articles/'
        case 'snippet':
            return '/snippets/'
        case 'learn':
            return '/courses/'
    }
}