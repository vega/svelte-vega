<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { View } from "vega";
  import vegaEmbed from "vega-embed";
  import type { EmbedOptions, VisualizationSpec } from "vega-embed";
  import { NOOP } from "./constants";
  import type { ViewListener, SignalListeners } from "./types";
  import addSignalListenersToView from "./utils/addSignalListenersToView";
  import combineSpecWithDimension from "./utils/combineSpecWithDimensions";
  import computeSpecChanges from "./utils/computeSpecChanges";
  import getUniqueFieldNames from "./utils/getUniqueFieldNames";
  import removeSignalListenersFromView from "./utils/removeSignalListenersFromView";
  import shallowEqual from "./utils/shallowEqual";

  export let options: EmbedOptions;
  export let spec: VisualizationSpec;
  export let onNewView: ViewListener = NOOP;
  export let signalListeners: SignalListeners = {};
  export let onError: (error: Error) => void = NOOP;

  let prevOptions: EmbedOptions = {};
  let prevSignalListeners: SignalListeners = {};
  let prevSpec: VisualizationSpec = {};

  let chartContainer: HTMLElement;
  let viewPromise: Promise<View | undefined> | undefined;

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
        } else {
          const areSignalListenersChanged = !shallowEqual(
            newSignalListeners,
            oldSignalListeners
          );
          modifyView((view) => {
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
            view.run();
          });
        }
      } else if (!shallowEqual(newSignalListeners, oldSignalListeners)) {
        modifyView((view) => {
          if (oldSignalListeners) {
            removeSignalListenersFromView(view, oldSignalListeners);
          }
          if (newSignalListeners) {
            addSignalListenersToView(view, newSignalListeners);
          }
          view.run();
        });
      }
    }
    prevOptions = options;
    prevSignalListeners = signalListeners;
    prevSpec = spec;
  }

  onMount(() => {
    createView();
  });

  onDestroy(() => {
    clearView();
  });

  function createView() {
    const finalSpec = combineSpecWithDimension(spec, options);
    viewPromise = vegaEmbed(chartContainer, finalSpec, options)
      .then(({ view }) => {
        if (addSignalListenersToView(view, signalListeners)) {
          view.run();
        }
        return view;
      })
      .catch(handleError);
    if (onNewView) {
      modifyView(onNewView);
    }
  }

  function clearView() {
    modifyView((view) => {
      view.finalize();
    });
    viewPromise = undefined;
  }

  export function modifyView(action: ViewListener): void {
    if (viewPromise) {
      viewPromise
        .then((view) => {
          if (view) {
            action(view);
          }
          return true;
        })
        .catch(handleError);
    }
  }

  function handleError(error: Error) {
    onError(error);
    console.warn(error);
    return undefined;
  }
</script>

<div bind:this={chartContainer} />
