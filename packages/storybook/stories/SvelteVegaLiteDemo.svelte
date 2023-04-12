<script>
  import { VegaLite } from "svelte-vega";
  import data1 from "./data1.json";
  import githubImage from "./GitHub.png";

  export let options = {};

  let selected = "";
  let data = data1;
  let spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "A simple bar chart with embedded data.",
    data: {
      name: "table",
    },
    params: [{ name: "select", select: { type: "point", encodings: ["x"] } }],
    mark: { type: "bar", cursor: "pointer" },
    encoding: {
      x: { field: "category", type: "nominal" },
      y: { field: "amount", type: "quantitative" },
      fillOpacity: {
        condition: { param: "select", value: 1 },
        value: 0.3,
      },
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

  function handleSelection(...args) {
    if (args[1].category !== undefined) {
      selected = `selected column(s): ${args[1].category}`;
    } else {
      selected = "";
    }
  }
</script>

<main class="content">
  <div class="head">
    <div class="row-content">
      <h3>
        <code>&lt;VegaLite&gt;</code> Svelte Component
      </h3>
      <button on:click={handleUpdateData} class="common-button"
        >Update Data</button
      >
    </div>
    <button
      class="github-button"
      on:click={() => window.open("https://github.com/vega/svelte-vega")}
    >
      <img src={githubImage} alt="github mark" />
      <div>View on GitHub</div>
    </button>
  </div>
  Will recompile when spec changes and update when data changes.
  <VegaLite
    {data}
    {spec}
    {options}
    signalListeners={{ select: handleSelection }}
  />
  {#if selected !== ""}
    <p>{selected}</p>
  {/if}
</main>

<style>
  .content {
    display: flex;
    flex-direction: column;
    font-family: "SF Pro Text", "Myriad Set Pro", "SF Pro Icons",
      "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .row-content {
    display: flex;
    align-items: center;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .github-button {
    display: flex;
    align-items: center;
    height: 2em;
    margin: 1em;
    padding: 0.5em;
    border: 1px solid black;
    border-radius: 5px;
  }

  .github-button:active {
    background-color: #eee;
  }

  .common-button {
    display: flex;
    align-items: center;
    height: 2em;
    margin-left: 0.5em;
    padding: 0.5em;
    border: 1px solid #5382b0;
    border-radius: 5px;
  }

  .common-button:active {
    background-color: #cce6ff;
  }

  img {
    height: 100%;
    padding-right: 0.5em;
  }

  button {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    background-color: transparent;
    text-transform: none;
    border: none;
    overflow: visible;
    -webkit-appearance: button;
  }

  button:active {
    color: inherit;
  }
</style>
