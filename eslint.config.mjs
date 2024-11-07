// @ts-check
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';

/** @type {import('typescript-eslint').Config} */
export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		files: ['**/*.svelte', '*.svelte'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-require-imports': 'warn',
			'@typescript-eslint/no-unused-expressions': 'warn',
			'no-undef': 'warn'
		}
	},
	{
		ignores: ['**/_gh-pages/', '**/.svelte-kit/', '**/dist/']
	}
);
