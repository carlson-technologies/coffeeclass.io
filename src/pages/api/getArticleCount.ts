// a Next.js api route that gets the total article count

import * as fs from 'fs'
import * as path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getArticleCount(req: NextApiRequest, res: NextApiResponse) {
    const CONTENT_PATH: string = path.join(process.cwd(), 'content/articles')

    const count: number = fs
        .readdirSync(CONTENT_PATH)
        // Only include md(x) files
        .filter((path) => /\.mdx?$/.test(path))
        .length

    res.status(200).json({ count })
}