const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = {
  stories: ["../stories/*.stories.@(js|jsx|ts|tsx)"],
  svelteOptions: {
    preprocess: sveltePreprocess(),
  },
  addons: [],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: [/\.stories\.js$/, /index\.js$/],
      use: [require.resolve("@storybook/source-loader")],
      include: [path.resolve(__dirname, "../src")],
      enforce: "pre",
    });
    return config;
  },
  core: {
    builder: "webpack5",
  },
};
