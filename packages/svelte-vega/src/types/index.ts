import type { EmbedOptions, Result, VisualizationSpec } from "vega-embed";

export type View = Result["view"];

export type VegaEmbedProps = {
  spec: VisualizationSpec;
} & EmbedOptions;

export type ViewListener = (view: View) => void;

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};
