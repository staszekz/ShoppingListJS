const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const postcssPresetEnv = require('postcss-preset-env');

// import path from 'path';

module.exports = {
	mode: 'development',
	entry: {
		main: './src/js/index.js',
	},
	output: {
		filename: 'js/[name]-bundle.js',
		path: path.resolve(__dirname, '../dist'),
	},
	devServer: {
		open: true,
		contentBase: path.resolve(__dirname, './public'),
	},
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: 'raw-loader',
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env'],
							},
						},
					},

					'sass-loader',
				],
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
									targets: 'defaults',
								},
							],
						],
						plugins: ['@babel/plugin-transform-runtime'],
					},
				},
			},
			// {
			// 	test: /\.js$/,
			// 	include: path.resolve(__dirname, 'src/js'),
			// 	enforce: 'pre',
			// 	loader: 'eslint-loader',
			// 	options: {
			// 		emitWarning: true,
			// 	},
			// },
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'shopping list',
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash:6].min.css',
		}),
		new CssMinimizerPlugin({
			test: /\.css$/i,
		}),
	],
};
