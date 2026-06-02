import { createApp } from 'vue'
import { Quasar, Notify, Dark, Loading } from 'quasar'
import router from './router'
import App from './App.vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './css/app.scss'

const app = createApp(App)

app.use(Quasar, {
  plugins: { Notify, Dark, Loading },
  config: {
    dark: true,
    brand: {
      primary:     '#C8102E',
      secondary:   '#1a1a1a',
      accent:      '#C8102E',
      dark:        '#111111',
      'dark-page': '#070707'
    }
  }
})

app.use(router)
app.mount('#app')