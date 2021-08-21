// A function that takes in an author name and returns the slug
// The slug is all lower case and replaces all spaces with hyphens

export default function getAuthorSlug(authorName) {
    return authorName.toLowerCase().replace(/\s+/g, '-')
}