<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import type { EmbedOptions, Result, VisualizationSpec } from "vega-embed";
  import vegaEmbed from "vega-embed";
  import { WIDTH_HEIGHT } from "./constants";
  import type { SignalListeners, View } from "./types";
  import {
    addSignalListenersToView,
    updateMultipleDatasetsInView,
    combineSpecWithDimension,
    computeSpecChanges,
    removeSignalListenersFromView,
    shallowEqual,
  } from "./utils";

  export let options: EmbedOptions;
  export let spec: VisualizationSpec;
  export let signalListeners: SignalListeners = {};
  export let data: Record<string, unknown> = {};

  const dispatch = createEventDispatcher();

  let result: Result | undefined = undefined;
  let prevOptions: EmbedOptions = {};
  let prevSignalListeners: SignalListeners = {};
  let prevSpec: VisualizationSpec = {};
  let prevData: Record<string, unknown> = {};
  let chartContainer: HTMLElement;

  $: {
    if (!shallowEqual(data, prevData)) {
      update();
    }
    prevData = data;
  }

  $: {
    if (chartContainer !== undefined) {
      // only create a new view if neccessary
      if (!shallowEqual(options, prevOptions, WIDTH_HEIGHT)) {
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
  }

  onDestroy(() => {
    clearView();
  });

  async function createView() {
    clearView();
    try {
      console.info("Creating new view");
      result = await vegaEmbed(chartContainer, spec, options);
      const { view } = result;
      if (addSignalListenersToView(view, signalListeners)) {
        view.runAsync();
      }
      onNewView(view);
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
    dispatch("onError", {
      error: error,
    });
    console.warn(error);
    return undefined;
  }

  function onNewView(view: View) {
    update();
    dispatch("onNewView", {
      view: view,
    });
  }

  async function update() {
    if (data && Object.keys(data).length > 0 && result !== undefined) {
      const { view } = result;
      updateMultipleDatasetsInView(view, data);
      await view.resize().runAsync();
    }
  }
</script>

<div bind:this={chartContainer} />
