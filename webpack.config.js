const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = (env, options) => {
    return {
        // watch: true,
        // mode: 'development',
        entry: {
            main: ['./src/index.js', './assets/sass/main.scss'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        externals: {
            // global app config object
            config: JSON.stringify({
                apiUrl: 'https://call-for-scores-api.herokuapp.com/'
            })
        },
        plugins: [new MiniCssExtractPlugin("[name].css"), htmlWebpackPlugin],
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        /*{
                                                    loader: 'style-loader', // inject CSS to page
                                                },  */
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            }
                        },
                        {
                            loader: 'css-loader'//, // translates CSS into CommonJS modules
                            /* This configuration is for a different approach to styling--breaks bootstrap
                            options: {
                                modules: {
                                    localIdentName: "[name]__[local]___[hash:base64:5]",
                                },
                                importLoaders: 1,
                                sourceMap: true
                            }*/
                        },
                        {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }, {
                            loader: 'sass-loader', // compiles Sass to CSS
                            options: {
                                implementation: require('sass'),
                                sassOptions: {
                                    fiber: false,
                                },
                            },
                        },

                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }],
                },
            ],

        }
    }
}