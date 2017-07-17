# Portal Driver - CMS

## Quick start
You must have `npm` and `node` version `>= 6.9.2` installed, if you don't have it already.
Then you'll need Typescript (`npm install -g typescript`).
And Gulp (`npm install -g gulp`).

1. Clone this project.
2. On your terminal move to the project folder.
3. Run `npm install`.
4. Then run `npm run dev`.

This will take care of:
- Installing all necessary dependencies.
- Watch for file changes.
- Compiling scss into css.
- Run a local express server using nodemon through browser sync (`http://localhost:1234`). It'll update your browser every time a file is modified across all your devices.
- Use Webpack for module bundling. Specifically for Angular 2.
