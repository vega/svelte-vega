<script lang="ts">
  import type { EmbedOptions, Mode } from "vega-embed";
  import type { SignalListeners, VisualizationSpec } from "./types";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let signalListeners: SignalListeners = {};

  const mode = "vega" as Mode;
  $: vegaOptions = { ...options, mode: mode };
</script>

<VegaEmbed
  {spec}
  {data}
  {signalListeners}
  options={vegaOptions}
  on:onNewView
  on:onError
/>
