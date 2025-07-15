<template>
  <div class="d-flex">
    <nav class="bg-light sidebar p-3" style="width: 220px; min-height: 100vh;">
      <!-- Logo at the top of sidebar -->
      <div class="mb-4 text-center">
        <router-link to="/application/dashboard" class="navbar-brand">
          <img src="@/assets/logo.png" alt="Logo" style="height: 40px;" />
        </router-link>
      </div>

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
        <li class="nav-item mb-4">
          <router-link to="/application/seo_tools" class="nav-link">SEO Tools</router-link>
        </li>

        <!-- Logout button -->
        <li class="nav-item">
          <button class="btn btn-outline-danger w-100" @click="handleLogout">Log out</button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import mp from '@/mixpanel';

import Cookies from 'js-cookie'


const router = useRouter()

const handleLogout = () => {
  Cookies.remove('userEmail')
  mp.reset()
  router.push('/')

}
</script>