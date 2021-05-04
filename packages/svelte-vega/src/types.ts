import type { Result, VisualizationSpec as Spec } from "vega-embed";

export type View = Result["view"];

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};

export type VisualizationSpec = Spec;
