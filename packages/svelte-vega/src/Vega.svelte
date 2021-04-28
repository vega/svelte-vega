<script lang="ts">
  import type { EmbedOptions, VisualizationSpec } from "vega-embed";

  import { NOOP } from "./constants";
  import type { View, ViewListener, SignalListeners } from "./types";
  import { shallowEqual, updateMultipleDatasetsInView } from "./utils";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let onNewView: ViewListener = NOOP;
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;

  let prevData: Record<string, unknown> = {};
  let vegaEmbed: VegaEmbed;

  const handleNewView: ViewListener = (view: View) => {
    update();
    onNewView(view);
  };

  $: {
    if (!shallowEqual(data, prevData)) {
      update();
    }
    prevData = data;
  }

  function update() {
    if (vegaEmbed && data && Object.keys(data).length > 0) {
      vegaEmbed.modifyView((view: View) => {
        updateMultipleDatasetsInView(view, data);
        view.resize().run();
      });
    }
  }
</script>

<VegaEmbed
  bind:this={vegaEmbed}
  {spec}
  {options}
  onNewView={handleNewView}
  {onError}
  {signalListeners}
/>
