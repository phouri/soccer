import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false



async function setup() {
  await store.dispatch('init')
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}

setup()
