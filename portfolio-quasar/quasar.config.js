/* eslint-disable */
module.exports = function (/* ctx */) {
  return {
    boot: [],
    css: ['app.scss'],
    extras: ['material-icons'],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vueRouterMode: 'hash'
    },
    devServer: {
      open: true,
      port: 3000
    },
    framework: {
      config: {
        dark: true,
        brand: {
          primary:     '#C8102E',
          secondary:   '#1a1a1a',
          accent:      '#C8102E',
          dark:        '#111111',
          'dark-page': '#070707',
          positive:    '#21BA45',
          negative:    '#C10015',
          info:        '#31CCEC',
          warning:     '#F2C037'
        }
      },
      iconSet: 'material-icons',
      lang: 'en-US',
      plugins: ['Notify', 'Dark', 'Loading']
    },
    animations: 'all'
  }
}