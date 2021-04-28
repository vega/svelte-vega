<script lang="ts">
  import type { EmbedOptions, VisualizationSpec } from "vega-embed";
  import VegaLite from "../../svelte-vega/src/VegaLite.svelte";
  import data1 from "./data1.json";

  export let options: EmbedOptions = {};

  let data = data1;
  let spec: VisualizationSpec = {
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

  function handleUpdateData() {
    const table = [];
    for (let i = 1; i <= 20; i++) {
      table.push({
        amount: Math.round(Math.random() * 100),
        category: String.fromCharCode(65 + i),
      });
    }
    data = { table };
  }
</script>

<main>
  <div style={"float: right"}>
    <iframe
      title="star"
      src="https://ghbtns.com/github-btn.html?user=vega&repo=svelte-vega&type=star&count=true"
      frameBorder="0"
      scrolling="0"
      width="100px"
      height="20px"
    />
  </div>
  <button on:click={handleUpdateData}>Update Data</button>
  <div class="content">
    <h3>
      <code>&lt;VegaLite&gt;</code> Svelte Component
    </h3>
    Will recompile when spec changes and update when data changes.
    <VegaLite {data} {spec} {options} />
  </div>
</main>

<style>
  .content {
    display: flex;
    flex-direction: column;
  }
</style>
