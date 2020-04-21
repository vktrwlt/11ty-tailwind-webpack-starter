# 11ty TailwindCSS Webpack Starter

Check it out at [11ty-tailwind-webpack-starter.netlify.com](https://11ty-tailwind-webpack-starter.netlify.com/)

Features:

- [11ty](https://www.11ty.dev/) for templates and site generation
- [TailwindCSS](https://tailwindcss.com/) for a utility first CSS workflow
- [Webpack](https://webpack.js.org/) for optimizing our JS and CSS files
- [Babel](https://babeljs.io/) for ES6 support
- [PurgeCSS](https://purgecss.com/) for optimizing CSS output
- [HTML minifier](https://www.npmjs.com/package/html-minifier) to minify production HTML

## Prerequisites

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash

# install the project dependencies
npm install

# run the build and server locally
npm start

View the site at http://localhost:3000/
```

## Previewing the production build

When building for production, an extra build step will strip out all CSS classes not used in the site. This step is not performed during the automatic rebuilds which take place during dev.

```bash

# run the production build
npm run build
npm run serve
```

## Other Scripts

```bash

# check to see latest packages
npm run update-check

# update all to latest
npm run update

# run npm audit and add risky dependencies in resolutions
npm run preinstall
```
