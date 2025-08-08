<template>
  <div class="layout-container">
    <header class="header">
      <nav class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="navbar-brand">Home</router-link>
          <router-link to="/pricing" class="nav-link">Pricing</router-link>
          <router-link to="/products" class="nav-link">Products</router-link>
        </div>
        
        <div class="nav-right">
          <template v-if="isLoggedIn">
            <button class="btn btn-primary" @click="goToApp()">Enter the app</button>
          </template>
          <template v-else>
            <button class="btn btn-outline-primary" @click="authModals.showLogin()">Login</button>
            <button class="btn btn-primary" @click="authModals.showSignup()">Sign up</button>
          </template>
        </div>

      </nav>
    </header>

    <AuthModals ref="authModals" />

    <main class="main-container">
      <router-view />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import AuthModals from '../components/AuthModals.vue'
  import AppFooter from '../components/AppFooter.vue'
  import Cookies from 'js-cookie'
  import { useRouter } from 'vue-router'

  const authModals = ref(null)
  const isLoggedIn = ref(false)
  const router = useRouter()

  onMounted(() => {
    const userEmail = Cookies.get('userEmail')
    isLoggedIn.value = !!userEmail
  })

  function getAuthTokenFromCookies() {
    const match = document.cookie.match(/auth_token=([^;]+)/)
    return match ? match[1] : null
  }

  function goToApp() {
    // example route
    // or use router.push if using Vue Router
    router.push('/application/dashboard');
  }
</script>

<style scoped>
.header {
  width: 100%;
  background: #f8f9fa;
  border-bottom: 10px solid #ddd;
  display: flex;
  padding: 1rem;
  justify-content: center;
}

.nav-container {
  max-width: 1024px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
}

.nav-left {
  display: flex;
  gap: 24px;
}

.nav-right {
  margin-left: auto;
  display: flex;
  gap: 12px;
}

.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  max-width: 1024px;
  margin: 24px auto 0 auto;
  padding: 0 16px;
  flex: 1;
}
</style>