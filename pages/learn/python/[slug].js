import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import LearnLayout from '../../../layouts/learn'
import { learnPythonFilePaths, LEARN_PYTHON_PATH } from '../../../utils/mdxUtils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    return (
        <LearnLayout frontMatter={frontMatter}>
            {content}
        </LearnLayout>
    )
}

export const getStaticProps = async ({ params }) => {
    const learnPythonPath = path.join(LEARN_PYTHON_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(learnPythonPath)

    const { content, data } = matter(source)

    const mdxSource = await renderToString(content, {
        MDXComponents,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [
                require('remark-code-titles'),
                require('remark-autolink-headings')
            ],
            rehypePlugins: [mdxPrism],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: {
                readingTime: readingTime(content),
                ...data
            },
        },
    }
}

export const getStaticPaths = async () => {
    const paths = learnPythonFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}