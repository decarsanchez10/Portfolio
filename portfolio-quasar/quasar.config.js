/* eslint-disable */
module.exports = function () {
  return {
    boot: [],
    css: ['app.scss'],
    extras: ['material-icons', 'fontawesome-v6'],
    build: {
      target: { browser: ['es2019','edge88','firefox78','chrome87','safari13.1'], node: 'node20' },
      vueRouterMode: 'hash',
      publicPath: '/Portfolio/'
    },
    devServer: { open: true, port: 3000 },
    framework: {
      config: {
        dark: true,
        brand: { primary:'#C9A84C', secondary:'#722F37', accent:'#C9A84C', dark:'#1A0810', 'dark-page':'#0F0307' }
      },
      iconSet: 'material-icons',
      lang: 'en-US',
      plugins: ['Notify', 'Dark']
    },
    animations: 'all'
  }
}