<script lang="ts">
  import type { VegaEmbedProps } from "./types";
  import Vega from "./Vega.svelte";
  import type { Mode } from "vega-embed";

  export let props: VegaEmbedProps;
  const mode = "vega-lite" as Mode;
  $: vegaLiteProps = { ...props, mode: mode };
</script>

<Vega props={vegaLiteProps} />
