# svelte-vega

> `svelte` + `vega`|`vega-lite`

> See our [Storybook Demo](http://vega.github.io/svelte-vega/).

## Packages

### svelte-vega

The primary Svelte component for Vega and Vega-Lite which can be used in your Svelte application.

For documentation and installation instructions, go to [packages/svelte-vega](https://github.com/vega/svelte-vega/tree/main/packages/svelte-vega).

### Storybook

An interactive web demo of Svelte Vega and Vega-Lite components using `svelte-vega` with examples of updating data and chart variables.

### Sample Project

A full Svelte example project that uses `svelte-vega`.

If you are not sure how to integrate `svelte-vega` into your code, take a look at this example application.

### SvelteKit (Vite) Usage

SvelteKit uses Vite under the hood which performs an optimization process called dependency pre-building, which causes some (problems)[https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#what-is-going-on-with-vite-and-pre-bundling-dependencies] during development. To get Vite to work with svelte-vega update the SvelteKit's config as follows:

```js
const config = {
  kit: {
    target: "#svelte",
    vite: {
      optimizeDeps: {
        include: [
          "fast-deep-equal",
          "clone",
          "semver",
          "json-stringify-pretty-compact",
          "fast-json-stable-stringify",
        ],
      },
    },
  },
};
```