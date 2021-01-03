const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
								// postcss plugins, can be exported to postcss.config.js
								plugins: function () {
									return [require('autoprefixer')];
								},
							},
						},
					},

					'sass-loader',
				],
			},
			{
				test: /\.(jpg|png|svg|gif|jpeg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]-[contenthash:6].[ext]',
							outputPath: 'images',
						},
					},
				],
			},
			// {
			// 	loader: 'image-webpack-loader',
			// 	options: {
			// 		disable: true,
			// 		mozjpeg: {
			// 			quality: 50,
			// 		},
			// 		optipng: {
			// 			enabled: true,
			// 		},
			// 	},
			// },
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
			template: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash:6].css',
		}),
		// do kopiowanie elementów z folderów z public do build (np. zdjęcia)
		new CopyPlugin({
			patterns: [
				{
					from: 'src/images',
					to: 'images',
				},
			],
		}),
		// new ImageMinimizerPlugin({
		// 	minimizerOptions: {
		// 		// Lossless optimization with custom option
		// 		// Feel free to experiment with options for better result for you
		// 		plugins: [
		// 			['gifsicle', { interlaced: true }],
		// 			['jpegtran', { progressive: true }],
		// 			['optipng', { optimizationLevel: 5 }],
		// 			[
		// 				'svgo',
		// 				{
		// 					plugins: [
		// 						{
		// 							removeViewBox: false,
		// 						},
		// 					],
		// 				},
		// 			],
		// 		],
		// 	},
		// }),
	],
};
