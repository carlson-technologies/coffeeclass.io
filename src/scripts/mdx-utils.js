import fs from 'fs'
import path from 'path'

// SNIPPETS_PATH/TUTORIALS_PATH is useful when you want to get the path to a specific file
export const SNIPPETS_PATH = path.join(process.cwd(), 'content/snippets')
export const TUTORIALS_PATH = path.join(process.cwd(), 'content/tutorials')
export const LEARN_PYTHON_PATH = path.join(process.cwd(), 'content/learn/python')
export const LEARN_CHAKRAUI_PATH = path.join(process.cwd(), 'content/learn/chakra-ui')
export const AUTHORS_PATH = path.join(process.cwd(), 'content/authors')

// snippetsFilePaths/tutorialsFilePaths is the list of all mdx files inside the 
// SNIPPETS_PATH/TUTORIALS_PATH directory
export const snippetsFilePaths = fs
    .readdirSync(SNIPPETS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export const tutorialsFilePaths = fs
    .readdirSync(TUTORIALS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const learnPythonFilePaths = fs
    .readdirSync(LEARN_PYTHON_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const learnChakraUIFilePaths = fs
    .readdirSync(LEARN_CHAKRAUI_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const authorsFilePaths = fs
    .readdirSync(AUTHORS_PATH)
    .filter((path) => /\.mdx?$/.test(path))