<script lang="ts">
  import type { EmbedOptions, Mode, VisualizationSpec } from "vega-embed";
  import type { SignalListeners } from "./types";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let signalListeners: SignalListeners = {};

  const mode = "vega-lite" as Mode;
  $: vegaLiteOptions = { ...options, mode: mode };
</script>

<VegaEmbed
  {spec}
  {data}
  {signalListeners}
  options={vegaLiteOptions}
  on:onNewView
  on:onError
/>
