import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/Entry'
import SignUp from '@/components/SignUp/SignUp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
