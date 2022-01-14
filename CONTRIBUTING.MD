## Contributing

Recommendations and requirements for how to best contribute to **svelte-vega**. As always, thanks for
contributing, and we hope these guidelines make it easier and shed some light on our approach and
processes.

### File organization

The primary files for the `svelte-vega` package are in `src/lib/`.

The demo project is in `src/routes/`.

### Development

#### Run Demo Project

```sh
npm run dev
```

#### Build package

```sh
npx svelte-kit package
```

### Committing

This repository follows
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit
messages and has a `commitlint` hook which will require you to have the valid commit message before
committing.

You can use `cz` to help you create a commit message.
