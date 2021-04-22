import updateSingleDatasetInView from "./updateSingleDatasetInView";
import type { View } from "../types";

export default function updateMultipleDatasetsInView(
  view: View,
  data: Record<string, unknown>
) {
  Object.keys(data).forEach((name) => {
    updateSingleDatasetInView(view, name, data[name]);
  });
}
