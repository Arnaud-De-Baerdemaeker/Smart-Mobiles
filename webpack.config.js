const webpack = require("webpack");
const path = require("path");

const config = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			}
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
	}
};

module.exports = config;