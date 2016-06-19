var path = require('path');

module.exports = {

    // set the context (optional)
    // context: path.join( __dirname, '/src'),
    entry: {
        bundle: './example/index',
        'ngIntercom': ['./src/intercom.service']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: ['ngIntercom'],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    // enable loading modules relatively (without the ../../ prefix)
    resolve: {
        root: path.join( __dirname, '/src'),
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
    },

    module: {
        loaders: [
            // load css and process sass
            { test: /\.scss$/, loaders: ['style', 'css', 'sass']},

            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts$/, loader: 'awesome-typescript-loader' }
        ]
    },

    // webpack dev server configuration
    devServer: {
        contentBase: './example',
        noInfo: false,
        inline: true
    },

    // support source maps
    devtool: 'source-map'
};