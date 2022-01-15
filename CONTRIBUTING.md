# Contributing to `map-fns`

Thank you for your interest in `map-fns`! Any and all contributions are greatly appreciated.

## How can I contribute?

There are various way of contributing to the project. No contribution is too small.

 * [Reporting bugs](#Reporting-Bugs)
 * [Improving Docs and Examples](#Improving-Docs-and-Examples)
 * [Adding Functions](#Adding-Functions)


### Reporting Bugs

Bug reports are very much appreciated. We want `map-fns` to be as reliable as possible.

If you find a bug in the library then please create an issue! The issue should contain a reproducable example of the bug.


### Improving Docs and Examples

The better the documentation, the easier it is for users to get started with and understanding `map-fns`.

Here are a few ways of improving the documentation:

 * Making existing documentation more clear and concise. The shorter, the better.
 * Improving existing examples. Examples should be understandable at a glance.
 * Consistency throughout the documentation is important. This includes parameter naming, phrasing, comment style, etc.
 * Adding new examples for use cases that aren't covered yet.


### Adding Functions

`map-fns` is a collection of functions that make it easy to operate on key-value stores. `map-fns` covers many common operations (such as adding, removing and modifying entries), but there are definitely other uses cases that `map-fns` does not cover yet.

If you have an example of such a use case, please create an issue around it so it can be discussed!


## Contributing code

If contributing code to `map-fns`, here are some things to know.

 * [Testing your changes](#Testing-your-changes)
 * [Code style](#Code-style)
 * [Commit style](#Commit-style)
 * [Pull Requests](#Pull-Requests)


### Testing your changes

To run tests locally, use `npm run test`.

```bash
npm run test
```

You can run them in watch mode with `npm run test:watch`.

```bash
npm run test:watch
```

All new code contributions should include tests to verify their behavior and prevent future regressions.


### Commit style

This project follows [Semantic Versioning](https://semver.org/) and uses [Conventional Commits](https://www.conventionalcommits.org/).

```
# Patch release
fix(mapMap): fix bug when iterating over keys in mapMap

# Minor release
feat(mergeMaps): add mergeMaps function

# Major release
feat(transformMap): change order of arguments in transformMap function for consistency.

BREAKING CHANGE: changing order of arguments for transformMap breaks existing usage.
```


### Code style

This project uses [Prettier](https://prettier.io/) but it does not have an [ESLint](https://eslint.org/) config.

There is not a formal style guide in this project. Take a look at some of the functions in this project to get a sense for how code is structured.


### Pull Requests

There are not any existing guidelines around Pull Requests. However, I would like Pull Requests to include a small description of what the change is and why it is being made.
