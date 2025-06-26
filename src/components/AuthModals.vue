<template>
  <div>
    <!-- Login Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      id="loginModal"
      ref="loginModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="handleLogin">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="btn-close" @click="hideLogin" />
          </div>
          <div class="modal-body">
            <input
              v-model="loginEmail"
              type="email"
              class="form-control mb-3"
              placeholder="Email"
              required
            />
            <input
              v-model="loginPassword"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Signup Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      id="signupModal"
      ref="signupModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="handleSignup">
          <div class="modal-header">
            <h5 class="modal-title">Sign up</h5>
            <button type="button" class="btn-close" @click="hideSignup" />
          </div>
          <div class="modal-body">
            <input
              v-model="signupEmail"
              type="email"
              class="form-control mb-3"
              placeholder="Email"
              required
            />
            <input
              v-model="signupPassword"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary w-100">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import Cookies from 'js-cookie'
  
  import mp from '@/mixpanel';
  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
  import { useRouter } from 'vue-router'

  const loginEmail = ref('')
  const loginPassword = ref('')
  const signupEmail = ref('')
  const signupPassword = ref('')

  const router = useRouter()

  let loginModalInstance = null
  let signupModalInstance = null

  const showLogin = () => {
    loginModalInstance.show()
  }

  const hideLogin = () => {
    loginModalInstance.hide()
  }

  const showSignup = () => {
    signupModalInstance.show()
  }

  const hideSignup = () => {
    signupModalInstance.hide()
  }

  const identifyAndRedirect = (email) => {
    const userId = email.split('@')[0]
    Cookies.set('userEmail', email, { expires: 7 }) // 7 days cookie
    Cookies.set('userId', userId, { expires: 7 }) // 7 days cookie
    
    window.hj('identify', userId, {
      email: email,
      role: "myrole",
      plan: "myplan"
    });
    
    mp.identify(userId)
    mp.track('User Signed Up')
    hideLogin()
    hideSignup()
    router.push('/application/dashboard');
  }

  const handleLogin = () => {
    // for demo, just accept any credentials
    identifyAndRedirect(loginEmail.value)
  }

  const handleSignup = () => {
    identifyAndRedirect(signupEmail.value)
  }

  onMounted(() => {
    loginModalInstance = new bootstrap.Modal(
      document.getElementById('loginModal')
    )
    signupModalInstance = new bootstrap.Modal(
      document.getElementById('signupModal')
    )
  })

  // Expose modal show functions to parent via events
  defineExpose({ showLogin, showSignup })
</script>