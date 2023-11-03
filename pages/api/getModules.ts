import type { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs'
import * as path from 'path'

export default async function getModules(req: NextApiRequest, res: NextApiResponse) {
  const COURSE = req.query.course

  if (!COURSE) return res.status(400).json({ error: '`course` is required!' })

  let COURSE_PATH: string = path.join(process.cwd(), 'content/courses', COURSE.toString())

  if (!fs.existsSync(COURSE_PATH)) return res.status(404).json({ error: `${COURSE} not found!` })

  const moduleCount = fs.readdirSync(COURSE_PATH).filter(path => /\.mdx?$/.test(path)).length

  return res.status(200).json({ moduleCount })
}
