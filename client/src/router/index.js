import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Index from '@/components/Index'
import AtComponents from 'at-ui'
import 'at-ui-style'
import Register from '@/components/Register'
//import('../../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Router)
//Vue.use(Vuetify)
Vue.use(AtComponents)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
