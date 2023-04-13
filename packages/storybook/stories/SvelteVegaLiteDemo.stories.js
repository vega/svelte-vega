import SvelteVegaLiteDemo from './SvelteVegaLiteDemo.svelte';

export default {
	title: 'svelte-vega/VegaLite',
	component: SvelteVegaLiteDemo,
	argTypes: {}
};

const Template = () => ({
	Component: SvelteVegaLiteDemo
});

export const Demo = Template.bind({});
