const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");

const withBabelMinify = require('next-babel-minify')()

module.exports = withPlugins([[withSass], [withCSS], [withImages] , [withBabelMinify]], {
    webpack(config, options) {
        config.resolve.modules.push(path.resolve("./"));
        // config.plugins.push(
        //     new webpack.ProvidePlugin({
        //         '$': 'jquery',
        //         'jQuery': 'jquery',
        //     })
        // )
        // config.plugins = config.plugins.filter((plugin) => {
        //     if (plugin.constructor.name === 'UglifyJsPlugin') {
        //         return false
        //     } else {
        //         return true
        //     }
        // })
        // config.optimization.minimizer = [];
        // config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));


        return config;
    }
});
