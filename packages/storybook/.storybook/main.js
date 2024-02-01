const sveltePreprocess = require('svelte-preprocess');
module.exports = {
	stories: ['../stories/*.stories.@(js|jsx|ts|tsx)'],
	framework: {
		name: '@storybook/svelte-vite',
		options: {
			svelteOptions: {
				preprocess: sveltePreprocess()
			}
		}
	},
	docs: {
		autodocs: false
	}
};
