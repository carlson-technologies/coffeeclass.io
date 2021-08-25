# coffeeclass.io ☕

Learn programming and computer science for free.

## Project Overview

This repo is broken up into 3 main parts.

- `src`: This is the Next.js website.
- `content`: This is the content for the website stored in `mdx` files.
- `public`: This is the static assets for the website.

Inside the `src` folder, we have the following:

- `components`: Our UI components.
- `configs`: Various configuration files.
- `layouts`: Each `mdx` file is mapped to it's corresponding layout.
- `pages`: Where the pages (routes) and api routes are stored.
- `scripts`: JS helper functions.
- `styles`: Theme styles and Chakra UI default theme config.

## Open Source

This entire project is open source. We encourage contributions! Read on to see how you can contribute.

### Contributing an Article

If you want to contribute an article please follow the steps below.

1. Clone the repo: `git clone https://github.com/carlson-technologies/coffeeclass.io.git`.
2. Open the project in your IDE.
3. Run `yarn` to install dependencies.
4. Create a new branch! `git checkout -b branch-name-here`. The branch name is not too important but it should be short and reflect the article in some way. e.g. If you are creating a snippet on how to use `useState` in React, you might name the branch `snippet-react-usestate`.
5. Add the `mdx` file to the content folder. If you are creating a snippet, add it to the snippet folder. If you are creating a tutorial add it to the tutorial folder. If you are adding to the learn section, please refer to the [Roadmap 🚗](https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88) to see what is currently being worked on.
6. Add your info to `authors.json`. This can be found inside the configs folder.
7. Push up the branch! `git push origin branch-name`.

Have an article you want to submit but don't want to create a pull request? Feel free to email us the article and we'll add it for you. Contact: ben@carlsontechnologies.dev

### Contributing to the Website

You can also contribute to the website itself. New features and bug fixes are always appreciated. Feel free to check out the [Roadmap 🚗](https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88) for future plans and what we're working on currently.

## Roadmap 🚗 

https://benjamincarlson.notion.site/609b8bb171844146a9bcd9fbabd171a8?v=341de17fff6149bea36dbafbe2f2cf88

[Powered by ![Vercel Logo](/public/vercel/logotype/dark/vercel-logotype-dark.png)](https://vercel.com/?utm_source=carlson-technologies&utm_campaign=oss)