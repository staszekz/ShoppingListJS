const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		main: './src/js/index.js',
	},
	output: {
		filename: 'js/[name]-[contenthash:6]-bundle.js',
		path: path.resolve(__dirname, '../dist'),
	},
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: 'raw-loader',
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
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
				test: /\.(jpg|png|svg|gif|jpeg|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]-[contenthash:6].[ext]',
							outputPath: 'img',
						},
					},
				],
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
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash:6].css',
		}),
		new CssMinimizerPlugin({
			test: /\.css$/i,
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'src/img',
					to: 'img',
				},
			],
		}),
	],
	optimization: {
		minimizer: [new TerserPlugin()],
	},
};
