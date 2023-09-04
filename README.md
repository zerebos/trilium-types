# trilium-types

A [TypeScript](https://www.typescriptlang.org/) `@types` package for [Trilium Notes](https://github.com/zadam/trilium).

## Installation

```sh
npm install @types/trilium@npm:trilium-types
```

## Usage

**Please note:** These types were made for the *latest* version of Trilium (v0.61) which adds the attachments feature. If you're developing for the stable release (v0.60) you can still use these types, just avoid or ignore anything related to attachments.

### TypeScript

The Trilium frontend `api` will automatically be available in all files since working with the frontend is the most common use-case. You can easily override this with the backend api if needed:

```js
import {BackendAPI} from "trilium/backend";

declare const api: BackendAPI;
```

Otherwise, all the types should be available under `trilium/frontend`, `trilium/backend`, and `trilium/common`.

### JavaScript

Similarly to in TypeScript, your IDE (like VSCode) should automatically pick up `api` as the frontend. You can override this using JSDoc syntax. First, make sure your IDE and/or linter are setup to allow an `api` global, then you can do.
```js
/**
 * @type {import("trilium/backend").BackendAPI}
 */
const api = api;
```

For other types, you can follow the same methodology and use the JSDoc syntax with `import`.


## Why?

Because it's nice to have autocompletion and type recognition whether you're using JS or TS.

### Why not [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/)?

I chose not to try to push this to DefinitelyTyped because I'm still an amateur when it comes to TypeScript and writing custom type definitions. They tend to have a quality requirement that I don't think I would meet.


## Links

Check out my other Trilium-based projects:
- [Trilium Markdown Preview](https://github.com/rauenzi/Trilium-MarkdownPreview/)
- [Trilium Breadcrumbs](https://github.com/rauenzi/Trilium-Breadcrumbs)

Want more? Be sure to check out the [Awesome Trilium](https://github.com/Nriver/awesome-trilium) list!