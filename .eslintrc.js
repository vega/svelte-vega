module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', 'eslint-plugin-prettier'],
	ignorePatterns: ['*.cjs'],
	env: {
		es2017: true,
		browser: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	rules: {
		'prettier/prettier': 'warn'
	},
	settings: {
		'svelte3/typescript': require('typescript')
	}
};
