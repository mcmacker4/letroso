const merge = require('webpack-merge')

const common = require('./common')


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000,
        proxy: {
            '/play': {
                target: 'ws://localhost:8080',
                ws: true
            },
            'api': {
                target: 'http://localhost:8080'
            }
        }
    }
})