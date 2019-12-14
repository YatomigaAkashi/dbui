module.exports = {
    '/api': {
        target: 'localhost:3000',
        pathRewrite: {
            '/api': '/api'
        },
        changeOrigin: true
    },
  }
