import type { View, SignalListeners } from "./types";
import { vega } from "vega-embed";
import equal from "fast-deep-equal";
import type { VisualizationSpec, EmbedOptions } from "vega-embed";

export function updateMultipleDatasetsInView(
  view: View,
  data: Record<string, unknown>
): void {
  Object.keys(data).forEach((name) => {
    const value = data[name];
    const getType = {};
    if (value) {
      if (!!value && getType.toString.call(value) === "[object Function]") {
        const parsedValue = value as (dataset: unknown) => unknown;
        parsedValue(view.data(name));
      } else {
        view.change(
          name,
          vega
            .changeset()
            .remove(() => true)
            .insert(value)
        );
      }
    }
  });
}

export function shallowEqual(
  a: Record<string, unknown> = {},
  b: Record<string, unknown> = {}
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  return (
    a === b ||
    (aKeys.length === bKeys.length && aKeys.every((key) => a[key] === b[key]))
  );
}

export function removeSignalListenersFromView(
  view: View,
  signalListeners: SignalListeners
): boolean {
  const signalNames = Object.keys(signalListeners);
  signalNames.forEach((signalName) => {
    try {
      view.removeSignalListener(signalName, signalListeners[signalName]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Cannot remove invalid signal listener.", error);
    }
  });

  return signalNames.length > 0;
}

export function addSignalListenersToView(
  view: View,
  signalListeners: SignalListeners
): boolean {
  const signalNames = Object.keys(signalListeners);
  signalNames.forEach((signalName) => {
    try {
      view.addSignalListener(signalName, signalListeners[signalName]);
    } catch (error) {
      console.warn("Cannot add invalid signal listener.", error);
    }
  });

  return signalNames.length > 0;
}

export function getUniqueFieldNames<T>(objects: T[]): Set<string> {
  const fields = new Set<string>();
  objects.forEach((o) => {
    Object.keys(o).forEach((field) => {
      fields.add(field);
    });
  });

  return fields;
}

interface SpecChanges {
  width: false | number;
  height: false | number;
  isExpensive: boolean;
}

export function computeSpecChanges(
  newSpec: VisualizationSpec,
  oldSpec: VisualizationSpec
): false | SpecChanges {
  if (newSpec === oldSpec) return false;

  const changes: SpecChanges = {
    width: false,
    height: false,
    isExpensive: false,
  };

  const fieldNames = getUniqueFieldNames([newSpec, oldSpec]);

  if (
    fieldNames.has("width") &&
    (!("width" in newSpec) ||
      !("width" in oldSpec) ||
      newSpec.width !== oldSpec.width)
  ) {
    if ("width" in newSpec && typeof newSpec.width === "number") {
      changes.width = newSpec.width;
    } else {
      changes.isExpensive = true;
    }
  }

  if (
    fieldNames.has("height") &&
    (!("height" in newSpec) ||
      !("height" in oldSpec) ||
      newSpec.height !== oldSpec.height)
  ) {
    if ("height" in newSpec && typeof newSpec.height === "number") {
      changes.height = newSpec.height;
    } else {
      changes.isExpensive = true;
    }
  }

  // Delete cheap fields
  fieldNames.delete("width");
  fieldNames.delete("height");

  if (
    [...fieldNames].some(
      (field) =>
        !(field in newSpec) ||
        !(field in oldSpec) ||
        !equal(
          newSpec[field as keyof typeof newSpec],
          oldSpec[field as keyof typeof oldSpec]
        )
    )
  ) {
    changes.isExpensive = true;
  }

  return changes.width !== false ||
    changes.height !== false ||
    changes.isExpensive
    ? changes
    : false;
}

export function combineSpecWithDimension(
  spec: VisualizationSpec,
  options: EmbedOptions
): VisualizationSpec {
  const { width, height } = options;
  if (typeof width !== "undefined" && typeof height !== "undefined") {
    return { ...spec, width, height };
  }
  if (typeof width !== "undefined") {
    return { ...spec, width };
  }
  if (typeof height !== "undefined") {
    return { ...spec, height };
  }
  return spec;
}
