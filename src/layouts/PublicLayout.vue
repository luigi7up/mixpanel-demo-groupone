<template>
  <div>
    <header class="header">
      <nav class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="navbar-brand">Home</router-link>
          <router-link to="/pricing" class="nav-link">Pricing</router-link>
          <router-link to="/products" class="nav-link">Products</router-link>
        </div>
        <div class="nav-right">
          <!-- <button class="btn btn-outline-primary" @click="authModals.showLogin()">Login</button> -->
          <button class="btn btn-primary" @click="authModals.showSignup()">Sign up</button>
        </div>
      </nav>
    </header>

    <AuthModals ref="authModals" />

    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthModals from '../components/AuthModals.vue'

const authModals = ref(null)
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

.main-container {
  max-width: 1024px;
  margin: 24px auto 0 auto;
  padding: 0 16px;
}
</style>