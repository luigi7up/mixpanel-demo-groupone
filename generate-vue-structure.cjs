const fs = require('fs')
const path = require('path')

const filesToCreate = {
  'src/views/Home.vue': `<template>
  <div class="container mt-4">
    <h1>Home</h1>
    <p>Welcome to the public home page.</p>
  </div>
</template>
`,

  'src/views/Pricing.vue': `<template>
  <div class="container mt-4">
    <h1>Pricing</h1>
    <p>Details about pricing.</p>
  </div>
</template>
`,

  'src/views/Products.vue': `<template>
  <div class="container mt-4">
    <h1>Products</h1>
    <p>Our product offerings.</p>
  </div>
</template>
`,

  'src/views/application/Dashboard.vue': `<template>
  <div class="container mt-4">
    <h2>Dashboard</h2>
    <p>Welcome to your dashboard.</p>
  </div>
</template>
`,

  'src/views/application/Gallery.vue': `<template>
  <div class="container mt-4">
    <h2>Gallery</h2>
    <p>Your gallery content here.</p>
  </div>
</template>
`,

  'src/views/application/Widgets.vue': `<template>
  <div class="container mt-4">
    <h2>Widgets</h2>
    <p>Manage your widgets here.</p>
  </div>
</template>
`,

  'src/views/application/Bookings.vue': `<template>
  <div class="container mt-4">
    <h2>Bookings</h2>
    <p>Your bookings overview.</p>
  </div>
</template>
`,

  'src/views/application/SeoTools.vue': `<template>
  <div class="container mt-4">
    <h2>SEO Tools</h2>
    <p>SEO tools dashboard.</p>
  </div>
</template>
`,

  'src/layouts/AppLayout.vue': `<template>
  <div class="d-flex">
    <nav class="bg-light sidebar p-3" style="width: 220px; min-height: 100vh;">
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/application/dashboard" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/gallery" class="nav-link">Gallery</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/widgets" class="nav-link">Widgets</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/bookings" class="nav-link">Bookings</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/application/seo_tools" class="nav-link">SEO Tools</router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 p-4">
      <header class="d-flex justify-content-between align-items-center mb-4">
        <router-link to="/" class="navbar-brand">
          <img src="/logo.png" alt="Logo" style="height: 40px;">
        </router-link>
        <!-- You can add user info / logout button here -->
      </header>

      <router-view />
    </main>
  </div>
</template>
`,

  'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Pricing from '../views/Pricing.vue'
import Products from '../views/Products.vue'

const Dashboard = () => import('../views/application/Dashboard.vue')
const Gallery = () => import('../views/application/Gallery.vue')
const Widgets = () => import('../views/application/Widgets.vue')
const Bookings = () => import('../views/application/Bookings.vue')
const SeoTools = () => import('../views/application/SeoTools.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/pricing', component: Pricing },
  { path: '/products', component: Products },
  {
    path: '/application',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'gallery', component: Gallery },
      { path: 'widgets', component: Widgets },
      { path: 'bookings', component: Bookings },
      { path: 'seo_tools', component: SeoTools },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
`,
}

for (const [file, content] of Object.entries(filesToCreate)) {
  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Created directory: ${dir}`)
  }
  fs.writeFileSync(file, content)
  console.log(`Created file: ${file}`)
}

console.log('Vue file structure generated!')