import type { Result } from "vega-embed";

export type View = Result["view"];

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};
