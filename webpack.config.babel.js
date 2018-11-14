import webpack from 'webpack'
import path from 'path'
import HTMLPlugin from 'html-webpack-plugin'

const config = {
    entry: ['./src/client/entry.js'],
    output: {
        path: path.resolve(__dirname, 'dist')
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
        new HTMLPlugin()
    ]


}

export default (mode) => {
    return config
}