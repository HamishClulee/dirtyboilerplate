import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'
import notfound from '../views/notfound.vue'

import { overwritemetas } from '../utils/seo.js'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            beforeEnter: (to, from, next) => {
                overwritemetas({
                    title: "create-mevn-app home page",
                    description: "Breif description of how the boilerplate functions",
                    noindex: true,
                }, next);
            },
        },
        {
            path: '*',
            name: 'notfound',
            component: notfound,
            beforeEnter: (to, from, next) => {
                overwritemetas({
                    title: "",
                    description: "",
                    noindex: true,
                }, next);
            },
        }
    ]
})
