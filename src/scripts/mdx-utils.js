import fs from 'fs'
import path from 'path'

export const CONTENT_PATH = path.join(process.cwd(), 'content/articles')
export const AUTHORS_PATH = path.join(process.cwd(), 'content/authors')
export const TAGS_PATH = path.join(process.cwd(), "content/tags")
export const LEARN_CHAKRAUI_PATH = path.join(process.cwd(), 'content/course/chakra-ui')

// This is the list of all mdx files inside the directory
export const contentFilePaths = fs
    .readdirSync(CONTENT_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export const authorsFilePaths = fs
    .readdirSync(AUTHORS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const tagsFilePaths = fs
    .readdirSync(TAGS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const learnChakraUIFilePaths = fs
    .readdirSync(LEARN_CHAKRAUI_PATH)
    .filter((path) => /\.mdx?$/.test(path))