const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const algoliasearch = require("algoliasearch/lite");

// node ./src/scripts/build-algolia-search.js

try {
    dotenv.config();

    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
        throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
    }

    if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
        throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
    }
} catch (error) {
    console.error(error);
    process.exit(1);
}

const CONTENT_PATH = path.join(process.cwd(), 'content/articles')
const contentFilePaths = fs
    .readdirSync(CONTENT_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

async function getAllBlogPosts() {
    const articles = contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(CONTENT_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return articles
}

function transformPostsToSearchObjects(articles) {
    const transformed = articles.map(article => {
        return {
            objectID: article.data.title,
            title: article.data.title,
            description: article.data.description,
            slug: article.filePath,
            tagsCollection: { tags: article.data.tags },
            date: article.data.publishedAt,
            type: 'article',
        };
    });

    return transformed;
}

const AUTHOR_PATH = path.join(process.cwd(), 'content/authors')
const authorFilePaths = fs
    .readdirSync(AUTHOR_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

async function getAllAuthors() {
    const authors = authorFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(AUTHOR_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return authors
}

function transformAuthorsToSearchObjects(authors) {
    const transformed = authors.map(article => {
        return {
            objectID: article.data.name,
            name: article.data.name,
            description: article.data.description,
            slug: article.filePath,
            type: 'author',
        };
    });

    return transformed;
}

const TAG_PATH = path.join(process.cwd(), 'content/tags')
const tagFilePaths = fs
    .readdirSync(TAG_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))

async function getAllTags() {
    const tags = tagFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TAG_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    })

    return tags
}

function transformTagsToSearchObjects(tags) {
    const transformed = tags.map(article => {
        return {
            objectID: article.data.title,
            title: article.data.title,
            description: article.data.description || '',
            slug: article.filePath,
            type: 'tag',
        };
    });

    return transformed;
}

(async function () {
    // initialize environment variables
    dotenv.config();

    try {
        const articles = await getAllBlogPosts();
        const authors = await getAllAuthors();
        const transformed = transformPostsToSearchObjects(articles);
        const transformedAuthors = transformAuthorsToSearchObjects(authors);
        const tags = await getAllTags();
        // add authors to the transformed array
        transformed.push(...transformedAuthors);
        // add tags to the transformed array
        transformed.push(...transformTagsToSearchObjects(tags));
        // console.log(transformed);

        // initialize the client with your environment variables
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY,
        );

        // initialize the index with your index name
        const index = client.initIndex("dev_content");

        const algoliaResponse = await index.saveObjects(transformed);

        console.log(`🎉 Successfully added ${algoliaResponse.objectIDs.length} records to Algolia search.`);
    }
    catch (err) {
        console.error(err);
    }
})();