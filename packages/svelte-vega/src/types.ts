export { View } from 'vega';
export type { VisualizationSpec } from 'vega-embed';

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};
