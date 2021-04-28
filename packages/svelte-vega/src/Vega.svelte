<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { EmbedOptions, Result, VisualizationSpec } from "vega-embed";

  import { NOOP } from "./constants";
  import type { SignalListeners } from "./types";
  import { shallowEqual, updateMultipleDatasetsInView } from "./utils";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let spec: VisualizationSpec;
  export let options: EmbedOptions = {};
  export let data: Record<string, unknown> = {};
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;

  const dispatch = createEventDispatcher();

  let prevData: Record<string, unknown> = {};
  let result: Result | undefined = undefined;

  function handleNewView(event: CustomEvent) {
    update();
    dispatch("onNewView", {
      view: event.detail.view,
    });
  }

  $: {
    if (!shallowEqual(data, prevData)) {
      update();
    }
    prevData = data;
  }

  async function update() {
    if (data && Object.keys(data).length > 0 && result !== undefined) {
      const { view } = result;
      updateMultipleDatasetsInView(view, data);
      await view.resize().runAsync();
    }
  }
</script>

<VegaEmbed
  bind:result
  {spec}
  {options}
  {onError}
  {signalListeners}
  on:newView={handleNewView}
/>
