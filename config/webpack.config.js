const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// import path from 'path';

module.exports = {
	mode: 'development',
	entry: {
		//  moze być kilka nazw i będzie wtedy tworzył kilka plików
		main: './src/app.js',
		// main2: './src/message.js',
	},
	output: {
		filename: 'js/[name]-bundle.js', // bierze nazwy z entry, contenthash tylko w produkcyjnej wersji
		path: path.resolve(__dirname, '../build'),
	},
	devServer: {
		open: true,
		contentBase: path.resolve(__dirname, '../public'),
	},
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: 'raw-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpg|png|svg|gif|jpeg)$/,
				use: 'file-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs: '3',
								},
							],
						],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'nowa plikacja',
			template: './src/templates/index.html',
		}),
	],
};
