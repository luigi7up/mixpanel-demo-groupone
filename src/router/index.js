// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '../layouts/PublicLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

// public views
import Home from '../views/Home.vue'
import Pricing from '../views/Pricing.vue'
import Products from '../views/Products.vue'

// private views
import Dashboard from '../views/application/Dashboard.vue'
import Gallery from '../views/application/Gallery.vue'
import Widgets from '../views/application/Widgets.vue'
import Bookings from '../views/application/Bookings.vue'
import SeoTools from '../views/application/SeoTools.vue'

// simple auth check from cookie (improve as needed)
import Cookies from 'js-cookie'
import mp from '../mixpanel';

// Hotjar Tracking Code
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:6446721,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'pricing', name: 'pricing', component: Pricing },
      { path: 'products', name: 'products', component: Products },
    ],
  },
  {
    path: '/application',
    component: AppLayout,
    beforeEnter: (to, from, next) => {
      const userEmail = Cookies.get('userEmail')
      if (userEmail) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      { path: 'dashboard', name: 'dashboard', component: Dashboard },
      { path: 'gallery', name: 'gallery', component: Gallery },
      { path: 'widgets', name: 'widgets', component: Widgets },
      { path: 'bookings', name: 'bookings', component: Bookings },
      { path: 'seo_tools', name: 'seoTools', component: SeoTools },
    ],
  },
  // fallback redirect
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



router.afterEach((to) => {
  //mp.track('Page Viewed', { page: to.fullPath })
  mp.track_pageview({page: "PAGE TET VALUE"})

  window.hj('identify', 123123, {
    role: "myrole",
    plan: "myplan",
    email: "myemail"


    // 'Signed up': '2019-06-20Z', // Signup date in ISO-8601 format.
  });


})

export default router