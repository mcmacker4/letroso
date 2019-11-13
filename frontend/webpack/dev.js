const merge = require('webpack-merge')

const common = require('./common')


module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8080,
        proxy: {
            '/play': {
                target: 'ws://localhost:8081',
                ws: true
            },
            'api': {
                target: 'http://localhost:8081'
            }
        }
    }
})