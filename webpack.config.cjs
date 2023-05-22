const path = require("path");

module.exports = {
    entry: "./frontend/chat.ts",
    output: {
        path: path.join(__dirname, "backend", "static", "scripts"),
        publicPath: "/backend/static/scripts",
        filename: "bundle-chat.js",
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