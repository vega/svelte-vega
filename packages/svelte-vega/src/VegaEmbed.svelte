<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import vegaEmbed from "vega-embed";
  import type { EmbedOptions, VisualizationSpec, Result } from "vega-embed";
  import { NOOP } from "./constants";
  import type { ViewListener, SignalListeners } from "./types";
  import {
    shallowEqual,
    removeSignalListenersFromView,
    getUniqueFieldNames,
    computeSpecChanges,
    combineSpecWithDimension,
    addSignalListenersToView,
  } from "./utils";

  export let options: EmbedOptions;
  export let spec: VisualizationSpec;
  export let onNewView: ViewListener = NOOP;
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;
  export let result: Result | undefined;

  let prevOptions: EmbedOptions = {};
  let prevSignalListeners: SignalListeners = {};
  let prevSpec: VisualizationSpec = {};

  let chartContainer: HTMLElement;

  $: {
    const fieldSet = getUniqueFieldNames([options, prevOptions]) as Set<
      keyof EmbedOptions
    >;
    fieldSet.delete("width");
    fieldSet.delete("height");

    // only create a new view if neccessary
    if (Array.from(fieldSet).some((f) => options[f] !== prevOptions[f])) {
      clearView();
      createView();
    } else {
      const specChanges = computeSpecChanges(
        combineSpecWithDimension(spec, options),
        combineSpecWithDimension(prevSpec, prevOptions)
      );
      const newSignalListeners = signalListeners;
      const oldSignalListeners = prevSignalListeners;

      if (specChanges) {
        if (specChanges.isExpensive) {
          clearView();
          createView();
        } else if (result !== undefined) {
          const areSignalListenersChanged = !shallowEqual(
            newSignalListeners,
            oldSignalListeners
          );
          const { view } = result;
          if (specChanges.width !== false) {
            view.width(specChanges.width);
          }
          if (specChanges.height !== false) {
            view.height(specChanges.height);
          }
          if (areSignalListenersChanged) {
            if (oldSignalListeners) {
              removeSignalListenersFromView(view, oldSignalListeners);
            }
            if (newSignalListeners) {
              addSignalListenersToView(view, newSignalListeners);
            }
          }
          view.runAsync();
        }
      } else if (
        !shallowEqual(newSignalListeners, oldSignalListeners) &&
        result !== undefined
      ) {
        const { view } = result;
        if (oldSignalListeners) {
          removeSignalListenersFromView(view, oldSignalListeners);
        }
        if (newSignalListeners) {
          addSignalListenersToView(view, newSignalListeners);
        }
        view.runAsync();
      }
    }
    prevOptions = options;
    prevSignalListeners = signalListeners;
    prevSpec = spec;
  }

  onMount(async () => {
    await createView();
  });

  onDestroy(() => {
    clearView();
  });

  async function createView() {
    const finalSpec = combineSpecWithDimension(spec, options);
    try {
      result = await vegaEmbed(chartContainer, finalSpec, options);
      const { view } = result;
      if (addSignalListenersToView(view, signalListeners)) {
        view.runAsync();
      }
      if (onNewView) {
        onNewView(view);
      }
      return view;
    } catch (e) {
      handleError(e);
    }
  }

  function clearView() {
    if (result) {
      result.finalize();
      result = undefined;
    }
  }

  function handleError(error: Error) {
    onError(error);
    console.warn(error);
    return undefined;
  }
</script>

<div bind:this={chartContainer} />
