const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'prod';

const pathsToClean = [
	'resources'
];

// The clean options to use
const cleanOptions = {
	root: __dirname,
	verbose: true,
	dry: false,
	watch: false
};

const plugins = [
	new CleanWebpackPlugin(pathsToClean, cleanOptions),
	function () {
		this.plugin('done', statsData => {
			const stats = statsData.toJson();
			const bundledCSS = stats.assets[0].name;
			const bundledJS = stats.assets[1].name;
			console.log('bundledCSS', bundledCSS);
			console.log('bundledJS', bundledJS);
			const layoutHTML = fs.readFileSync(path.join(__dirname, './views/layout.hbs'), 'utf8');

			let htmlOutput = layoutHTML.replace(/<script src="\/resources\/(.*)?/i, `<script src="/resources/${bundledJS}"></script>`);
			htmlOutput = htmlOutput.replace(/<link rel='stylesheet' href="\/resources\/(.*)?/i, `<link rel='stylesheet' href="/resources/${bundledCSS}"/>`);
			fs.writeFileSync(
				path.join(__dirname, './views', 'layout.hbs'),
				htmlOutput);
		});
	}
];

module.exports = {
	mode: devMode ? 'development' : 'production',
	watch: devMode,

	devtool: 'source-map',
	entry: ['babel-polyfill', './public/javascripts/entry.js', './public/stylesheets/main.scss'],
	module: {
		// Add loader
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-0', 'react']
					}
				}
			},
			{
				test: /\.s?css$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[hash].css',
						sourceMap: true
					}
				},
				{
					loader: 'extract-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			}
		]
	},
	output: {
		filename: '[name].[chunkhash].js',
		publicPath: '/resources',
		path: path.join(__dirname, '/resources')
	},
	plugins
};
