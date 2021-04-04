import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import MDXComponents from '../../components/MDXComponents'

export default function PostPage({ source, frontMatter }) {
    const content = hydrate(source, { MDXComponents })
    return (
        <Layout>
            <div>
                <h1>{frontMatter.title}</h1>
                <p>{frontMatter.description}</p>
            </div>
            <main>{content}</main>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
    const snippetsPath = path.join(POSTS_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(snippetsPath)

    const { content, data } = matter(source)

    const mdxSource = await renderToString(content, {
        MDXComponents,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }))

    return {
        paths,
        fallback: false,
    }
}