<script>
	import { VegaLite, Vega } from '$lib/index';
</script>

<h1>Example Vega and Vega-Lite Charts with svelte-vega</h1>
<p>
	Visit <a href="https://github.com/vega/svelte-vega">the GitHub repository</a> for more details.
</p>

<h4>Vega-Lite chart:</h4>
<VegaLite
	spec={{
		$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
		description: 'A simple bar chart with embedded data.',
		data: {
			values: [
				{ a: 'A', b: 28 },
				{ a: 'B', b: 55 },
				{ a: 'C', b: 43 },
				{ a: 'D', b: 91 },
				{ a: 'E', b: 81 },
				{ a: 'F', b: 53 },
				{ a: 'G', b: 19 },
				{ a: 'H', b: 87 },
				{ a: 'I', b: 52 }
			]
		},
		mark: 'bar',
		encoding: {
			x: { field: 'a', type: 'nominal', axis: { labelAngle: 0 } },
			y: { field: 'b', type: 'quantitative' }
		}
	}}
/>

<h4>Vega chart:</h4>

<Vega
	spec={{
		$schema: 'https://vega.github.io/schema/vega/v5.json',
		description: 'A basic bar chart example, with value labels shown upon mouse hover.',
		width: 400,
		height: 200,
		padding: 5,

		data: [
			{
				name: 'table',
				values: [
					{ category: 'A', amount: 28 },
					{ category: 'B', amount: 55 },
					{ category: 'C', amount: 43 },
					{ category: 'D', amount: 91 },
					{ category: 'E', amount: 81 },
					{ category: 'F', amount: 53 },
					{ category: 'G', amount: 19 },
					{ category: 'H', amount: 87 }
				]
			}
		],

		signals: [
			{
				name: 'tooltip',
				value: {},
				on: [
					{ events: 'rect:mouseover', update: 'datum' },
					{ events: 'rect:mouseout', update: '{}' }
				]
			}
		],

		scales: [
			{
				name: 'xscale',
				type: 'band',
				domain: { data: 'table', field: 'category' },
				range: 'width',
				padding: 0.05,
				round: true
			},
			{
				name: 'yscale',
				domain: { data: 'table', field: 'amount' },
				nice: true,
				range: 'height'
			}
		],

		axes: [
			{ orient: 'bottom', scale: 'xscale' },
			{ orient: 'left', scale: 'yscale' }
		],

		marks: [
			{
				type: 'rect',
				from: { data: 'table' },
				encode: {
					enter: {
						x: { scale: 'xscale', field: 'category' },
						width: { scale: 'xscale', band: 1 },
						y: { scale: 'yscale', field: 'amount' },
						y2: { scale: 'yscale', value: 0 }
					},
					update: {
						fill: { value: 'steelblue' }
					},
					hover: {
						fill: { value: 'red' }
					}
				}
			},
			{
				type: 'text',
				encode: {
					enter: {
						align: { value: 'center' },
						baseline: { value: 'bottom' },
						fill: { value: '#333' }
					},
					update: {
						x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
						y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
						text: { signal: 'tooltip.amount' },
						fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }]
					}
				}
			}
		]
	}}
/>
