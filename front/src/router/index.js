import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'
import notfound from '../views/notfound'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '*',
            name: 'notfound',
            component: notfound
        }
    ]
})
