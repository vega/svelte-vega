# svelte-vega [![NPM version][npm-image]][npm-url]

> Easy usage of `vega` or `vega-lite` in `svelte` applications!

> See our [Storybook Demo](http://vega.github.io/svelte-vega/).

## Install

```bash
npm install svelte-vega --save
```

[npm-image]: https://img.shields.io/npm/v/svelte-vega.svg?style=flat-square
[npm-url]: https://npmjs.org/package/svelte-vega

## Example Code

The following contains code samples assuming you installed our package.
For a example svelte project, see our [other package](https://github.com/vega/svelte-vega/tree/main/packages/sample-project).

### Svelte `<Vega>` Component

```typescript
<script lang="ts">
  import { Vega } from "svelte-vega";
  import type { VisualizationSpec } from "vega-embed";

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
  const spec: VisualizationSpec = // any vega spec.
  // for an example, see https://github.com/vega/svelte-vega/blob/main/packages/storybook/stories/spec1.ts
</script>

<Vega {data} {spec} />
```

### Svelte `<VegaLite>` Component

```typescript
<script lang="ts">
  import { VegaLite } from "svelte-vega";
  import type { VisualizationSpec } from "vega-embed";

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
