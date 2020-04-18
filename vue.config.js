module.exports = {

    devServer: {
        open: true,
        https: false,
        port: 8082,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}