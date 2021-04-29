<script lang="ts">
  import type { EmbedOptions, Mode, VisualizationSpec } from "vega-embed";
  import type { SignalListeners } from "./types";
  import { NOOP } from "./constants";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;

  const mode = "vega" as Mode;
  $: vegaOptions = { ...options, mode: mode };
</script>

<VegaEmbed
  {spec}
  {data}
  {signalListeners}
  {onError}
  options={vegaOptions}
  on:onNewView
/>
