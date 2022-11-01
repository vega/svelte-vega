<script lang="ts">
  import { Vega, VegaLite } from "svelte-vega";
  import type { VisualizationSpec, View } from "svelte-vega";

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

  let viewVL: View;
  let specVL: VisualizationSpec = {
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
  };

  let viewV: View;
  const specV: VisualizationSpec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width: 400,
    height: 200,
    padding: { left: 5, right: 5, top: 5, bottom: 5 },

    data: [
      {
        name: "table",
      },
    ],

    signals: [
      {
        name: "tooltip",
        value: {},
        on: [
          { events: "rect:mouseover", update: "datum" },
          { events: "rect:mouseout", update: "{}" },
        ],
      },
    ],

    scales: [
      {
        name: "xscale",
        type: "band",
        domain: { data: "table", field: "category" },
        range: "width",
      },
      {
        name: "yscale",
        domain: { data: "table", field: "amount" },
        nice: true,
        range: "height",
      },
    ],

    axes: [
      { orient: "bottom", scale: "xscale" },
      { orient: "left", scale: "yscale" },
    ],

    marks: [
      {
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "xscale", field: "category", offset: 1 },
            width: { scale: "xscale", band: 1, offset: -1 },
            y: { scale: "yscale", field: "amount" },
            y2: { scale: "yscale", value: 0 },
          },
          update: {
            fill: { value: "steelblue" },
          },
          hover: {
            fill: { value: "red" },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            align: { value: "center" },
            baseline: { value: "bottom" },
            fill: { value: "#333" },
          },
          update: {
            x: { scale: "xscale", signal: "tooltip.category", band: 0.5 },
            y: { scale: "yscale", signal: "tooltip.amount", offset: -2 },
            text: { signal: "tooltip.amount" },
            fillOpacity: [
              { test: "datum === tooltip", value: 0 },
              { value: 1 },
            ],
          },
        },
      },
    ],
  };

  $: viewVL ? console.log("Vega-Lite view: ", viewVL.data("table")) : "";
  $: viewV ? console.log("Vega view: ", viewV.data("table")) : "";
</script>

<main>
  <Vega {data} spec={specV} bind:view={viewV} />
  <VegaLite {data} spec={specVL} bind:view={viewVL} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
