import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import HomeElectricity from './views/HomeElectricity'
import HomeGas from './views/HomeGas'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: "" , component: HomeElectricity},
        { path: "electricity" , component: HomeElectricity},
        { path: 'gas', component: HomeGas }
      ]
    }
  ]
})