<script lang="ts">
	import type { EmbedOptions, Mode } from 'vega-embed';
	import type { SignalListeners, View, VisualizationSpec } from './types';
	import VegaEmbed from './VegaEmbed.svelte';

	let {
		spec,
		options,
		data,
		signalListeners,
		view = $bindable()
	}: {
		spec: VisualizationSpec;
		options: EmbedOptions;
		data: Record<string, unknown>;
		signalListeners: SignalListeners;
		view: View | undefined;
	} = $props();

	const vegaLiteOptions = $derived({ ...options, mode: 'vega-lite' as Mode });
</script>

<VegaEmbed
	{spec}
	{data}
	{signalListeners}
	options={vegaLiteOptions}
	bind:view
	on:onNewView
	on:onError
/>
