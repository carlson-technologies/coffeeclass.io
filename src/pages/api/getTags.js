// a next.js api route that gets all tags

import fs from 'fs'
import path from 'path'

const TAGS_PATH = path.join(process.cwd(), "content/tags")

const tagsFilePaths = fs
    .readdirSync(TAGS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export default async function getTags(req, res) {
    let tags = []

    for (const filePath of tagsFilePaths) {
        const tag = filePath.replace(/\.mdx?$/, '')
        tags.push(tag)
    }

    res.status(200).json({ tags })
}