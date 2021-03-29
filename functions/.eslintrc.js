module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"google",
		"ts-node",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
	],
	plugins: [
		"@typescript-eslint",
		"import",
	],
	rules: {
		"quotes": ["error", "double"],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"max-len": ["error", {"code": 150}],
		"linebreak-style": 0,
	},
};
