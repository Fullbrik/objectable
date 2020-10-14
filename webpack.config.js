path = require("path");

module.exports = [
	{
		name: "npm",
		entry: "./src/index.ts",
		module: {
			rules: [
				{
					test: /^((?!spec).)*\.ts?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		output: {
			filename: "index.js",
			path: path.resolve("./dist"),
			library: "Objectable",
			libraryTarget: "umd",
		},
	},
	{
		name: "cdn",
		entry: "./src/index.ts",
		module: {
			rules: [
				{
					test: /^((?!spec).)*\.ts?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		output: {
			filename: "index.cdn.js",
			path: path.resolve("./dist"),
			library: "Objectable",
			libraryTarget: "var",
		},
	},
];
