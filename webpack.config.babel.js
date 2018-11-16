import webpack from 'webpack'
import path from 'path'
import HTMLPlugin from 'html-webpack-plugin'

const config = {
    entry: ['./src/client/entry'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [
                'babel-loader'
            ],
            include: [
                path.resolve(__dirname, './src/client')
            ]
        }],

    },

    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, './src/client/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': 'true',
        })

    ],

    devServer: {
        proxy: {
            '/posts': 'http://localhost:3000',
            '/ws': {
                target: 'http://localhost:3000',
                ws: true,
            }
        },
        historyApiFallback: true
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }

}

export default (mode) => {
    config.mode = mode
    return config
}