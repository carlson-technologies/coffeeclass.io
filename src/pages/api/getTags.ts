// a next.js api route that gets all tags

import * as fs from 'fs'
import * as path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const TAGS_PATH = path.join(process.cwd(), "content/tags")

const tagsFilePaths = fs
    .readdirSync(TAGS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export default async function getTags(req: NextApiRequest, res: NextApiResponse) {
    let tags : string[] = []

    for (const filePath of tagsFilePaths) {
        const tag = filePath.replace(/\.mdx?$/, '')
        tags.push(tag)
    }

    res.status(200).json({ tags })
}