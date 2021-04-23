import type { EmbedOptions, VisualizationSpec } from "vega-embed";

export default function combineSpecWithDimension(
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
