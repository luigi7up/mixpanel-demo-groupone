<template>
  <div class="app-layout">
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

        <!-- Feedback link -->
        <li class="nav-item mb-3">
          <button class="btn btn-link nav-link text-muted p-0" @click="handleFeedbackClick">
            <small>Leave feedback</small>
          </button>
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
    
    <AppFooter />
    <FloatingFeedbackButton />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import mp from '@/mixpanel';
import AppFooter from '../components/AppFooter.vue'
import FloatingFeedbackButton from '../components/FloatingFeedbackButton.vue'
import Cookies from 'js-cookie'


const router = useRouter()

const handleLogout = () => {
  Cookies.remove('userEmail')
  mp.reset()
  router.push('/')
}

const handleFeedbackClick = () => {
  console.log('Sidebar feedback clicked')
  
  // Trigger Userpilot custom event
  if (typeof window.userpilot !== 'undefined') {
    window.userpilot.track('click_on_feedback_sidebar', {
      button_location: 'sidebar_feedback_link',
      timestamp: new Date().toISOString()
    })
  }
  
  // You can customize this to open a feedback modal, form, or external link
  // window.open('https://your-feedback-form.com', '_blank')
  
  // For now, just show an alert
  console.log('Clicked on feedback button in the sidebar')
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout .d-flex {
  flex: 1;
}
</style>