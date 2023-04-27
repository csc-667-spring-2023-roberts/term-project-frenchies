const path = require("path");

module.exports = {
    entry: "./frontend/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: { loader: "ts-loader" },
            },
        ],
    },
};