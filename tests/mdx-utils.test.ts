import { COURSE_PATH } from '@/lib/scripts/mdx-utils'

import courses from '../configs/courses.json'

const { getCourseFilePaths } = require('../src/scripts/mdx-utils.ts')

// get an array of the slugs
const slugs = courses.routes.map(route => route.slug)

// getStaticPaths props for [module].tsx
const paths = getCourseFilePaths(COURSE_PATH)
  // Remove file extensions for page paths
  .map((path: any) => path.replace(/\.mdx?$/, ''))
  // Map the path into the static paths object required by Next.js
  .map((module: any) => ({
    params: {
      course: module.split('/').slice(-2)[0],
      module: module.split('/').pop()
    }
  }))

test('course params contains the correct course from a list of courses', () => {
  let correct: boolean = false

  // check each of the paths and make sure they each contain at least one element from the list of slugs
  paths.forEach((path: any) => {
    if (slugs.includes(path.params.course)) {
      correct = true
    }
  })

  expect(correct).toBe(true)
})
