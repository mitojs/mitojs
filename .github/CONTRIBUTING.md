# Contributing

Use Node from `.node-version` and pnpm 12.16.1.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm verify
```

Build selected packages with `pnpm build --projects=@mitojs/browser,@mitojs/web`, watch workspace changes with `pnpm watch`, run unit tests with `pnpm unit`, and verify packed-package consumers with `pnpm test:packages`. Run the React, Vue 2/3 and browser integrations with `pnpm test:e2e` after building and packing the SDKs.

See [toolchain migration and validation](../docs/toolchain-migration.md) for the build architecture, browser installation, release and rollback procedures. SDK consumers continue to install the same npm package names and use their existing import and CDN paths.
