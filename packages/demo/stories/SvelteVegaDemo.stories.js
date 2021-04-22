import SvelteVegaDemo from "./SvelteVegaDemo.svelte";

export default {
  title: "svelte-vega/Vega",
  component: SvelteVegaDemo,
  argTypes: {},
};

const Template = () => ({
  Component: SvelteVegaDemo,
});

export const Demo = Template.bind({});
