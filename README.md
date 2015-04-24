# SPA Boilerplate [![Build Status](https://travis-ci.org/jfresco/spa-boilerplate.svg?branch=master)](https://travis-ci.org/jfresco/spa-boilerplate)

Single page isometric application project starter. Work in progress.

## Features
* ES6
* Express
* page.js
* Ability to share client and server code
* Uses `npm` as frontend and backend package manager (no `bower`, no `component`)
* `gulp` orchestrates the build process by doing the following:
  * Browserifies client side code
  * Transpiles Stylus to CSS
  * Concatenates and minifies JavaScript and CSS (environment-sensitive)
  * Sourcemaps
  * Transpiles ES6 to ES5 (not yet implemented)
  * Runs unit tests (with `mocha`)
  * Runs JS Linter
* CI ready

## Requirements
* Node.js + npm
* git

## Getting started
1. `git clone git@github.com:jfresco/spa-boilerplate.git`
2. `npm install`
3. `npm start`
4. Browse to http://localhost:8000

## To do list
- [ ] Revamp sample app
- [ ] Server side rendering
- [ ] Ugly `require` calls
- [ ] Consider some reactive library
- [ ] Add more tests
- [ ] Don't rely on environment variables