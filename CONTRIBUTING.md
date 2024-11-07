## Contributing

Recommendations and requirements for how to best contribute to **svelte-vega**. As always, thanks for
contributing, and we hope these guidelines make it easier and shed some light on our approach and
processes.

### File organization

We use [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to manage versions and dependencies between packages in this monorepo.

```
svelte-vega/
  package.json
  ...
  packages/
    package1/
      package.json
      ...
      src/
      test/
      ...
      lib/
      esm/
      ...
    ...
```

### Development

#### Run sample

```sh
yarn sample
```

### Committing

This repository follows
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit
messages and has a `commitlint` hook which will require you to have the valid commit message before
committing.

You can use `cz` to help you create a commit message.
