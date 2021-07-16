import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import LearnLayout from '../../../layouts/learn'
import { learnPythonFilePaths, LEARN_PYTHON_PATH } from '../../../lib/mdxUtils'
import MDXComponents from '../../../components/MDXComponents'
import mdxPrism from 'mdx-prism'
import readingTime from 'reading-time'

export default function PostPage({ source, frontMatter }) {
    return (
        <LearnLayout frontMatter={frontMatter}>
            <MDXRemote {...source} components={MDXComponents} />
        </LearnLayout>
    )
}

export const getStaticProps = async ({ params }) => {
    const learnPythonPath = path.join(LEARN_PYTHON_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(learnPythonPath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
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