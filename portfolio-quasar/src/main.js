import { createApp } from 'vue'
import { Quasar, Notify, Dark } from 'quasar'
import router from './router'
import App from './App.vue'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/index.sass'
import './css/app.scss'

const app = createApp(App)
app.use(Quasar, {
  plugins: { Notify, Dark },
  config: {
    dark: true,
    brand: { primary:'#C9A84C', secondary:'#722F37', accent:'#C9A84C', dark:'#1A0810', 'dark-page':'#0F0307' }
  }
})
app.use(router)
app.mount('#app')