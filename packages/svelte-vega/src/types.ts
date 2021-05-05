import type { Result, VisualizationSpec as Spec } from "vega-embed";
import type { Spec as VgSpec } from "vega";
import type { TopLevelSpec as VlSpec } from "vega-lite";

export type View = Result["view"];

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};

export type VisualizationSpec = Spec;
export type VegaSpec = VgSpec;
export type VegaLiteSpec = VlSpec;
