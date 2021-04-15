import fs from 'fs'
import path from 'path'

// SNIPPETS_PATH/TUTORIALS_PATH is useful when you want to get the path to a specific file
export const SNIPPETS_PATH = path.join(process.cwd(), 'content/snippets')
export const TUTORIALS_PATH = path.join(process.cwd(), 'content/tutorials')
export const LEARN_PYTHON_PATH = path.join(process.cwd(), 'content/learn/python')

// snippetsFilePaths/tutorialsFilePaths is the list of all mdx files inside the 
// SNIPPETS_PATH/TUTORIALS_PATH directory
export const snippetsFilePaths = fs
    .readdirSync(SNIPPETS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export const tutorialsFilePaths = fs
    .readdirSync(TUTORIALS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export const learnPythonFilePaths = fs
    .readdirSync(LEARN_PYTHON_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))