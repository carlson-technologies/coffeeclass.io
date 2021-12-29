import * as fs from 'fs'
import * as path from 'path'

/* 
* Relative paths to the mdx files. We have paths for the articles, authors, tags, and courses
* If we wanted the path to the chakra-ui course for instance, we could use "COURSE_PATH + '/chakra-ui" 
*/
export const CONTENT_PATH: string = path.join(process.cwd(), 'content/articles')
export const AUTHORS_PATH: string = path.join(process.cwd(), 'content/authors')
export const TAGS_PATH: string = path.join(process.cwd(), "content/tags")
export const COURSE_PATH: string = path.join(process.cwd(), "content/courses")


/* Get's all mdx files for the folder passed in. It will go down 2 levels max
* Parameters:
*   coursePath: the path to the folder we want to get the files from
* Returns:
*   an array of all the mdx files in the folder
*/
export const getCourseFilePaths = (coursePath: string): string[] => {
    const courseFiles: string[] = fs.readdirSync(coursePath)
    const courseFilePaths: string[] = []
    courseFiles.forEach((courseFile: string) => {
        const courseFilePath: string = path.join(coursePath, courseFile)
        if (fs.lstatSync(courseFilePath).isDirectory()) {
            const courseFilePathsInCourse: string[] = fs.readdirSync(courseFilePath)
            courseFilePathsInCourse.forEach((courseFilePathInCourse: string) => {
                if (courseFilePathInCourse.endsWith('.mdx')) {
                    courseFilePaths.push(path.join(courseFilePath, courseFilePathInCourse))
                }
            })
        } else {
            courseFilePaths.push(courseFilePath)
        }
    })
    return courseFilePaths
}


/* get the course folders
* Parameters:
*   coursePath: the path to the course directory
* Returns:
*   an array of the course folders
*/
export const getCourseFolders = (coursePath: string): string[] => {
    const courseFiles: string[] = fs.readdirSync(coursePath)
    const courseFolders: string[] = []
    courseFiles.forEach((courseFile: string) => {
        const courseFilePath: string = path.join(coursePath, courseFile)
        if (fs.lstatSync(courseFilePath).isDirectory()) {
            courseFolders.push(courseFile)
        }
    })
    return courseFolders
}


// This is the list of all mdx files inside the directory
export const contentFilePaths: string[] = fs
    .readdirSync(CONTENT_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

export const authorsFilePaths: string[] = fs
    .readdirSync(AUTHORS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const tagsFilePaths: string[] = fs
    .readdirSync(TAGS_PATH)
    .filter((path) => /\.mdx?$/.test(path))

export const courseFilePaths: string[] = fs
    .readdirSync(COURSE_PATH)
    .filter((path) => /\.mdx?$/.test(path))