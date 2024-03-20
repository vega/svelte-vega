module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:svelte/recommended'
	],
	plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
	ignorePatterns: ['*.cjs'],
	env: {
		es2017: true,
		browser: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		extraFileExtensions: ['.svelte']
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'prettier/prettier': 'warn'
	},
	settings: {
		'svelte/typescript': require('typescript')
	}
};
