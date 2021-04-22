<script lang="ts">
  import { NOOP } from "./constants";
  import type {
    VegaEmbedProps,
    View,
    ViewListener,
    SignalListeners,
  } from "./types";
  import shallowEqual from "./utils/shallowEqual";
  import updateMultipleDatasetsInView from "./utils/updateMultipleDatasetInView";
  import VegaEmbed from "./VegaEmbed.svelte";

  export let props: VegaEmbedProps;
  export let data: Record<string, unknown> = {};
  export let onNewView: ViewListener = () => {};
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
    if (vegaEmbed && Object.keys(data).length > 0) {
      vegaEmbed.modifyView((view: View) => {
        updateMultipleDatasetsInView(view, data);
        view.resize().run();
      });
    }
  }
</script>

<VegaEmbed
  bind:this={vegaEmbed}
  {props}
  onNewView={handleNewView}
  {onError}
  {signalListeners}
/>
