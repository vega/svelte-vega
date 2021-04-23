import type { View, SignalListeners } from "../types";

export default function addSignalListenersToView(
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
