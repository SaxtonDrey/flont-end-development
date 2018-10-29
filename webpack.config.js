const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SassLintPlugin = require('sass-lint-webpack');

module.exports = (env, argv) =>　{
  const MODE = argv.mode || 'development'
  const IS_DEVELOPMENT = MODE === 'development';

  return {
    mode: MODE,
    entry: {
       'bundle': './src/js/index.js'
      },
    output: {
        filename: 'js/[name]-[hash].js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      watchContentBase: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['env', { modules: false }]]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  url: true,
                  sourceMap: IS_DEVELOPMENT,
                  minimize: true,
                  importLoaders: 2
                },
              },
  
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: IS_DEVELOPMENT,
                  plugins: [
                    require('cssnano')(IS_DEVELOPMENT ? { preset: null } : { preset: 'default' }),
                    require('autoprefixer')({
                      browsers: [
                        'last 2 versions',
                        'Android >= 4',
                        'iOS >= 8'
                      ]
                    })
                  ]
                },
              },    
              {
                loader: "sass-loader",
                options: {
                    sourceMap: IS_DEVELOPMENT
                }
            }
          ]
        },
        {
          test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
          use: [
          
            {
              loader: 'url-loader',
              options: {
                limit: 50  * 1024,
                name: './img/[name].[ext]',
                publicPath : path => '../' + path,
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.html$/,
          loader: "html-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style-[hash].css',
      }),
      new HtmlWebpackPlugin({
          alwaysWriteToDisk: true,
          template: 'src/index.html'
        }
      ),
      new HtmlWebpackHarddiskPlugin(),
      new SassLintPlugin(),
      
    ],
    devtool: IS_DEVELOPMENT ? 'source-map' : 'none',
    optimization: {
      minimizer:  IS_DEVELOPMENT
      ? []
      : [
        new UglifyJSPlugin({
          sourceMap: false,
          uglifyOptions: {
            parallel: true,
            compress: {
              drop_console: true
            }
          }
        })
      ]
    }
  }
};