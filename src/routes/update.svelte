<script lang="ts">
	import type { VisualizationSpec } from '$lib';
	import { VegaLite } from '$lib';

	let data1 = {
		table: [
			{ category: 'A', amount: 28 },
			{ category: 'B', amount: 55 },
			{ category: 'C', amount: 43 },
			{ category: 'D', amount: 91 },
			{ category: 'E', amount: 81 },
			{ category: 'F', amount: 53 },
			{ category: 'G', amount: 19 },
			{ category: 'H', amount: 87 }
		]
	};

	let selected = '';
	let data = data1;
	let spec: VisualizationSpec = {
		$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
		description: 'A simple bar chart with embedded data.',
		data: {
			name: 'table'
		},
		params: [{ name: 'select', select: { type: 'point', encodings: ['x'] } }],
		mark: { type: 'bar', cursor: 'pointer' },
		encoding: {
			x: { field: 'category', type: 'nominal' },
			y: { field: 'amount', type: 'quantitative' },
			fillOpacity: {
				condition: { param: 'select', value: 1 },
				value: 0.3
			}
		}
	};

	function handleUpdateData() {
		const table = [];
		for (let i = 1; i <= 20; i++) {
			table.push({
				amount: Math.round(Math.random() * 100),
				category: String.fromCharCode(65 + i)
			});
		}
		data = { table };
	}

	function handleSelection(...args: any) {
		if (args[1].category !== undefined) {
			selected = `selected column(s): ${args[1].category}`;
		} else {
			selected = '';
		}
	}
</script>

<main class="content">
	<div class="head">
		<div class="row-content">
			<h4>
				Update Data in <code>&lt;VegaLite&gt;</code> Component
			</h4>
			<button on:click={handleUpdateData} class="common-button">Update Data</button>
		</div>
	</div>
	<VegaLite {data} {spec} signalListeners={{ select: handleSelection }} />
	{#if selected !== ''}
		<p>{selected}</p>
	{/if}
</main>

<style>
	.common-button {
		display: flex;
		align-items: center;
		height: 2em;
		margin-left: 0.5em;
		padding: 0.5em;
		border: 1px solid #5382b0;
		border-radius: 5px;
	}

	.common-button:active {
		background-color: #cce6ff;
	}

	button {
		font-family: inherit; /* 1 */
		font-size: 100%; /* 1 */
		line-height: 1.15; /* 1 */
		margin: 0; /* 2 */
		background-color: transparent;
		text-transform: none;
		border: none;
		overflow: visible;
		-webkit-appearance: button;
	}

	button:active {
		color: inherit;
	}
</style>
