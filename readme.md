# Liferay Elm Generator
[![npm version](https://badge.fury.io/js/generator-liferay-elm.svg)](https://badge.fury.io/js/generator-liferay-elm)
[![Build Status](https://travis-ci.org/lgdd/generator-liferay-elm.svg?branch=master)](https://travis-ci.org/lgdd/generator-liferay-elm)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

A Yeoman generator for creating Liferay Elm projects, using the amazing [Create Elm App](https://github.com/halfzebra/create-elm-app) for a fast and easy development with no build configuration. To create a build for Liferay, it uses the `liferay-npm-bundler` from the very useful [Liferay JS Toolkit](https://github.com/liferay/liferay-js-toolkit#readme).

- [Installation](#installation)
- [Getting started](#getting-started)
- [Trying it locally](#trying-it-locally)
- [What is Elm?](#what-is-elm)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-liferay-elm using [npm](https://www.npmjs.com/) (assuming you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-liferay-elm
```

Then generate your new project:

```bash
yo liferay-elm
```

> You can also try it locally by cloning the repo and running `npm link` inside the project.

## Getting started

Once the project generated:

```bash
cd my-elm-project
yarn start
```

Build your app for Liferay:

```bash
yarn build:liferay
```

Deploy your app to Liferay:

```bash
yarn deploy:liferay
```

Run tests:
```bash
yarn test
# or in watch mode
yarn test --watch
```
> The first time, you might see this message: `INFO: Running elmi-to-json for the first time; downloading the actual binary`. Simply run the command again.

Install a new [package](https://package.elm-lang.org/) (e.g. `elm/svg`):
```bash
yarn run install elm/svg
```

This generator gives you scripts that are aliases to the one provided by Create Elm App (e.g. `yarn start` for `elm-app start`).
To learn more about the tasks available for your project, directly checkout this [guide](https://github.com/halfzebra/create-elm-app/blob/master/template/README.md).

## Trying it locally

If you to try this generator on your local machine, feel free to clone this repo and run the following commands:

```bash
# install dependencies:
yarn
# make it available for yeoman:
npm link
```

## What is Elm?

As the [official site](https://elm-lang.org/) states, Elm is __a delightful language for reliable webapps__. How? By providing features such as:

- No Runtime Exceptions
- Great Performance
- Enforced Semantic Versioning
- Small Assets
- JavaScript Interop

The best way to learn Elm is to follow the [official guide](https://guide.elm-lang.org/).
You can try Elm with this [online editor](https://elm-lang.org/try).

You can also checkout this non-exhaustive list of nice talks about Elm:
- [Why Elm?](https://www.youtube.com/watch?v=rU-W6557Dos)
- [Elm crash course - Building unbreakable webapps fast](https://www.youtube.com/watch?v=kEitFAY7Gc8)
- [Developer Happiness on the Front End with Elm](https://www.youtube.com/watch?v=kuOCx0QeQ5c)
- [Building UIs in the Dark](https://www.youtube.com/watch?v=sKxEwjKQ5zg)
- [Scaling Elm Apps](https://www.youtube.com/watch?v=DoA4Txr4GUs)
- [The life of a file](https://www.youtube.com/watch?v=XpDsk374LDE)

## License

[LGPL-3.0](LICENSE)
