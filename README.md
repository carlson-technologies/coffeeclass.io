![coffeeclass.io header image](/public/readme.png)

# coffeeclass.io ☕

Learn programming and computer science for free.

## Project Overview

### Quick Start

1. Clone this repo
2. Move into root (where this file is) and run `yarn`
3. Create a `.env` file and copy into it the content of `.env.example`. It *will* run without these.
4. Run `yarn dev` to start the server
5. Navigate to http://localhost:3000
6. If you are creating a PR, create a new branch and before you commit run `yarn build`. This will run the tests and make sure everything is working.

### Tech Stack Overview

- 🚀 Next.js - Framework
- 🎨 Chakra UI - CSS Component Library
- 📜 TypeScript (and some JavaScript)
- 🧪 Jest - Testing
- ✍🏼 MDX - Database for Article, Authors, Courses, Tags
- 🔺 Vercel - Deployment
- 💻 GitHub - Version Control
- 📊 Google Analytics - Analytics
- 🐝 Splitbee - More Analytics

### Deep(er-ish) Dive

This repo is broken up into 4 main parts.

- `src`: This is the Next.js website.
- `content`: This is the content for the website stored in `mdx` files.
- `public`: This is the static assets for the website.
- `tests`: Jest unit tests for the website.

Inside the `src` folder, we have the following:

- `components`: Our UI components.
- `configs`: Various configuration files for courses.
- `pages`: Where the pages (routes) and api routes are stored.
- `scripts`: Stand alone scripts (DRY) and build scripts
- `styles`: Theme styles and Chakra UI default theme config.

## Open Source

This entire project is open source. We encourage contributions! Read on to see how you can contribute.

### Contributing an Article

If you want to contribute an article please follow the steps on https://www.coffeeclass.io/contribute/getting-started/

### Contributing to the Website

You can also contribute to the website itself. New features and bug fixes are always appreciated. Feel free to check out the [Roadmap 🚗](https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88) for future plans and what we're working on currently. If you see anything you want to tackle, feel free to leave a comment on the Roadmap user story and open a PR!

## Roadmap 🚗

Our roadmap is also our agile development process. View cards, see what we are working on, view future plans and more on the roadmap.

https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88

## Vercel

[Powered by ![Vercel Logo](/public/logos/vercel.png)](https://vercel.com/?utm_source=carlson-technologies&utm_campaign=oss)