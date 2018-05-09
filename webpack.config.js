const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry:["./src/js/app.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js"
	},

	devServer: {
		contentBase: "./dist"
	},

	module: {
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test:/\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
			                localIdentName: "[name]_[local]_[hash:base64]",
			                sourceMap: true,
			             	minimize: true
						}
					}
				]
			},
			{
				test:/\.html$/,
				use:{
					loader: "html-loader"
				}
			}
		]
	},

	plugins: [
	    new HtmlWebPackPlugin({
	      template: "./src/index.html",
	      filename: "./index.html"
    })
  ]
};