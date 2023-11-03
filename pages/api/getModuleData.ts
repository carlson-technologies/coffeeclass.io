import matter from 'gray-matter'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs'
import * as path from 'path'

export default async function getModules(req: NextApiRequest, res: NextApiResponse) {
  const MODULE = req.query.module

  if (!MODULE) return res.status(400).json({ error: '`module` is required!' })

  // if module is not in the form /courses/chakra-ui/course-introduction return "wrong form"
  if (!MODULE.toString().match(/^\/courses\/[^/]+\/[^/]+$/))
    return res
      .status(400)
      .json({ error: '`module` must be in the form /courses/course-name/module-name' })

  const path = `${process.cwd()}/content${MODULE}.mdx`

  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = await fs.promises.readFile(path, 'utf8')

  const { content, data } = matter(module)

  const frontMatter = {
    data,
    content
  }

  const publishedAt = new Date(frontMatter.data.publishedAt)
  const updatedAt = new Date(frontMatter.data.updatedAt)

  // if publishedAt is less than 2 weeks ago, return 'new'
  if (publishedAt.getTime() > Date.now() - 1209600000) {
    return res.status(200).json({
      tag: 'new',
      color: 'green'
    })
  }

  // if updatedAt is less than 2 weeks ago, return 'recently updated'
  if (updatedAt.getTime() > Date.now() - 1209600000) {
    return res.status(200).json({
      tag: 'recently updated',
      color: 'yellow'
    })
  }

  return res.status(200).json({ tag: 'no tag' })
}
