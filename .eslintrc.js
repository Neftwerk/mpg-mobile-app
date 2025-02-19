// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	env: { browser: true, node: true, es2020: true },
	extends: ['expo', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react-refresh', 'prettier'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'prettier/prettier': 'error',
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
	ignorePatterns: ['*.json'],
};
