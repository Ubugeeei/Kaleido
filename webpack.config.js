const path = require("path");
const outputPath = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "src/index.ts",
	output: {
		filename: "bundle.js",
		path: `${outputPath}`,
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: [".ts", ".js"],
	},

	devServer: {
		contentBase: `${outputPath}/`, //エントリーポイントを指定
		open: true,
		hot: true,
		watchContentBase: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
