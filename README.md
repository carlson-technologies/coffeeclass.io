![coffeeclass.io header image](/public/github/readme.png)

# coffeeclass.io ☕

Learn programming and computer science for free.

## Project Overview

This website is a platform to learn to code. It is inspired by sites like [freeCodeCamp](https://www.freecodecamp.org), [CSS Tricks](https://css-tricks.com), [Fireship.io](https://fireship.io), [Smashing Magazine](https://www.smashingmagazine.com), and many others. Coffeeclass.io is open source and we encourage contributions to both the website and the content! Read on to learn more about the project.

### Quick Start

1. Clone this repo: `git clone https://github.com/carlson-technologies/coffeeclass.io.git`
2. Move into root (where this file is) and run `yarn`
3. (Optional) Create a `.env` file and copy into it the content of `.env.example`.
4. Run `yarn dev` to start the server
5. Navigate to http://localhost:3000

If you are creating a PR, **create a new branch**. Before you commit run `yarn build`. This will run the tests and make sure everything is working.

Note: If you are not planning on making a PR, you can run `rm -rf .git` to remove git tracking.

### Tech Stack Overview

- 🚀 Next.js - JS Framework
- 🎨 Tailwind - CSS Framework
- ☯️ Chakra UI - CSS Framework (in the process of switching to Tailwind)
- 📜 TypeScript (and some JavaScript) - Web language of choice
- 🧪 Jest - Testing
- ✍🏼 MDX - Stores content for articles, authors, courses, and tags
- 🔺 Vercel - Deployment
- 💻 GitHub - Version Control
- 📊 Google Analytics - Analytics
- 🔎 Algolia - Search

## Open Source

This entire project is open source. We encourage contributions! Read on to see how you can contribute.

### Contributing Content

If you want to contribute an article please follow the steps on https://benjamincarlson.notion.site/Contributing-to-Coffeeclass-io-27ab5e894368424a9c86a7f11555514b. Below is a quick guide to submit an article or start a new course.

#### Article

#### Course

Here are the steps to add a new course:

1. Add course to `courses.json`
2. Add json file in `configs/courses` folder
3. Import json and add it to `configMap` in `pages/courses/[course]/index.tsx`, `Components/Courses/Sidebar`, and `Components/Courses/Pagination`
4. Add folder to `content/courses` with at least one module

### Contributing to the Website

You can also contribute to the website itself. New features and bug fixes are always appreciated. Feel free to check out the [Roadmap 🚗](https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88) for future plans and what we're working on currently. If you see anything you want to tackle, feel free to leave a comment on the Roadmap user story and open a PR!

## Roadmap 🚗

Our roadmap is also our agile development process. View cards, see what we are working on, view future plans and more on the roadmap.

https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88

## Thanks

The following companies and services have given free services to this website. Go check them out!

[![Vercel](/public/github/vercel.png)](https://vercel.com/?utm_source=carlson-technologies&utm_campaign=oss)
[![Splitbee](/public/github/splitbee.png)](https://splitbee.io)
[![Algolia](/public/github/algolia.png)](https://www.algolia.com)
