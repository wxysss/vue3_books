module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/components',
        'utils': '@/utils',
        'views': '@/views',
      }
    }
  },
  publicPath: './'
}