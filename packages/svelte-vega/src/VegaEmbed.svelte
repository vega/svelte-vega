<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import vegaEmbed from "vega-embed";
  import type { EmbedOptions, VisualizationSpec, Result } from "vega-embed";
  import { NOOP } from "./constants";
  import type { SignalListeners, View } from "./types";
  import {
    shallowEqual,
    removeSignalListenersFromView,
    getUniqueFieldNames,
    computeSpecChanges,
    combineSpecWithDimension,
    addSignalListenersToView,
    updateMultipleDatasetsInView,
  } from "./utils";

  export let options: EmbedOptions;
  export let spec: VisualizationSpec;
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;
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
      onNewView(view);
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
