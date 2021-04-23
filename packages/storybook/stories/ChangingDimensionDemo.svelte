<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { EmbedOptions } from "vega-embed";
  import Vega from "../../svelte-vega/src/Vega.svelte";
  import data1 from "./data1.json";
  import spec1 from "./spec1";
  import spec2 from "./spec2";

  let options: EmbedOptions = {
    width: 100,
    height: 100,
    padding: 20,
  };
  let grow = true;
  let interval: NodeJS.Timeout;
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

  onMount(() => {
    interval = setInterval(() => {
      options = {
        ...options,
        width: options.width! + (grow ? 1 : -1),
        height: options.height! + (grow ? 1 : -1),
      };
      grow =
        (grow && options.width! < 400) || (!grow && options.width! === 100);
    }, 10);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
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
      <code>&lt;Vega&gt;</code> Svelte Component
    </h3>
    Will recompile when spec changes and update when data changes.
    <Vega {data} {spec} {options} signalListeners={handlers} />
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
