//webpack配置

module.exports = {
	entry: './lib-ts/axios.ts',
	output: {
		path: 'F://Code/mini-axios/dist',
		filename: 'mini-axios.js',
		library: 'Axios',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
		],
	},
	plugins: [],
	mode: 'development',
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
