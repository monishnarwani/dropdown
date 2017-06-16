import Vue from 'vue'
import Router from 'vue-router'
import ShowDropdown from '@/components/ShowDropdown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShowDropdown',
      component: ShowDropdown
    }
  ]
})
