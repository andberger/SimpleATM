module.exports = {
    entry: "../src/app.js",
    output: {
        path: "../dist",
        filename: "app.bundle.js"
    },
	watch: true,
	module: {
		loaders: [
			{
				test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query: {
		          presets: ['es2015']
		        }
			}
		]
	}
};
