module.exports = {
	// Other webpack configuration options...
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						// Add any other necessary Babel options
					},
				},
			},
		],
	},
};
