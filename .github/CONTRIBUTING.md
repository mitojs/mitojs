# Contributing

Use Node from `.node-version` and pnpm 12.16.1.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm verify
```

Build selected packages with `pnpm build browser web`, run unit tests with `pnpm unit`, and run packed-consumer integration checks with `pnpm test:consumers`.

See [toolchain migration and validation](../docs/toolchain-migration.md) for the build architecture, legacy demo runtimes, browser installation, release and rollback procedures. SDK consumers continue to install the same npm package names and use their existing import and CDN paths.
