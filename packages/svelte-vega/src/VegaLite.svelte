<script lang="ts">
  import Vega from "./Vega.svelte";
  import type { EmbedOptions, Mode, VisualizationSpec } from "vega-embed";
  import type { ViewListener } from "./types";
  import type { SignalListeners } from "../dist/ts/types";
  import { NOOP } from "./constants";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let onNewView: ViewListener = NOOP;
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;
  const mode = "vega-lite" as Mode;
  $: vegaLiteOptions = { ...options, mode: mode };
</script>

<Vega
  {spec}
  {data}
  {onNewView}
  {signalListeners}
  {onError}
  options={vegaLiteOptions}
/>
