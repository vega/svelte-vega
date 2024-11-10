<script lang="ts">
	import type { EmbedOptions, Mode } from 'vega-embed';
	import type { SignalListeners, View, VisualizationSpec } from './types';
	import VegaEmbed from './VegaEmbed.svelte';

	let {
		spec,
		options,
		data,
		signalListeners,
		view = $bindable(),
		onNewView,
		onError
	}: {
		spec: VisualizationSpec;
		options?: EmbedOptions;
		data: Record<string, unknown>;
		signalListeners?: SignalListeners;
		view: View | undefined;
		onNewView?: (view: View) => void;
		onError?: (error: Error) => void;
	} = $props();

	const vegaOptions = $derived({ ...options, mode: 'vega' as Mode });
</script>

<VegaEmbed {spec} {data} {signalListeners} options={vegaOptions} bind:view {onNewView} {onError} />
