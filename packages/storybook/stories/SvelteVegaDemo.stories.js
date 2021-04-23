import SvelteVegaDemo from "./SvelteVegaDemo.svelte";
import ChangingDimensionDemo from "./ChangingDimensionDemo.svelte";

export default {
  title: "svelte-vega/Vega",
  component: SvelteVegaDemo,
  argTypes: {},
};

const Template = ({ ...args }) => ({
  Component: SvelteVegaDemo,
  props: args,
});

const SizingTemplate = ({ ...args }) => ({
  Component: ChangingDimensionDemo,
  props: args,
});

export const Demo = Template.bind({});
export const Width300 = Template.bind({});
Width300.args = {
  options: {
    width: 300,
  },
};
export const Height300 = Template.bind({});
Height300.args = {
  options: {
    height: 300,
  },
};
export const ChangingSize = SizingTemplate.bind({});
