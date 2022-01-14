# svelte-vega [![NPM version][npm-image]][npm-url]

> Easily use `vega` or `vega-lite` in `svelte` Svelte applications!

## Install

In your Svelte project, install `svelte-vega` with the following:

```bash
yarn add svelte-vega
```

or

```bash
npm install svelte-vega
```

[npm-image]: https://img.shields.io/npm/v/svelte-vega.svg
[npm-url]: https://npmjs.org/package/svelte-vega

### Svelte

If using SvelteKit, `svelte-vega` will work without additional setup.
For a regular Svelte project, add the JSON plugin:

```bash
npm i @rollup/plugin-json
```

Then, you must add the JSON plugin `@rollup/plugin-json` to your `rollup.config.js` file.

```javascript
import json from "@rollup/plugin-json"

...

export default {

 ...

  plugins: [
    json(),
  ]
}
```

## Example Code

The following contains code samples for Svelte Vega and Vega-Lite components using TypeScript.

<!-- For an example Svelte project using `svelte-vega`, see the [example application](https://github.com/vega/svelte-vega/tree/main/packages/sample-project). -->

### Svelte `<Vega>` Component

```typescript
<script lang="ts">
  import type { VisualizationSpec } from "svelte-vega";
  import { Vega } from "svelte-vega";

  const data = {
    table: [
      { category: "A", amount: 28 },
      { category: "B", amount: 55 },
      { category: "C", amount: 43 },
      { category: "D", amount: 91 },
      { category: "E", amount: 81 },
      { category: "F", amount: 53 },
      { category: "G", amount: 19 },
      { category: "H", amount: 87 },
    ],
  };

  // For an example, see https://github.com/vega/svelte-vega/blob/main/packages/storybook/stories/spec1.ts
  const spec: VisualizationSpec = // any vega spec.
</script>

<Vega {data} {spec} />
```

### Svelte `<VegaLite>` Component

```typescript
<script lang="ts">
  import type { VisualizationSpec } from "svelte-vega";
  import { VegaLite } from "svelte-vega";

  const data = {
    table: [
      { category: "A", amount: 28 },
      { category: "B", amount: 55 },
      { category: "C", amount: 43 },
      { category: "D", amount: 91 },
      { category: "E", amount: 81 },
      { category: "F", amount: 53 },
      { category: "G", amount: 19 },
      { category: "H", amount: 87 },
    ],
  };

  const spec: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "A simple bar chart with embedded data.",
    data: {
      name: "table",
    },
    mark: "bar",
    encoding: {
      x: { field: "category", type: "nominal" },
      y: { field: "amount", type: "quantitative" },
    },
  }
</script>

<VegaLite {data} {spec} />
```

## Development

The core code lives in `src/lib/`, with the example site in `src/routes/`.

To package a new version use `npx svelte-kit package`.

The package to be published will live in `package/`.

[npm-image]: https://img.shields.io/npm/v/svelte-vega.svg
[npm-url]: https://npmjs.org/package/svelte-vega
