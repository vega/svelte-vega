<script lang="ts">
  import type { EmbedOptions } from "vega-embed";
  import VegaLite from "../../svelte-vega/src/VegaLite.svelte";
  import data1 from "./data1.json";
  import spec1 from "./spec1";
  import spec2 from "./spec2";

  export let options: EmbedOptions = {};

  let info = "";
  let data = data1;
  let spec = spec1;
  const handlers: {
    tooltip: (...args: unknown[]) => void;
  } = { tooltip: (...args) => (info = JSON.stringify(args)) };

  function handleToggleSpec() {
    if (spec === spec1) {
      spec = spec2;
    } else {
      spec = spec1;
    }
  }

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
  <button on:click={handleToggleSpec}>Toggle Spec</button>
  <button on:click={handleUpdateData}>Update Data</button>
  <div class="content">
    <h3>
      <code>&lt;VegaLite&gt;</code> Svelte Component
    </h3>
    Will recompile when spec changes and update when data changes.
    <VegaLite {data} {spec} {options} signalListeners={handlers} />
    <div>
      Hover info: <code>{info}</code>
    </div>
  </div>
</main>

<style>
  .content {
    display: flex;
    flex-direction: column;
  }
</style>
